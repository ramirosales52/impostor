import AsyncStorage from '@react-native-async-storage/async-storage'
import { Word, GameConfig } from '../store/types'
import { DEFAULT_WORDS, STORAGE_KEYS } from './constants'

export const storage = {
  async getWords(): Promise<Word[]> {
    try {
      const wordsJson = await AsyncStorage.getItem(STORAGE_KEYS.WORDS)
      if (wordsJson) {
        return JSON.parse(wordsJson)
      }
      return DEFAULT_WORDS
    } catch (error) {
      console.error('Error loading words:', error)
      return DEFAULT_WORDS
    }
  },

  async saveWords(words: Word[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words))
    } catch (error) {
      console.error('Error saving words:', error)
    }
  },

  async getConfig(): Promise<GameConfig | null> {
    try {
      const configJson = await AsyncStorage.getItem(STORAGE_KEYS.CONFIG)
      if (configJson) {
        return JSON.parse(configJson)
      }
      return null
    } catch (error) {
      console.error('Error loading config:', error)
      return null
    }
  },

  async saveConfig(config: GameConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
    } catch (error) {
      console.error('Error saving config:', error)
    }
  },
}
