import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export function ChatDrawer({ visible, onClose, onNewChat }: { visible: boolean; onClose: () => void; onNewChat: () => void }) {
  const theme = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.drawerOverlay}>
        <SafeAreaView style={[styles.drawer, { backgroundColor: theme.colors.surface }]} edges={['top', 'bottom']}>
          <View style={styles.drawerHeader}>
            <Text variant="titleLarge" style={styles.drawerTitle}>AI Chat</Text>
            <IconButton icon="close" iconColor={theme.colors.onSurface} onPress={onClose} accessibilityLabel="Close navigation" />
          </View>
          <Pressable style={styles.drawerAction} onPress={onNewChat}>
            <Icon source="plus" size={22} color={theme.colors.onSurface} />
            <Text variant="bodyLarge" style={styles.drawerActionText}>New chat</Text>
          </Pressable>
          <Text variant="labelMedium" style={styles.drawerSectionLabel}>Navigation</Text>
          <Pressable style={styles.drawerAction} onPress={onClose}>
            <Icon source="message-text-outline" size={22} color={theme.colors.onSurface} />
            <Text variant="bodyLarge" style={styles.drawerActionText}>Chats</Text>
          </Pressable>
          <Pressable style={styles.drawerAction} onPress={onClose}>
            <Icon source="cog-outline" size={22} color={theme.colors.onSurface} />
            <Text variant="bodyLarge" style={styles.drawerActionText}>Settings</Text>
          </Pressable>
        </SafeAreaView>
        <Pressable style={styles.drawerBackdrop} onPress={onClose} accessibilityLabel="Close navigation" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawerOverlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.48)' },
  drawer: { width: '82%', paddingHorizontal: Spacing.two },
  drawerBackdrop: { flex: 1 },
  drawerHeader: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  drawerTitle: { color: '#f4f0ed', paddingHorizontal: Spacing.two },
  drawerSectionLabel: {
    color: '#aaa3ad',
    paddingHorizontal: Spacing.two,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.one,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  drawerAction: { minHeight: 52, borderRadius: 14, paddingHorizontal: Spacing.two, flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  drawerActionText: { color: '#f4f0ed' },
});
