export interface Word {
  word: string
  hints: [string, string, string]
}

export interface PlayerRole {
  isImpostor: boolean
  revealed: boolean
}

export interface GameState {
  secretWord: string
  hint: string
  roles: PlayerRole[]
  currentPlayerIndex: number
}

export interface GameConfig {
  numPlayers: number
  numImpostors: number
}
