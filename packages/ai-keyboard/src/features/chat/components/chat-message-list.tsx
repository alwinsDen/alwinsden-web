import { forwardRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';
import { AttachmentView } from '@/features/chat/components/attachment-view';
import type { ChatMessage } from '@/features/chat/model/types';

export const ChatMessageList = forwardRef<FlatList<ChatMessage>, { messages: ChatMessage[] }>(
  function ChatMessageList({ messages }, ref) {
    const theme = useTheme();

    return (
      <FlatList
        ref={ref}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isUser = item.role === 'user';
          return (
            <View style={[styles.messageRow, isUser ? styles.rowUser : styles.rowAssistant]}>
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.bubbleUser : styles.bubbleAssistant,
                  { backgroundColor: isUser ? theme.colors.primaryContainer : 'transparent' },
                ]}>
                {item.attachments.map((attachment, index) => (
                  <AttachmentView key={index} attachment={attachment} />
                ))}
                {item.text.length > 0 && (
                  <Text
                    variant="bodyLarge"
                    style={[
                      isUser ? styles.userMessageText : styles.assistantMessageText,
                      {
                        color: isUser
                          ? theme.colors.onPrimaryContainer
                          : theme.colors.onBackground,
                      },
                    ]}>
                    {item.text}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => ref && typeof ref !== 'function' && ref.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <View
                style={[styles.emptyIconRing, { borderColor: theme.colors.secondaryContainer }]}
              />
              <View style={[styles.emptyIconWrap, styles.emptyIconCore, { backgroundColor: theme.colors.secondaryContainer }]}>
                <Icon source="chat-outline" size={36} color={theme.colors.onSecondaryContainer} />
              </View>
              <View style={[styles.emptyChip, styles.emptyChipTopRight, { backgroundColor: theme.colors.primaryContainer }]}>
                <Icon source="star-four-points" size={14} color={theme.colors.onPrimaryContainer} />
              </View>
              <View style={[styles.emptyChip, styles.emptyChipBottomLeft, { backgroundColor: theme.colors.tertiaryContainer }]}>
                <Icon source="paperclip" size={12} color={theme.colors.onTertiaryContainer} />
              </View>
            </View>
            <View style={styles.emptyTextGroup}>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                Hi, Alwin
              </Text>
              <Text
                variant="bodyMedium"
                style={[styles.emptySubtitle, styles.emptySubtitleFont, { color: theme.colors.onSurfaceVariant }]}>
                Lets work on something!
              </Text>
            </View>
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  listContent: { padding: Spacing.three, gap: Spacing.two, flexGrow: 1 },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconRing: {
    position: 'absolute',
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  emptyIconCore: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  emptyChip: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.85)',
  },
  emptyChipTopRight: { top: -4, right: -14 },
  emptyChipBottomLeft: { bottom: -2, left: -14 },
  emptyTextGroup: { alignItems: 'center', gap: Spacing.one, maxWidth: 260, marginTop: 10 },
  emptyTitle: { fontFamily: 'EBGaramond_500Medium', fontSize: 24, lineHeight: 30 },
  emptySubtitle: { textAlign: 'center', fontSize: 18 },
  emptySubtitleFont: { fontFamily: 'EBGaramond_400Regular' },
  messageRow: { flexDirection: 'row' },
  rowUser: { justifyContent: 'flex-end' },
  rowAssistant: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: Spacing.two,
  },
  bubbleUser: { borderBottomRightRadius: 6 },
  bubbleAssistant: {
    borderBottomLeftRadius: 6,
    maxWidth: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  userMessageText: { fontSize: 18, lineHeight: 28 },
  assistantMessageText: { fontSize: 18, marginTop: 15, marginBottom: 15 },
});
