import { useEffect, useRef, useState } from 'react';

import { pickFile, pickFromCamera, pickFromLibrary } from '@/features/chat/services/attachments';
import { models, type Attachment, type ChatMessage, type ModelId } from '@/features/chat/model/types';

export function useChat() {
  const idRef = useRef(0);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(models[0].id);
  const [awaitingReply, setAwaitingReply] = useState(false);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const nextId = () => {
    idRef.current += 1;
    return String(idRef.current);
  };

  const canSend = !awaitingReply && (input.trim().length > 0 || attachments.length > 0);
  const selectedModel = models.find((model) => model.id === selectedModelId) ?? models[0];

  const addAttachment = (attachment: Attachment) => {
    setAttachments((current) => [...current, attachment]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((current) => current.filter((_, attachmentIndex) => attachmentIndex !== index));
  };

  const chooseAttachment = async (picker: () => Promise<Attachment | null>) => {
    const attachment = await picker();
    if (attachment) addAttachment(attachment);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!canSend) return;

    setMessages((current) => [...current, { id: nextId(), role: 'user', text, attachments }]);
    setInput('');
    setAttachments([]);
    setAwaitingReply(true);

    replyTimeoutRef.current = setTimeout(() => {
      const replyText = text
        ? `Placeholder reply. The AI backend isn't wired up yet.\n\nYou said: "${text}"`
        : 'Placeholder reply. The AI backend is not wired up yet.';
      setMessages((current) => [
        ...current,
        { id: nextId(), role: 'assistant', text: replyText, attachments: [] },
      ]);
      setAwaitingReply(false);
      replyTimeoutRef.current = null;
    }, 500);
  };

  const startNewChat = () => {
    setMessages([]);
    setInput('');
    setAttachments([]);
  };

  return {
    messages,
    input,
    setInput,
    attachments,
    removeAttachment,
    selectedModel,
    selectedModelId,
    setSelectedModelId,
    awaitingReply,
    canSend,
    sendMessage,
    startNewChat,
    chooseCamera: () => chooseAttachment(pickFromCamera),
    chooseLibrary: () => chooseAttachment(pickFromLibrary),
    chooseFile: () => chooseAttachment(pickFile),
  };
}
