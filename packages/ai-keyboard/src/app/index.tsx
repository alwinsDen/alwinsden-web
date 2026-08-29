import { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatComposer } from '@/features/chat/components/chat-composer';
import { ChatDrawer } from '@/features/chat/components/chat-drawer';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { ChatMessageList } from '@/features/chat/components/chat-message-list';
import { useChat } from '@/features/chat/hooks/use-chat';
import type { ChatMessage } from '@/features/chat/model/types';

export default function ChatScreen() {
  const theme = useTheme();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const chat = useChat();

  const startNewChat = () => {
    chat.startNewChat();
    setSidebarVisible(false);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        <ChatHeader onMenu={() => setSidebarVisible(true)} />
        <ChatMessageList ref={listRef} messages={chat.messages} loading={chat.awaitingReply} />
        <ChatComposer
          input={chat.input}
          onInputChange={chat.setInput}
          attachments={chat.attachments}
          onRemoveAttachment={chat.removeAttachment}
          selectedModelId={chat.selectedModelId}
          onModelChange={chat.setSelectedModelId}
          canSend={chat.canSend}
          onSend={chat.sendMessage}
          onCamera={chat.chooseCamera}
          onLibrary={chat.chooseLibrary}
          onFile={chat.chooseFile}
        />
        <ChatDrawer visible={sidebarVisible} onClose={() => setSidebarVisible(false)} onNewChat={startNewChat} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
