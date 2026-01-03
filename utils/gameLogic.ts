import { Word, GameState, PlayerRole } from '../store/types'

export function assignRoles(
  numPlayers: number,
  numImpostors: number,
  words: Word[]
): GameState {
  if (words.length === 0) {
    throw new Error('No hay palabras disponibles')
  }

  if (numImpostors >= numPlayers) {
    throw new Error('El número de impostores debe ser menor al número de jugadores')
  }

  // 1. Elegir palabra aleatoria
  const selectedWord = words[Math.floor(Math.random() * words.length)]
  
  // 2. Elegir una pista aleatoria de las 3 disponibles
  const randomHintIndex = Math.floor(Math.random() * 3)
  const selectedHint = selectedWord.hints[randomHintIndex]

  // 3. Crear array de índices [0, 1, 2, ..., numPlayers-1]
  const indices = Array.from({ length: numPlayers }, (_, i) => i)

  // 4. Shuffle Fisher-Yates
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }

  // 5. Los primeros numImpostors índices son impostores
  const impostorIndices = new Set(indices.slice(0, numImpostors))

  // 6. Crear roles
  const roles: PlayerRole[] = Array.from({ length: numPlayers }, (_, i) => ({
    isImpostor: impostorIndices.has(i),
    revealed: false,
  }))

  return {
    secretWord: selectedWord.word,
    hint: selectedHint,
    roles,
    currentPlayerIndex: 0,
  }
}

export function validateGameConfig(numPlayers: number, numImpostors: number): {
  valid: boolean
  error?: string
} {
  if (numImpostors >= numPlayers) {
    return {
      valid: false,
      error: 'El número de impostores debe ser menor al número de jugadores',
    }
  }

  if (numPlayers < 3) {
    return {
      valid: false,
      error: 'Se necesitan al menos 3 jugadores',
    }
  }

  if (numImpostors < 1) {
    return {
      valid: false,
      error: 'Se necesita al menos 1 impostor',
    }
  }

  return { valid: true }
}
