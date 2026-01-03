import { YStack, H1, Text } from 'tamagui'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { useRouter } from 'expo-router'
import { useGameStore } from '../store/gameStore'
import { Alert } from 'react-native'
import { validateGameConfig } from '../utils/gameLogic'

export default function HomeScreen() {
  const router = useRouter()
  const { numPlayers, numImpostors, words, startGame } = useGameStore()

  const handlePlay = () => {
    // Validar configuración
    const validation = validateGameConfig(numPlayers, numImpostors)
    if (!validation.valid) {
      Alert.alert('Error', validation.error)
      return
    }

    if (words.length === 0) {
      Alert.alert('Error', 'Necesitas agregar al menos una palabra para jugar')
      return
    }

    // Iniciar juego
    startGame()
    router.push('/game/reveal-role')
  }

  return (
    <Container justifyContent="space-between" alignItems="center" paddingVertical="$8">
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$6">
        <YStack alignItems="center" gap="$3">
          <H1 fontSize="$10" fontWeight="900" color="$primary" textAlign="center">
            IMPOSTOR
          </H1>
          <Text fontSize="$4" color="$colorSecondary" textAlign="center">
            Encuentra al impostor
          </Text>
        </YStack>

        <YStack width="100%" maxWidth={400} gap="$4" marginTop="$8">
          <Button size="$6" variant="primary" onPress={handlePlay} fontSize="$7">
            <Text fontSize="$7" color="white" fontWeight="700">JUGAR</Text>
          </Button>

          <Button variant="outline" onPress={() => router.push('/config')}>
            <Text>⚙️ CONFIGURACIÓN</Text>
          </Button>
        </YStack>
      </YStack>

      <YStack alignItems="center" gap="$3">
        <Text fontSize="$4" color="$color" fontWeight="600">
          {numPlayers} jugadores • {numImpostors} {numImpostors === 1 ? 'impostor' : 'impostores'}
        </Text>
        <Text fontSize="$4" color="$color" fontWeight="600">
          {words.length} {words.length === 1 ? 'palabra' : 'palabras'}
        </Text>
      </YStack>
    </Container>
  )
}
