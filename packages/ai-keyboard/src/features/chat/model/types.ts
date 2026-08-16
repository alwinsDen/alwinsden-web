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
  { id: 'test_01', label: 'test_01' },
  { id: 'stest_02', label: 'test_02' },
  { id: 'test_03', label: 'test_03' },
] as const;

export type ModelId = (typeof models)[number]['id'];
