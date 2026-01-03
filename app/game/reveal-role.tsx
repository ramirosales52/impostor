import { YStack, Text } from 'tamagui'
import { Container } from '../../components/ui/Container'
import { Button } from '../../components/ui/Button'
import { RoleRevealCard } from '../../components/game/RoleRevealCard'
import { useRouter } from 'expo-router'
import { useGameStore } from '../../store/gameStore'
import { useEffect, useState } from 'react'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

export default function RevealRoleScreen() {
  const router = useRouter()
  const { currentGame, revealRole, hideRole, nextPlayer, numPlayers } = useGameStore()
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    if (!currentGame) {
      router.replace('/')
    }
  }, [currentGame])

  if (!currentGame) {
    return null
  }

  const currentPlayerIndex = currentGame.currentPlayerIndex
  const currentRole = currentGame.roles[currentPlayerIndex]
  const isLastPlayer = currentPlayerIndex === numPlayers - 1

  const handleReveal = () => {
    if (currentRole.revealed) {
      hideRole(currentPlayerIndex)
    } else {
      revealRole(currentPlayerIndex)
      setHasRevealed(true)
    }
  }

  const handleNext = () => {
    setHasRevealed(false) // Reset para el siguiente jugador
    if (isLastPlayer) {
      router.push('/game/playing')
    } else {
      nextPlayer()
    }
  }

  return (
    <Container justifyContent="space-between" alignItems="center" paddingVertical="$6">
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$6" width="100%">
        {/* Progress Indicator */}
        <YStack alignItems="center" gap="$2">
          <Text fontSize="$6" fontWeight="700" color="$color">
            Jugador {currentPlayerIndex + 1} de {numPlayers}
          </Text>
        </YStack>

        {/* Role Reveal Card con animación */}
        <AnimatedYStack
          key={currentPlayerIndex}
          entering={FadeInRight.duration(600).springify()}
          exiting={FadeOutLeft.duration(400)}
          width="100%"
          maxWidth={400}
        >
          <RoleRevealCard
            isRevealed={currentRole.revealed}
            isImpostor={currentRole.isImpostor}
            word={currentGame.secretWord}
            hint={currentGame.hint}
            onReveal={handleReveal}
          />
        </AnimatedYStack>

        {/* Instructions - Espacio fijo */}
        <YStack height={60} justifyContent="center">
          {!currentRole.revealed && (
            <Text fontSize="$4" color="$colorSecondary" textAlign="center" paddingHorizontal="$4">
              Toca la tarjeta para ver tu rol
            </Text>
          )}
        </YStack>
      </YStack>

      {/* Área fija para botones - siempre ocupa espacio */}
      <YStack gap="$3" width="100%" maxWidth={400} height={120} justifyContent="flex-end">
        {hasRevealed && (
          <Button variant="primary" size="$6" onPress={handleNext}>
            <Text fontSize="$5" color="white" fontWeight="700">
              {isLastPlayer ? '🎮 JUGAR' : 'SIGUIENTE JUGADOR'}
            </Text>
          </Button>
        )}
      </YStack>
    </Container>
  )
}
