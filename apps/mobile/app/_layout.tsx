// apps/mobile/app/_layout.tsx
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    // You can add custom fonts here if needed
  })

  const colorScheme = useColorScheme()

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontsError])

  if (!fontsLoaded && !fontsError) {
    return null
  }

  return (
    <Provider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="routine/morning/index"
          options={{
            title: 'Morning Routine',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="routine/evening/index"
          options={{
            title: 'Evening Routine',
            presentation: 'card',
          }}
        />
      </Stack>
    </Provider>
  )
}
