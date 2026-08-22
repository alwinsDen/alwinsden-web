export type Attachment =
  | { type: 'image'; uri: string }
  | { type: 'file'; uri: string; name: string; mimeType?: string; size?: number };

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  attachments: Attachment[];
};

export const models = [
  { id: 'Sonnect 4.5', label: 'Sonnect 4.5' },
  { id: 'GLM 4.6', label: 'GLM 4.6' },
  { id: 'Sonnect 4.6', label: 'Sonnect 4.6' },
] as const;

export type ModelId = (typeof models)[number]['id'];
