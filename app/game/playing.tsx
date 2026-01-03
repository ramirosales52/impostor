import { useEffect } from 'react'
import { YStack, Text } from 'tamagui'
import { Container } from '../../components/ui/Container'
import { Button } from '../../components/ui/Button'
import { useRouter } from 'expo-router'
import { useGameStore } from '../../store/gameStore'
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated'

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

export default function PlayingScreen() {
  const router = useRouter()
  const { endGame, currentGame } = useGameStore()

  useEffect(() => {
    if (!currentGame) {
      router.replace('/')
    }
  }, [currentGame])

  const handleEndGame = () => {
    endGame()
    router.replace('/')
  }

  if (!currentGame) {
    return null
  }

  return (
    <Container justifyContent="center" alignItems="center" gap="$8">
      <AnimatedYStack entering={FadeInUp.delay(100).springify()} alignItems="center" gap="$4">
        <Text fontSize="$10" textAlign="center">
          🎮
        </Text>
        <Text fontSize="$8" fontWeight="900" color="$primary" textAlign="center">
          Empieza Jugador {currentGame.startingPlayer}
        </Text>
      </AnimatedYStack>

      <AnimatedYStack
        entering={FadeInDown.delay(300).springify()}
        backgroundColor="$card"
        padding="$6"
        borderRadius="$6"
        maxWidth={400}
        width="100%"
        gap="$4"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Text fontSize="$5" color="$color" textAlign="center" lineHeight="$6">
          Por turnos, cada jugador dice una palabra relacionada con la palabra secreta.
        </Text>
        <YStack
          backgroundColor="$backgroundStrong"
          padding="$4"
          borderRadius="$4"
          borderLeftWidth={4}
          borderLeftColor="$primary"
        >
          <Text fontSize="$4" fontWeight="700" color="$colorSecondary" textAlign="center">
            El impostor debe camuflarse y adivinar la palabra sin quedar regalado
          </Text>
        </YStack>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(500).springify()} width="100%" maxWidth={400}>
        <Button variant="primary" size="$6" onPress={handleEndGame}>
          <Text fontSize="$6" color="white" fontWeight="700">TERMINAR JUEGO</Text>
        </Button>
      </AnimatedYStack>
    </Container>
  )
}
