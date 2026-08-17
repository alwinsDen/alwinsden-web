import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
