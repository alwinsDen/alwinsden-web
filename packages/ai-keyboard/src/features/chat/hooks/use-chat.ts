import { useRef, useState } from "react";

import {
  pickFile,
  pickFromCamera,
  pickFromLibrary,
} from "@/features/chat/services/attachments";
import { streamChatReply } from "@/features/chat/services/chat-api";
import {
  models,
  type Attachment,
  type ChatMessage,
  type ModelId,
} from "@/features/chat/model/types";

export function useChat() {
  const idRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(models[0].id);
  const [awaitingReply, setAwaitingReply] = useState(false);

  const nextId = () => {
    idRef.current += 1;
    return String(idRef.current);
  };

  const canSend =
    !awaitingReply && (input.trim().length > 0 || attachments.length > 0);
  const selectedModel =
    models.find((model) => model.id === selectedModelId) ?? models[0];

  const addAttachment = (attachment: Attachment) => {
    setAttachments((current) => [...current, attachment]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((current) =>
      current.filter((_, attachmentIndex) => attachmentIndex !== index),
    );
  };

  const chooseAttachment = async (picker: () => Promise<Attachment | null>) => {
    const attachment = await picker();
    if (attachment) addAttachment(attachment);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!canSend) return;

    const replyId = nextId();
    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text, attachments },
    ]);
    setInput("");
    setAttachments([]);
    setAwaitingReply(true);
    setMessages((current) => [
      ...current,
      { id: replyId, role: "assistant", text: "", attachments: [] },
    ]);

    const appendToReply = (append: (message: ChatMessage) => ChatMessage) => {
      setMessages((current) =>
        current.map((message) =>
          message.id === replyId ? append(message) : message,
        ),
      );
    };

    void streamChatReply(text || "(attachments only)", {
      onDelta: (delta) =>
        appendToReply((message) => ({
          ...message,
          text: message.text + delta,
        })),
      onDone: ({ sources, followUps }) => {
        appendToReply((message) => ({ ...message, sources, followUps }));
        setAwaitingReply(false);
      },
      onError: () => {
        const showPlaceholder = () => {
          appendToReply((message) => ({
            ...message,
            text:
              message.text ||
              `Placeholder reply. The AI backend isn't wired up yet.\n\nYou said: "${text || "(attachments only)"}"`,
          }));
          setAwaitingReply(false);
        };
        // Keep the loader visible a moment so it doesn't just flash by.
        setTimeout(showPlaceholder, 2000);
      },
    });
  };

  const startNewChat = () => {
    setMessages([]);
    setInput("");
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
