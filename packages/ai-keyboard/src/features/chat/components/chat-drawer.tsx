import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RnButton } from '@alwinsden-unified-ui/react-native-ui';
import { Spacing } from '@/constants/theme';

export function ChatDrawer({
  visible,
  onClose,
  onNewChat,
}: {
  visible: boolean;
  onClose: () => void;
  onNewChat: () => void;
}) {
  const theme = useTheme();
  const drawerWidth = Dimensions.get('window').width * 0.82;
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const [rendered, setRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(translateX, {
      toValue: -drawerWidth,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setRendered(false);
    });
  }, [drawerWidth, translateX, visible]);

  const close = () => onClose();

  return (
    <Modal visible={rendered} transparent animationType="none" onRequestClose={close}>
      <View style={styles.drawerOverlay}>
        <Animated.View
          style={[
            styles.drawer,
            { width: drawerWidth, backgroundColor: theme.colors.surface },
            { transform: [{ translateX }] },
          ]}>
          <SafeAreaView style={styles.drawerContent} edges={['top', 'bottom']}>
            <View style={styles.drawerHeader}>
              <Text variant="titleLarge" style={styles.drawerTitle}>
                AI Chat
              </Text>
              <IconButton
                icon="close"
                iconColor={theme.colors.onSurface}
                onPress={close}
                accessibilityLabel="Close navigation"
              />
            </View>
            <RnButton onPress={onNewChat}>New chat</RnButton>
            <Text variant="labelMedium" style={styles.drawerSectionLabel}>
              Navigation
            </Text>
            <Pressable style={styles.drawerAction} onPress={close}>
              <Icon source="message-text-outline" size={22} color={theme.colors.onSurface} />
              <Text variant="bodyLarge" style={styles.drawerActionText}>
                Chats
              </Text>
            </Pressable>
            <Pressable style={styles.drawerAction} onPress={close}>
              <Icon source="cog-outline" size={22} color={theme.colors.onSurface} />
              <Text variant="bodyLarge" style={styles.drawerActionText}>
                Settings
              </Text>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
        <Pressable style={styles.drawerBackdrop} onPress={close} accessibilityLabel="Close navigation" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawerOverlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.48)' },
  drawer: { overflow: 'hidden' },
  drawerContent: { flex: 1, paddingHorizontal: Spacing.two },
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
  drawerAction: {
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  drawerActionText: { color: '#f4f0ed' },
});
