import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="logo" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
        <Stack.Screen name="community" options={{ headerShown: false }} />
        <Stack.Screen name="deaf-mute-questions" options={{ headerShown: false }} />
        <Stack.Screen name="non-deaf-mute-questions" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="indian-sign-language" options={{ headerShown: false }} />
        <Stack.Screen name="speech-therapy" options={{ headerShown: false }} />
        <Stack.Screen name="comm-screen" options={{ headerShown: false  }} />
        <Stack.Screen name="opportunities" options={{ headerShown: false }} />
        <Stack.Screen name="dictionary" options={{headerShown: false  }} />
        <Stack.Screen name="story-of-the-month" options={{headerShown: false  }} />
        <Stack.Screen name="basic-course" options={{headerShown: false  }}  />
        <Stack.Screen name="alphabet-lesson" options={{headerShown: false  }} />
      </Stack>
    </ThemeProvider>
  );
}