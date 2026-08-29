import { useEffect } from 'react';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  EBGaramond_400Regular,
  EBGaramond_500Medium,
} from '@expo-google-fonts/eb-garamond';
import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold } from '@expo-google-fonts/geist';
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { queryClient } from '@/lib/query-client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
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
        <QueryClientProvider client={queryClient}>
          <PaperProvider
            theme={{
              ...MD3DarkTheme,
              fonts: {
                ...MD3DarkTheme.fonts,
                bodyLarge: { ...MD3DarkTheme.fonts.bodyLarge, fontFamily: 'Geist_400Regular' },
                bodyMedium: { ...MD3DarkTheme.fonts.bodyMedium, fontFamily: 'Geist_400Regular' },
                bodySmall: { ...MD3DarkTheme.fonts.bodySmall, fontFamily: 'Geist_400Regular' },
                labelLarge: { ...MD3DarkTheme.fonts.labelLarge, fontFamily: 'Geist_500Medium' },
                labelMedium: { ...MD3DarkTheme.fonts.labelMedium, fontFamily: 'Geist_500Medium' },
                labelSmall: { ...MD3DarkTheme.fonts.labelSmall, fontFamily: 'Geist_500Medium' },
                titleLarge: { ...MD3DarkTheme.fonts.titleLarge, fontFamily: 'Geist_600SemiBold' },
                titleMedium: { ...MD3DarkTheme.fonts.titleMedium, fontFamily: 'Geist_600SemiBold' },
                titleSmall: { ...MD3DarkTheme.fonts.titleSmall, fontFamily: 'Geist_500Medium' },
              },
            }}>
            <KeyboardProvider>
              <AnimatedSplashOverlay />
              <Stack screenOptions={{ headerShown: false }} />
            </KeyboardProvider>
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
