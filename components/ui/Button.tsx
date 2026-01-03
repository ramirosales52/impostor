import { Button as TamaguiButton, ButtonProps, styled } from 'tamagui'

export const Button = styled(TamaguiButton, {
  size: '$5',
  borderRadius: '$4',
  fontWeight: '700',
  fontSize: '$5',
  pressStyle: {
    scale: 0.97,
  },
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        hoverStyle: {
          backgroundColor: '$primary',
          opacity: 0.9,
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: 'white',
        hoverStyle: {
          backgroundColor: '$secondary',
          opacity: 0.9,
        },
      },
      impostor: {
        backgroundColor: '$impostor',
        color: 'white',
        hoverStyle: {
          backgroundColor: '$impostorDark',
        },
      },
      player: {
        backgroundColor: '$player',
        color: 'white',
        hoverStyle: {
          backgroundColor: '$playerDark',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$primary',
        color: '$primary',
        hoverStyle: {
          backgroundColor: '$primary',
          color: 'white',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
        shadowOpacity: 0,
        elevation: 0,
        hoverStyle: {
          backgroundColor: '$backgroundStrong',
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
})

export type ButtonVariant = 'primary' | 'secondary' | 'impostor' | 'player' | 'outline' | 'ghost'
