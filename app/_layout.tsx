import { Stack } from 'expo-router'
import { TamaguiProvider, Theme } from 'tamagui'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import config from '../tamagui.config'
import { useGameStore } from '../store/gameStore'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const initialize = useGameStore((state) => state.initialize)

  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    initialize()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="config" />
          <Stack.Screen name="game" />
        </Stack>
      </Theme>
    </TamaguiProvider>
  )
}
