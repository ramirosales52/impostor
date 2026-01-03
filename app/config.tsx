import { useState } from 'react'
import { YStack, H2, Text, XStack, ScrollView, Input as TamaguiInput } from 'tamagui'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { WordListItem } from '../components/game/WordListItem'
import { useRouter } from 'expo-router'
import { useGameStore } from '../store/gameStore'
import { Alert, Modal, TextInput } from 'react-native'
import { MIN_PLAYERS, MIN_IMPOSTORS } from '../utils/constants'

export default function ConfigScreen() {
  const router = useRouter()
  const {
    numPlayers,
    numImpostors,
    words,
    setNumPlayers,
    setNumImpostors,
    addWord,
    editWord,
    deleteWord,
  } = useGameStore()

  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newWord, setNewWord] = useState('')
  const [newHint1, setNewHint1] = useState('')
  const [newHint2, setNewHint2] = useState('')
  const [newHint3, setNewHint3] = useState('')

  const handleSaveWord = () => {
    if (!newWord.trim() || !newHint1.trim() || !newHint2.trim() || !newHint3.trim()) {
      Alert.alert('Error', 'Debes ingresar la palabra y las 3 pistas')
      return
    }

    const hints: [string, string, string] = [newHint1.trim(), newHint2.trim(), newHint3.trim()]

    if (editingIndex !== null) {
      editWord(editingIndex, newWord.trim(), hints)
    } else {
      addWord(newWord.trim(), hints)
    }

    setShowModal(false)
    setNewWord('')
    setNewHint1('')
    setNewHint2('')
    setNewHint3('')
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setNewWord(words[index].word)
    setNewHint1(words[index].hints[0])
    setNewHint2(words[index].hints[1])
    setNewHint3(words[index].hints[2])
    setShowModal(true)
  }

  const handleDelete = (index: number) => {
    Alert.alert('Eliminar palabra', '¿Estás seguro de eliminar esta palabra?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => deleteWord(index),
      },
    ])
  }

  const handleAddNew = () => {
    setEditingIndex(null)
    setNewWord('')
    setNewHint1('')
    setNewHint2('')
    setNewHint3('')
    setShowModal(true)
  }

  return (
    <Container>
      <YStack flex={1} gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <H2 fontSize="$8" fontWeight="700" color="$color">
            Configuración
          </H2>
          <Button variant="ghost" onPress={() => router.back()} size="$3">
            <Text>✕</Text>
          </Button>
        </XStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$4" paddingBottom="$8">
            {/* Configuración de Juego */}
            <Card>
              <YStack gap="$4">
                <Text fontSize="$6" fontWeight="700" color="$color">
                  Configuración del Juego
                </Text>

                {/* Número de Jugadores */}
                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Número de Jugadores
                  </Text>
                  <XStack gap="$3" alignItems="center">
                    <Button
                      size="$4"
                      variant="outline"
                      onPress={() => numPlayers > MIN_PLAYERS && setNumPlayers(numPlayers - 1)}
                      disabled={numPlayers <= MIN_PLAYERS}
                      opacity={numPlayers <= MIN_PLAYERS ? 0.5 : 1}
                      flex={1}
                    >
                      <Text fontSize="$6" fontWeight="700">-</Text>
                    </Button>
                    <YStack
                      backgroundColor="$card"
                      borderWidth={2}
                      borderColor="$primary"
                      borderRadius="$4"
                      padding="$3"
                      minWidth={80}
                      alignItems="center"
                    >
                      <Text fontSize="$7" fontWeight="900" color="$primary">
                        {numPlayers}
                      </Text>
                    </YStack>
                    <Button
                      size="$4"
                      variant="outline"
                      onPress={() => setNumPlayers(numPlayers + 1)}
                      flex={1}
                    >
                      <Text fontSize="$6" fontWeight="700">+</Text>
                    </Button>
                  </XStack>
                </YStack>

                {/* Número de Impostores */}
                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Número de Impostores
                  </Text>
                  <XStack gap="$3" alignItems="center">
                    <Button
                      size="$4"
                      variant="outline"
                      onPress={() => numImpostors > MIN_IMPOSTORS && setNumImpostors(numImpostors - 1)}
                      disabled={numImpostors <= MIN_IMPOSTORS}
                      opacity={numImpostors <= MIN_IMPOSTORS ? 0.5 : 1}
                      flex={1}
                    >
                      <Text fontSize="$6" fontWeight="700">-</Text>
                    </Button>
                    <YStack
                      backgroundColor="$card"
                      borderWidth={2}
                      borderColor="$impostor"
                      borderRadius="$4"
                      padding="$3"
                      minWidth={80}
                      alignItems="center"
                    >
                      <Text fontSize="$7" fontWeight="900" color="$impostor">
                        {numImpostors}
                      </Text>
                    </YStack>
                    <Button
                      size="$4"
                      variant="outline"
                      onPress={() =>
                        numImpostors < numPlayers - 1 && setNumImpostors(numImpostors + 1)
                      }
                      disabled={numImpostors >= numPlayers - 1}
                      opacity={numImpostors >= numPlayers - 1 ? 0.5 : 1}
                      flex={1}
                    >
                      <Text fontSize="$6" fontWeight="700">+</Text>
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </Card>

            {/* Gestión de Palabras */}
            <YStack gap="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$6" fontWeight="700" color="$color">
                  Palabras ({words.length})
                </Text>
                <Button size="$3" variant="secondary" onPress={handleAddNew}>
                  <Text>➕ Agregar</Text>
                </Button>
              </XStack>

              <YStack gap="$2">
                {words.map((word, index) => (
                  <WordListItem
                    key={index}
                    word={word.word}
                    hints={word.hints}
                    onEdit={() => handleEdit(index)}
                    onDelete={() => handleDelete(index)}
                  />
                ))}
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>

        {/* Modal para agregar/editar palabras */}
        <Modal visible={showModal} animationType="slide" transparent>
          <YStack flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
            <Card backgroundColor="$background" borderRadius="$6" padding="$5" margin="$4">
              <YStack gap="$4">
                <Text fontSize="$6" fontWeight="700" color="$color">
                  {editingIndex !== null ? 'Editar Palabra' : 'Nueva Palabra'}
                </Text>

                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Palabra
                  </Text>
                  <TextInput
                    value={newWord}
                    onChangeText={setNewWord}
                    placeholder="Ej: Playa"
                    style={{
                      fontSize: 16,
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#DEE2E6',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </YStack>

                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Pista 1
                  </Text>
                  <TextInput
                    value={newHint1}
                    onChangeText={setNewHint1}
                    placeholder="Ej: verano"
                    style={{
                      fontSize: 16,
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#DEE2E6',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </YStack>

                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Pista 2
                  </Text>
                  <TextInput
                    value={newHint2}
                    onChangeText={setNewHint2}
                    placeholder="Ej: arena"
                    style={{
                      fontSize: 16,
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#DEE2E6',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </YStack>

                <YStack gap="$2">
                  <Text fontSize="$4" color="$colorSecondary">
                    Pista 3
                  </Text>
                  <TextInput
                    value={newHint3}
                    onChangeText={setNewHint3}
                    placeholder="Ej: mar"
                    style={{
                      fontSize: 16,
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#DEE2E6',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </YStack>

                <XStack gap="$3" marginTop="$2">
                  <Button
                    flex={1}
                    variant="ghost"
                    onPress={() => {
                      setShowModal(false)
                      setNewWord('')
                      setNewHint1('')
                      setNewHint2('')
                      setNewHint3('')
                      setEditingIndex(null)
                    }}
                  >
                    <Text>Cancelar</Text>
                  </Button>
                  <Button flex={1} variant="primary" onPress={handleSaveWord}>
                    <Text>Guardar</Text>
                  </Button>
                </XStack>
              </YStack>
            </Card>
          </YStack>
        </Modal>
      </YStack>
    </Container>
  )
}
