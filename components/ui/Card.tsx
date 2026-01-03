import { YStack, styled } from 'tamagui'

export const Card = styled(YStack, {
  backgroundColor: '$card',
  borderRadius: '$4',
  padding: '$4',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  borderWidth: 1,
  borderColor: '$borderColor',

  variants: {
    pressable: {
      true: {
        pressStyle: {
          scale: 0.98,
          backgroundColor: '$cardHover',
        },
      },
    },
    elevated: {
      true: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
      },
    },
  } as const,
})
