import { useEffect } from 'react';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  EBGaramond_400Regular,
  EBGaramond_500Medium,
} from '@expo-google-fonts/eb-garamond';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <PaperProvider theme={MD3DarkTheme}>
          <KeyboardProvider>
            <AnimatedSplashOverlay />
            <Stack screenOptions={{ headerShown: false }} />
          </KeyboardProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
