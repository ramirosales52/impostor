import { createTamagui } from 'tamagui'
import * as themes from '@tamagui/themes'
import { shorthands } from '@tamagui/shorthands'
import { tokens } from '@tamagui/themes'
import { createMedia } from '@tamagui/react-native-media-driver'
import { createFont } from '@tamagui/core'

const bodyFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 30,
    8: 36,
    9: 48,
    10: 64,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 38,
    8: 44,
    9: 56,
    10: 72,
  },
  weight: {
    4: '400',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    7: -0.5,
  },
})

const config = createTamagui({
  fonts: {
    body: bodyFont,
    heading: bodyFont,
  },
  themes: {
    light: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      impostor: '#9B59B6',
      impostorDark: '#7D3C98',
      player: '#3498DB',
      playerDark: '#2874A6',
      success: '#2ECC71',
      warning: '#F39C12',
      danger: '#E74C3C',
      background: '#F8F9FA',
      backgroundStrong: '#E9ECEF',
      card: '#FFFFFF',
      cardHover: '#F8F9FA',
      color: '#2C3E50',
      colorSecondary: '#7F8C8D',
      borderColor: '#DEE2E6',
      borderColorHover: '#CED4DA',
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowColorStrong: 'rgba(0,0,0,0.2)',
    },
    dark: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      impostor: '#BB8FCE',
      impostorDark: '#9B59B6',
      player: '#5DADE2',
      playerDark: '#3498DB',
      success: '#58D68D',
      warning: '#F5B041',
      danger: '#EC7063',
      background: '#1A1A2E',
      backgroundStrong: '#16213E',
      card: '#0F3460',
      cardHover: '#16213E',
      color: '#ECF0F1',
      colorSecondary: '#BDC3C7',
      borderColor: '#34495E',
      borderColorHover: '#4A5F7F',
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowColorStrong: 'rgba(0,0,0,0.5)',
    },
  },
  tokens,
  shorthands,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config
