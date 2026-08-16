import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';

export function ChatHeader({ onMenu }: { onMenu: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.topBar}>
      <IconButton
        icon="menu"
        size={26}
        iconColor={theme.colors.onBackground}
        onPress={onMenu}
        accessibilityLabel="Open navigation"
      />
      <Text variant="titleMedium" style={styles.topBarTitle}>AI Chat</Text>
      <View style={styles.topBarSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { height: 58, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.one },
  topBarTitle: { color: '#f4f0ed', marginLeft: Spacing.one },
  topBarSpacer: { flex: 1 },
});
