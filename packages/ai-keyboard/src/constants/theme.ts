/**
 * The app is dark-mode only — these are the colors used throughout.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  text: '#F2F3F7',
  textSecondary: '#A6ABBC',
  background: '#0D0E13',
  backgroundElement: '#1A1C24',
  backgroundSelected: '#262936',
  accent: '#8B7CF6',
  accentOn: '#F2F3F7',
  brand: '#F6E75A',
  brandOn: '#14130A',
  brandBorder: '#4D4826',
  border: '#2B2E3B',
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
