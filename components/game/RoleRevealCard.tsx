import { YStack, Text } from 'tamagui'
import { Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

interface RoleRevealCardProps {
  isRevealed: boolean
  isImpostor: boolean
  word?: string
  hint?: string
  onReveal: () => void
}

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

export function RoleRevealCard({ isRevealed, isImpostor, word, hint, onReveal }: RoleRevealCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onReveal()
  }

  return (
    <Pressable onPress={handlePress} style={{ width: '100%', maxWidth: 400 }}>
      <YStack height={300}>
        {!isRevealed ? (
          <AnimatedYStack
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            backgroundColor="$card"
            borderRadius="$6"
            padding="$6"
            justifyContent="center"
            alignItems="center"
            borderWidth={2}
            borderColor="$borderColor"
            elevation={8}
            flex={1}
          >
            <Text fontSize="$10" textAlign="center" color="$colorSecondary">
              🤫
            </Text>
          </AnimatedYStack>
        ) : (
          <AnimatedYStack
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            backgroundColor={isImpostor ? '$impostor' : '$player'}
            borderRadius="$6"
            padding="$6"
            justifyContent="center"
            alignItems="center"
            elevation={8}
            flex={1}
          >
            {isImpostor ? (
              <YStack gap="$4" alignItems="center">
                <Text fontSize="$9" textAlign="center">
                  🎭
                </Text>
                <Text fontSize="$7" fontWeight="900" textAlign="center" color="white">
                  IMPOSTOR
                </Text>
                <YStack
                  backgroundColor="rgba(255,255,255,0.2)"
                  padding="$4"
                  borderRadius="$4"
                  width="100%"
                >
                  <Text fontSize="$4" color="white" opacity={0.9} textAlign="center">
                    Pista:
                  </Text>
                  <Text fontSize="$6" fontWeight="700" color="white" textAlign="center" marginTop="$2">
                    {hint}
                  </Text>
                </YStack>
              </YStack>
            ) : (
              <YStack gap="$4" alignItems="center">
                <Text fontSize="$4" color="white" opacity={0.9} textAlign="center">
                  PALABRA:
                </Text>
                <Text fontSize="$9" fontWeight="900" textAlign="center" color="white">
                  {word}
                </Text>
              </YStack>
            )}
          </AnimatedYStack>
        )}
      </YStack>
    </Pressable>
  )
}
