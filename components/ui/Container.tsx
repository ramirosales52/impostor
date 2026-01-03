import { YStack, YStackProps } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Container({ children, ...props }: YStackProps) {
  const insets = useSafeAreaInsets()
  
  return (
    <YStack 
      flex={1} 
      backgroundColor="$background" 
      paddingTop={insets.top} 
      paddingBottom={insets.bottom}
      paddingLeft={insets.left + 16}
      paddingRight={insets.right + 16}
      {...props}
    >
      {children}
    </YStack>
  )
}
