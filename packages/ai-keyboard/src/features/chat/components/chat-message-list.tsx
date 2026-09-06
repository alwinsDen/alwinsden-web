import { forwardRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { Spacing, Colors, FontSize } from "@/constants/theme";
import { AssistantMessage } from "@/features/chat/components/assistant-message";
import { AttachmentView } from "@/features/chat/components/attachment-view";
import type { ChatMessage } from "@/features/chat/model/types";

export const ChatMessageList = forwardRef<
  FlatList<ChatMessage>,
  { messages: ChatMessage[]; loading: boolean }
>(function ChatMessageList({ messages, loading }, ref) {
  const theme = useTheme();
  const streamingId = loading
    ? [...messages].reverse().find((message) => message.role === "assistant")
        ?.id
    : undefined;

  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isUser = item.role === "user";
        return (
          <View
            style={[
              styles.messageRow,
              isUser ? styles.rowUser : styles.rowAssistant,
            ]}
          >
            <View
              style={[
                styles.bubble,
                !isUser && styles.bubbleAssistant,
                {
                  backgroundColor: isUser
                    ? theme.colors.primaryContainer
                    : "transparent",
                },
              ]}
            >
              {item.attachments.map((attachment, index) => (
                <AttachmentView key={index} attachment={attachment} />
              ))}
              {isUser && item.text.length > 0 && (
                <Text
                  variant="bodyLarge"
                  style={[
                    styles.userMessageText,
                    { color: theme.colors.onPrimaryContainer },
                  ]}
                >
                  {item.text}
                </Text>
              )}
              {!isUser && (
                <AssistantMessage
                  text={item.text}
                  streaming={item.id === streamingId}
                  showLoadingIntro={
                    item.id === streamingId && item.text.length === 0
                  }
                />
              )}
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() =>
        ref &&
        typeof ref !== "function" &&
        ref.current?.scrollToEnd({ animated: true })
      }
      ListFooterComponent={null}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <View
              style={[
                styles.emptyIconRing,
                { borderColor: theme.colors.secondaryContainer },
              ]}
            />
            <View
              style={[
                styles.emptyIconWrap,
                styles.emptyIconCore,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
            >
              <Icon
                source="chat-outline"
                size={36}
                color={theme.colors.onSecondaryContainer}
              />
            </View>
            <View
              style={[
                styles.emptyChip,
                styles.emptyChipTopRight,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <Icon
                source="star-four-points"
                size={14}
                color={theme.colors.onPrimaryContainer}
              />
            </View>
            <View
              style={[
                styles.emptyChip,
                styles.emptyChipBottomLeft,
                { backgroundColor: theme.colors.tertiaryContainer },
              ]}
            >
              <Icon
                source="paperclip"
                size={12}
                color={theme.colors.onTertiaryContainer}
              />
            </View>
          </View>
          <View style={styles.emptyTextGroup}>
            <Text variant="titleMedium" style={styles.emptyTitle}>
              Hi, Alwin
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.emptySubtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Lets work on something!
            </Text>
          </View>
        </View>
      }
    />
  );
});

const styles = StyleSheet.create({
  listContent: { padding: Spacing.three, gap: Spacing.two, flexGrow: 1 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconRing: {
    position: "absolute",
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderStyle: "dashed",
    opacity: 0.5,
  },
  emptyIconCore: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  emptyChip: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.background,
  },
  emptyChipTopRight: { top: -4, right: -14 },
  emptyChipBottomLeft: { bottom: -2, left: -14 },
  emptyTextGroup: {
    alignItems: "center",
    gap: Spacing.one,
    maxWidth: 260,
    marginTop: 10,
  },
  emptyTitle: {
    fontFamily: "EBGaramond_500Medium",
    fontSize: FontSize.emptyTitle,
    lineHeight: FontSize.emptyTitle + 6,
  },
  emptySubtitle: {
    textAlign: "center",
    fontSize: FontSize.emptySubtitle,
    fontFamily: "Geist_400Regular",
  },
  messageRow: { flexDirection: "row" },
  rowUser: { justifyContent: "flex-end" },
  rowAssistant: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "90%",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: Spacing.two,
  },
  bubbleAssistant: {
    maxWidth: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  userMessageText: {
    fontSize: FontSize.chatInput,
    lineHeight: FontSize.chatInput + 7,
    fontFamily: "Geist_400Regular",
  },
});
