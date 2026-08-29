import { useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Icon, IconButton, Menu, Text, TextInput, useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';
import { AttachmentView } from '@/features/chat/components/attachment-view';
import { models, type Attachment, type ModelId } from '@/features/chat/model/types';

type ChatComposerProps = {
  input: string;
  onInputChange: (input: string) => void;
  attachments: Attachment[];
  onRemoveAttachment: (index: number) => void;
  selectedModelId: ModelId;
  onModelChange: (modelId: ModelId) => void;
  canSend: boolean;
  onSend: () => void;
  onCamera: () => Promise<void>;
  onLibrary: () => Promise<void>;
  onFile: () => Promise<void>;
};

export function ChatComposer({
  input,
  onInputChange,
  attachments,
  onRemoveAttachment,
  selectedModelId,
  onModelChange,
  canSend,
  onSend,
  onCamera,
  onLibrary,
  onFile,
}: ChatComposerProps) {
  const theme = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  const [attachmentMenuVisible, setAttachmentMenuVisible] = useState(false);
  const [modelMenuVisible, setModelMenuVisible] = useState(false);
  const selectedModel = models.find((model) => model.id === selectedModelId) ?? models[0];

  const runAttachmentPicker = async (picker: () => Promise<void>) => {
    setAttachmentMenuVisible(false);
    await picker();
  };

  const send = () => {
    Keyboard.dismiss();
    onSend();
  };

  return (
    <View style={[styles.composer, { backgroundColor: theme.colors.elevation.level2 }]}>
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
                onPress={() => onRemoveAttachment(index)}
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
          onChangeText={onInputChange}
          placeholder="Chat with Leptos agent..."
          placeholderTextColor={theme.colors.onSurfaceVariant}
          style={styles.input}
          contentStyle={styles.inputContent}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          cursorColor={theme.colors.primary}
          selectionColor={theme.colors.primary}
          onSubmitEditing={send}
        />
      </Pressable>
      <View style={styles.inputRow}>
        <Menu
          visible={attachmentMenuVisible}
          onDismiss={() => setAttachmentMenuVisible(false)}
          anchorPosition="top"
          contentStyle={styles.menu}
          anchor={
            <IconButton
              icon="plus"
              mode="contained-tonal"
              onPress={() => setAttachmentMenuVisible(true)}
              accessibilityLabel="Add attachment"
              size={18}
            />
          }>
          <Menu.Item leadingIcon="image" title="Photo Library" onPress={() => runAttachmentPicker(onLibrary)} />
          <Menu.Item leadingIcon="camera" title="Camera" onPress={() => runAttachmentPicker(onCamera)} />
          <Menu.Item leadingIcon="file" title="File" onPress={() => runAttachmentPicker(onFile)} />
        </Menu>
        <Menu
          visible={modelMenuVisible}
          onDismiss={() => setModelMenuVisible(false)}
          anchorPosition="top"
          contentStyle={styles.menu}
          anchor={
            <Pressable
              style={styles.modelButton}
              onPress={() => setModelMenuVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Choose model">
              <Text variant="labelLarge" style={styles.modelButtonText}>
                {selectedModel.label}
              </Text>
            </Pressable>
          }>
          {models.map((model) => (
            <Menu.Item
              key={model.id}
              title={model.label}
              leadingIcon={model.id === selectedModel.id ? 'check' : undefined}
              onPress={() => {
                onModelChange(model.id);
                setModelMenuVisible(false);
              }}
            />
          ))}
        </Menu>
        <View style={styles.spacer} />
        <IconButton size={18} icon="microphone-outline" mode="contained-tonal" onPress={() => undefined} accessibilityLabel="Voice input" />
        <IconButton
          icon="arrow-up"
          mode="contained"
          disabled={!canSend}
          onPress={send}
          accessibilityLabel="Send message"
          size={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  composer: {
    marginHorizontal: Spacing.two,
    marginBottom: Spacing.two,
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.three,
    borderColor: "grey",
    borderWidth: 1,
  },
  attachmentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, paddingTop: Spacing.three },
  thumbWrap: { marginTop: Spacing.two, marginRight: Spacing.one, paddingLeft: 8 },
  thumbRemove: { position: 'absolute', top: -Spacing.one, right: -Spacing.one, margin: 0, width: 20, height: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.two },
  modelButton: {
    paddingVertical: 10,
    borderRadius: 25,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: '#303030',
  },
  modelButtonText: { color: '#e5e1de' },
  spacer: { flex: 1 },
  input: { backgroundColor: 'transparent', paddingHorizontal: 0, minHeight: 62, maxHeight: 140 },
  inputContent: { paddingLeft: 8, paddingRight: 8, color: '#c6c3c0', fontSize: 15, fontFamily: 'Geist_400Regular' },
  menu: { borderRadius: 16 },
});
