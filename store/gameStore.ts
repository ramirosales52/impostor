import { create } from 'zustand'
import { Word, GameState, GameConfig } from './types'
import { storage } from '../utils/storage'
import { assignRoles } from '../utils/gameLogic'
import { DEFAULT_WORDS } from '../utils/constants'

interface GameStore {
  // Config
  numPlayers: number
  numImpostors: number

  // Palabras
  words: Word[]

  // Estado del juego actual
  currentGame: GameState | null

  // Loading state
  isLoading: boolean

  // Actions - Config
  setNumPlayers: (n: number) => void
  setNumImpostors: (n: number) => void

  // Actions - Words
  loadWords: () => Promise<void>
  addWord: (word: string, hints: [string, string, string]) => void
  editWord: (index: number, word: string, hints: [string, string, string]) => void
  deleteWord: (index: number) => void
  resetWords: () => void

  // Actions - Game
  startGame: () => void
  revealRole: (index: number) => void
  hideRole: (index: number) => void
  nextPlayer: () => void
  endGame: () => void

  // Initialize
  initialize: () => Promise<void>
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  numPlayers: 5,
  numImpostors: 1,
  words: DEFAULT_WORDS,
  currentGame: null,
  isLoading: true,

  // Config actions
  setNumPlayers: (n) => {
    set({ numPlayers: n })
    storage.saveConfig({ numPlayers: n, numImpostors: get().numImpostors })
  },

  setNumImpostors: (n) => {
    set({ numImpostors: n })
    storage.saveConfig({ numPlayers: get().numPlayers, numImpostors: n })
  },

  // Words actions
  loadWords: async () => {
    const words = await storage.getWords()
    set({ words })
  },

  addWord: (word, hints) => {
    const newWords = [...get().words, { word, hints }]
    set({ words: newWords })
    storage.saveWords(newWords)
  },

  editWord: (index, word, hints) => {
    const newWords = [...get().words]
    newWords[index] = { word, hints }
    set({ words: newWords })
    storage.saveWords(newWords)
  },

  deleteWord: (index) => {
    const newWords = get().words.filter((_, i) => i !== index)
    set({ words: newWords })
    storage.saveWords(newWords)
  },

  resetWords: () => {
    set({ words: DEFAULT_WORDS })
    storage.saveWords(DEFAULT_WORDS)
  },

  // Game actions
  startGame: () => {
    const { numPlayers, numImpostors, words } = get()
    const gameState = assignRoles(numPlayers, numImpostors, words)
    set({ currentGame: gameState })
  },

  revealRole: (index) => {
    const game = get().currentGame
    if (!game) return

    const newRoles = [...game.roles]
    newRoles[index] = { ...newRoles[index], revealed: true }
    set({
      currentGame: {
        ...game,
        roles: newRoles,
      },
    })
  },

  hideRole: (index) => {
    const game = get().currentGame
    if (!game) return

    const newRoles = [...game.roles]
    newRoles[index] = { ...newRoles[index], revealed: false }
    set({
      currentGame: {
        ...game,
        roles: newRoles,
      },
    })
  },

  nextPlayer: () => {
    const game = get().currentGame
    if (!game) return

    // Ocultar el rol del jugador actual antes de avanzar
    const newRoles = [...game.roles]
    newRoles[game.currentPlayerIndex] = { ...newRoles[game.currentPlayerIndex], revealed: false }

    set({
      currentGame: {
        ...game,
        roles: newRoles,
        currentPlayerIndex: game.currentPlayerIndex + 1,
      },
    })
  },

  endGame: () => {
    set({ currentGame: null })
  },

  // Initialize
  initialize: async () => {
    set({ isLoading: true })
    const [words, config] = await Promise.all([storage.getWords(), storage.getConfig()])

    set({
      words,
      numPlayers: config?.numPlayers ?? 5,
      numImpostors: config?.numImpostors ?? 1,
      isLoading: false,
    })
  },
}))
