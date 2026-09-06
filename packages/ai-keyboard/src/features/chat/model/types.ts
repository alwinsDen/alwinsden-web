export type Attachment =
  | { type: "image"; uri: string }
  | {
      type: "file";
      uri: string;
      name: string;
      mimeType?: string;
      size?: number;
    };

export type ChatSource = {
  name: string;
  domain: string;
  href: string;
  imageUri: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  attachments: Attachment[];
  /** cited sources for assistant messages */
  sources?: ChatSource[];
  /** suggested follow-up prompts for assistant messages */
  followUps?: string[];
};

export const models = [
  { id: "leptos_v0.1", label: "Leptos Quick", tag: "Default" },
  { id: "provider", label: "Add Provider", tag: "Setup" },
] as const;

export type ModelId = (typeof models)[number]["id"];
