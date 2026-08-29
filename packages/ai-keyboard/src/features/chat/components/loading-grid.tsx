import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';

const CELL = 4;
const GAP = 1.5;
const DURATION = 650;

// chevron wavefront: (col + |row - 1|) * 90ms, matching the web Drive variant
const DELAYS = Array.from({ length: 9 }, (_, i) => {
  const row = Math.floor(i / 3);
  const col = i % 3;
  return (col + Math.abs(row - 1)) * 90;
});

function Cell({ delay, color }: { delay: number; color: string }) {
  const opacity = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: DURATION / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.15,
          duration: DURATION / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(DELAYS[DELAYS.length - 1] - delay),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [delay, opacity]);

  return (
    <Animated.View
      style={[styles.cell, { backgroundColor: color, opacity }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}

export function LoadingGrid() {
  const theme = useTheme();

  return (
    <View style={styles.grid} accessibilityLabel="Loading">
      {DELAYS.map((delay, index) => (
        <Cell key={index} delay={delay} color={theme.colors.onBackground} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CELL * 3 + GAP * 2,
    height: CELL * 3 + GAP * 2,
    gap: GAP,
  },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 1,
  },
});

export const LOADING_GRID_GAP = Spacing.two;
