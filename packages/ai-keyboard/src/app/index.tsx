import * as DocumentPicker from 'expo-document-picker';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  Appbar,
  Icon,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

type Attachment =
  | { type: 'image'; uri: string }
  | { type: 'file'; uri: string; name: string; mimeType?: string; size?: number };

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  attachments: Attachment[];
};

function AttachmentView({
  attachment,
  thumbnail = false,
}: {
  attachment: Attachment;
  thumbnail?: boolean;
}) {
  const theme = useTheme();

  if (attachment.type === 'image') {
    return (
      <ExpoImage
        source={{ uri: attachment.uri }}
        style={thumbnail ? styles.attachmentThumb : styles.attachmentImage}
        contentFit="cover"
      />
    );
  }

  return (
    <View style={[styles.fileChip, { backgroundColor: theme.colors.surface }]}>
      <Icon source="file" size={20} color={theme.colors.onSurfaceVariant} />
      <Text variant="labelMedium" numberOfLines={1} style={styles.fileName}>
        {attachment.name}
      </Text>
    </View>
  );
}

export default function ChatScreen() {
  const theme = useTheme();
  const idRef = useRef(0);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const inputRef = useRef<RNTextInput>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [awaitingReply, setAwaitingReply] = useState(false);

  const canSend = !awaitingReply && (input.trim().length > 0 || attachments.length > 0);

  const nextId = () => {
    idRef.current += 1;
    return String(idRef.current);
  };

  const addAttachment = (attachment: Attachment) => {
    setAttachments((prev) => [...prev, attachment]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const openCamera = async () => {
    setPickerVisible(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled) addAttachment({ type: 'image', uri: result.assets[0].uri });
  };

  const openLibrary = async () => {
    setPickerVisible(false);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      selectionLimit: 1,
    });
    if (!result.canceled) addAttachment({ type: 'image', uri: result.assets[0].uri });
  };

  const openFiles = async () => {
    setPickerVisible(false);
    const result = await DocumentPicker.getDocumentAsync();
    if (result.canceled) return;
    const asset = result.assets[0];
    addAttachment({
      type: 'file',
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType,
      size: asset.size,
    });
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!canSend || (!text && attachments.length === 0)) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text, attachments },
    ]);
    setInput('');
    setAttachments([]);
    setAwaitingReply(true);

    setTimeout(() => {
      const replyText = text
        ? `Placeholder reply. The AI backend isn't wired up yet.\n\nYou said: "${text}"`
        : 'Placeholder reply. The AI backend is not wired up yet.';
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: replyText, attachments: [] },
      ]);
      setAwaitingReply(false);
    }, 500);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.rowUser : styles.rowAssistant]}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAssistant,
            {
              backgroundColor: isUser
                ? theme.colors.primaryContainer
                : theme.colors.surfaceVariant,
            },
          ]}>
          {item.attachments.map((attachment, index) => (
            <AttachmentView key={index} attachment={attachment} />
          ))}
          {item.text.length > 0 && (
            <Text
              variant="bodyLarge"
              style={{
                color: isUser
                  ? theme.colors.onPrimaryContainer
                  : theme.colors.onSurfaceVariant,
              }}>
              {item.text}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}>
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        <Appbar.Header
          mode="center-aligned"
          style={{ backgroundColor: theme.colors.background }}>
          <Appbar.Content title="AI Chat" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View
                style={[
                  styles.emptyIconWrap,
                  { backgroundColor: theme.colors.secondaryContainer },
                ]}>
                <Icon
                  source="chat-outline"
                  size={36}
                  color={theme.colors.onSecondaryContainer}
                />
              </View>
              <Text variant="titleMedium">No messages yet</Text>
              <Text
                variant="bodyMedium"
                style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}>
                Send a message to start the conversation.
              </Text>
            </View>
          }
        />

        <View
          style={[
            styles.composer,
            { backgroundColor: theme.colors.elevation.level2 },
          ]}>
          {attachments.length > 0 && (
            <View style={styles.attachmentRow}>
              {attachments.map((attachment, index) => (
                <View key={index} style={styles.thumbWrap}>
                  <AttachmentView attachment={attachment} thumbnail />
                  <IconButton
                    icon="close"
                    mode="contained"
                    size={12}
                    style={styles.thumbRemove}
                    onPress={() => removeAttachment(index)}
                    accessibilityLabel="Remove attachment"
                  />
                </View>
              ))}
            </View>
          )}
          <Pressable onPress={() => inputRef.current?.focus()}>
            <TextInput
              ref={inputRef}
              mode="flat"
              multiline
              value={input}
              onChangeText={setInput}
              placeholder="Message"
              style={styles.input}
              contentStyle={styles.inputContent}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              cursorColor={theme.colors.primary}
              selectionColor={theme.colors.primary}
              onSubmitEditing={sendMessage}
            />
          </Pressable>
          <View style={styles.inputRow}>
            <Menu
              visible={pickerVisible}
              onDismiss={() => setPickerVisible(false)}
              anchorPosition="top"
              contentStyle={styles.menu}
              anchor={
                <IconButton
                  icon="plus"
                  mode="contained-tonal"
                  onPress={() => setPickerVisible(true)}
                  accessibilityLabel="Add attachment"
                />
              }>
              <Menu.Item
                leadingIcon="image"
                title="Photo Library"
                onPress={openLibrary}
              />
              <Menu.Item
                leadingIcon="camera"
                title="Camera"
                onPress={openCamera}
              />
              <Menu.Item
                leadingIcon="file"
                title="File"
                onPress={openFiles}
              />
            </Menu>
            <View style={styles.spacer} />
            <IconButton
              icon="send"
              mode="contained"
              disabled={!canSend}
              onPress={sendMessage}
              accessibilityLabel="Send message"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
  },
  listContent: {
    padding: Spacing.three,
    gap: Spacing.two,
    flexGrow: 1,
  },
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
  emptySubtitle: {
    textAlign: 'center',
  },
  messageRow: {
    flexDirection: 'row',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: Spacing.two,
  },
  bubbleUser: {
    borderBottomRightRadius: 6,
  },
  bubbleAssistant: {
    borderBottomLeftRadius: 6,
  },
  attachmentImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  attachmentThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  fileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: 10,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    maxWidth: 240,
  },
  fileName: {
    flexShrink: 1,
  },
  composer: {
    marginHorizontal: Spacing.two,
    marginBottom: Spacing.two,
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.two,
  },
  attachmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    paddingTop: Spacing.two,
  },
  thumbWrap: {
    // Room for the remove badge that overhangs the thumbnail corner.
    marginTop: Spacing.one,
    marginRight: Spacing.one,
  },
  thumbRemove: {
    position: 'absolute',
    top: -Spacing.one,
    right: -Spacing.one,
    margin: 0,
    width: 20,
    height: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  spacer: {
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
    minHeight: 44,
    maxHeight: 140,
  },
  inputContent: {
    paddingHorizontal: Spacing.one,
  },
  menu: {
    borderRadius: 16,
  },
});
