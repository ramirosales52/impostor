import { useState, useCallback, memo } from 'react'
import { YStack, H2, Text, XStack, Input as TamaguiInput, Switch } from 'tamagui'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { WordListItem } from '../components/game/WordListItem'
import { useRouter } from 'expo-router'
import { useGameStore } from '../store/gameStore'
import { Alert, Modal, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, View, FlatList, ScrollView } from 'react-native'
import { MIN_PLAYERS, MIN_IMPOSTORS, DEFAULT_WORDS } from '../utils/constants'
import { generateWords } from '../utils/aiService'
import type { Word } from '../store/types'

export default function ConfigScreen() {
  const router = useRouter()
  const {
    numPlayers,
    numImpostors,
    words,
    noHints,
    setNumPlayers,
    setNumImpostors,
    setNoHints,
    addWord,
    editWord,
    deleteWord,
    resetWords,
  } = useGameStore()

  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newWord, setNewWord] = useState('')
  const [newHint1, setNewHint1] = useState('')
  const [newHint2, setNewHint2] = useState('')
  const [newHint3, setNewHint3] = useState('')

  // Estado para generación con IA
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWords, setGeneratedWords] = useState<Word[]>([])
  const [showPreview, setShowPreview] = useState(false)

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

  const handleEdit = useCallback((index: number) => {
    setEditingIndex(index)
    setNewWord(words[index].word)
    setNewHint1(words[index].hints[0])
    setNewHint2(words[index].hints[1])
    setNewHint3(words[index].hints[2])
    setShowModal(true)
  }, [words])

  const handleDelete = useCallback((index: number) => {
    Alert.alert('Eliminar palabra', '¿Estás seguro de eliminar esta palabra?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => deleteWord(index),
      },
    ])
  }, [deleteWord])

  const handleAddNew = () => {
    setEditingIndex(null)
    setNewWord('')
    setNewHint1('')
    setNewHint2('')
    setNewHint3('')
    setShowModal(true)
  }

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      Alert.alert('Error', 'Debes ingresar una descripción de las palabras a generar')
      return
    }

    setIsGenerating(true)
    try {
      const words = await generateWords(aiPrompt)
      setGeneratedWords(words)
      setShowAIModal(false)
      setShowPreview(true)
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'No se pudieron generar las palabras'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAcceptGenerated = () => {
    generatedWords.forEach(word => {
      addWord(word.word, word.hints)
    })
    setShowPreview(false)
    setGeneratedWords([])
    setAiPrompt('')
  }

  const handleCancelGenerated = () => {
    setShowPreview(false)
    setGeneratedWords([])
    setAiPrompt('')
  }

  return (
    <Container>
      <FlatList
        data={words}
        keyExtractor={(item, index) => `word-${index}`}
        ListHeaderComponent={
          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <H2 fontSize="$7" fontWeight="700" color="$color">
                Configuración
              </H2>
              <Button variant="ghost" onPress={() => router.back()} size="$3">
                <Text>✕</Text>
              </Button>
            </XStack>

            <Card>
              <YStack gap="$4">
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

                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="$4" color="$colorSecondary">
                    Sin pista
                  </Text>
                  <Switch
                    size="$4"
                    checked={noHints}
                    onCheckedChange={setNoHints}
                  >
                    <Switch.Thumb />
                  </Switch>
                </XStack>
              </YStack>
            </Card>

            <YStack gap="$3" paddingBottom="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" fontWeight="700" color="$color">
                  Palabras ({words.length})
                </Text>
                <XStack gap="$2">
                  <Button size="$3" variant="secondary" onPress={() => setShowAIModal(true)}>
                    <Text>✨ IA</Text>
                  </Button>
                  <Button
                    size="$3"
                    variant="outline"
                    onPress={() => {
                      Alert.alert(
                        'Resetear Palabras',
                        `¿Cargar las ${DEFAULT_WORDS.length} palabras por defecto? Esto reemplazará todas las palabras actuales.`,
                        [
                          { text: 'Cancelar', style: 'cancel' },
                          { text: 'Resetear', style: 'destructive', onPress: resetWords }
                        ]
                      )
                    }}
                  >
                    <Text>🔄</Text>
                  </Button>
                  <Button size="$3" variant="secondary" onPress={handleAddNew}>
                    <Text>➕ Agregar</Text>
                  </Button>
                </XStack>
              </XStack>
            </YStack>
          </YStack>
        }
        renderItem={({ item, index }) => (
          <WordListItem
            word={item.word}
            hints={item.hints}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        initialNumToRender={15}
        maxToRenderPerBatch={5}
        windowSize={3}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 32 }}
        getItemLayout={(_data, index) => ({
          length: 80,
          offset: 88 * index,
          index,
        })}
      />

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

      {/* Modal para generar con IA */}
      <Modal visible={showAIModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => !isGenerating && setShowAIModal(false)}>
            <YStack flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <Card backgroundColor="$background" borderRadius="$6" padding="$5" margin="$4">
                  <YStack gap="$4">
                    <Text fontSize="$5" fontWeight="700" color="$color">
                      ✨ Generar Palabras con IA
                    </Text>

                    <YStack gap="$2">
                      <TextInput
                        value={aiPrompt}
                        onChangeText={setAiPrompt}
                        placeholder="Ej: 10 animales, 5 jugadores de fútbol argentinos..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={3}
                        editable={!isGenerating}
                        style={{
                          fontSize: 16,
                          padding: 12,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#DEE2E6',
                          backgroundColor: '#FFFFFF',
                          color: '#000',
                          minHeight: 80,
                          textAlignVertical: 'top',
                        }}
                      />
                      <Text fontSize="$3" color="$colorSecondary" opacity={0.7}>
                        Máximo 25 palabras por generación
                      </Text>
                    </YStack>

                    <XStack gap="$3" marginTop="$2">
                      <Button
                        flex={1}
                        variant="ghost"
                        onPress={() => {
                          setShowAIModal(false)
                          setAiPrompt('')
                        }}
                        disabled={isGenerating}
                      >
                        <Text>Cancelar</Text>
                      </Button>
                      <Button
                        flex={1}
                        variant="primary"
                        onPress={handleGenerateAI}
                        disabled={isGenerating}
                        opacity={isGenerating ? 0.7 : 1}
                      >
                        <Text>{isGenerating ? 'Generando...' : 'Generar'}</Text>
                      </Button>
                    </XStack>
                  </YStack>
                </Card>
              </TouchableWithoutFeedback>
            </YStack>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Preview de palabras generadas */}
      <Modal visible={showPreview} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <TouchableWithoutFeedback onPress={handleCancelGenerated}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: '#16213E',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
              maxHeight: '70%',
            }}
          >
            <Text fontSize="$5" fontWeight="700" color="#ECF0F1" marginBottom="$3">
              Palabras Generadas ({generatedWords.length})
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ maxHeight: 400 }}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {generatedWords.map((word, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#0F3460',
                    borderWidth: 1,
                    borderColor: '#34495E',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                  }}
                >
                  <Text fontSize="$4" fontWeight="700" color="#ECF0F1" marginBottom="$2">
                    {word.word}
                  </Text>
                  <Text fontSize="$3" color="#BDC3C7">
                    {word.hints[0]} • {word.hints[1]} • {word.hints[2]}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <XStack gap="$3" marginTop="$4">
              <Button flex={1} variant="ghost" onPress={handleCancelGenerated}>
                <Text>Descartar</Text>
              </Button>
              <Button flex={1} variant="primary" onPress={handleAcceptGenerated}>
                <Text>Agregar Todas</Text>
              </Button>
            </XStack>
          </View>
        </View>
      </Modal>
    </Container>
  )
}
