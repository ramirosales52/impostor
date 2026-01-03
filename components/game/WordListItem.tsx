import { XStack, Text, YStack } from 'tamagui'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Pressable } from 'react-native'

interface WordListItemProps {
  word: string
  hints: [string, string, string]
  onEdit: () => void
  onDelete: () => void
}

export function WordListItem({ word, hints, onEdit, onDelete }: WordListItemProps) {
  return (
    <Card pressable>
      <XStack gap="$3" alignItems="center" justifyContent="space-between">
        <YStack flex={1}>
          <Text fontSize="$5" fontWeight="700" color="$color">
            {word}
          </Text>
          <Text fontSize="$3" color="$colorSecondary">
            Pistas: {hints.join(', ')}
          </Text>
        </YStack>

        <XStack gap="$2">
          <Button size="$3" variant="ghost" onPress={onEdit} paddingHorizontal="$3">
            <Text>✏️</Text>
          </Button>
          <Button size="$3" variant="ghost" onPress={onDelete} paddingHorizontal="$3">
            <Text>🗑️</Text>
          </Button>
        </XStack>
      </XStack>
    </Card>
  )
}
