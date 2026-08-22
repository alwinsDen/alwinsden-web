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
            <View style={[styles.emptyIconWrap, { backgroundColor: theme.colors.secondaryContainer }]}>
              <Icon source="chat-outline" size={36} color={theme.colors.onSecondaryContainer} />
            </View>
            <Text variant="titleMedium">No messages yet</Text>
            <Text variant="bodyMedium" style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Send a message to start the conversation.
            </Text>
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
    gap: Spacing.two,
    paddingBottom: Spacing.six,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  emptySubtitle: { textAlign: 'center' },
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
