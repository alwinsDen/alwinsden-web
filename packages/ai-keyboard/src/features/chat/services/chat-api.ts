import { fetch } from "expo/fetch";
import type { ChatSource } from "@/features/chat/model/types";

export type ChatStreamHandlers = {
  onDelta: (text: string) => void;
  onDone: (result: { sources: ChatSource[]; followUps: string[] }) => void;
  onError: (error: unknown) => void;
};

type ChatEvent =
  | { type: "delta"; text: string }
  | { type: "done"; sources: ChatSource[]; followUps: string[] };

const CHAT_URL = process.env.EXPO_PUBLIC_CHAT_URL ?? "http://localhost/chat";

/**
 * Streams an assistant reply as newline-delimited JSON events
 * (`{"type":"delta","text":...}` chunks, then one `{"type":"done",...}`).
 * Requires `expo/fetch` for ReadableStream support in React Native.
 */
export async function streamChatReply(
  message: string,
  { onDelta, onDone, onError }: ChatStreamHandlers,
): Promise<void> {
  try {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!response.ok || !response.body) {
      throw new Error(`Chat request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (line.trim().length === 0) continue;
        const event = JSON.parse(line) as ChatEvent;
        if (event.type === "delta") {
          onDelta(event.text);
        } else if (event.type === "done") {
          onDone({ sources: event.sources, followUps: event.followUps });
        }
      }
    }
  } catch (error) {
    onError(error);
  }
}
