export const DEFAULT_CHAT_MODEL: string = 'gpt-4o';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
  provider: 'openai' | 'google' | 'xai';
  context: string;
  capabilities: Array<'text' | 'vision' | 'reasoning' | 'code'>;
}

export const chatModels: Array<ChatModel> = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'Most capable GPT-4 model with vision',
    context: '128K tokens',
    capabilities: ['text', 'vision', 'code'],
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    description: 'Faster, more affordable GPT-4o',
    context: '128K tokens',
    capabilities: ['text', 'vision', 'code'],
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Latest GPT-4 with improved performance',
    context: '128K tokens',
    capabilities: ['text', 'vision', 'code'],
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and efficient for most tasks',
    context: '16K tokens',
    capabilities: ['text', 'code'],
  },
  
  // Google Models
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    description: 'Fastest multimodal model',
    context: '1M tokens',
    capabilities: ['text', 'vision', 'code', 'reasoning'],
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: 'Advanced reasoning and long context',
    context: '2M tokens',
    capabilities: ['text', 'vision', 'code', 'reasoning'],
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    description: 'Fast and efficient for everyday tasks',
    context: '1M tokens',
    capabilities: ['text', 'vision', 'code'],
  },
  
  // xAI Models
  {
    id: 'grok-2-vision-1212',
    name: 'Grok-2 Vision',
    provider: 'xai',
    description: 'Advanced reasoning with vision capabilities',
    context: '128K tokens',
    capabilities: ['text', 'vision', 'reasoning'],
  },
  {
    id: 'grok-2-1212',
    name: 'Grok-2',
    provider: 'xai',
    description: 'High-performance reasoning model',
    context: '128K tokens',
    capabilities: ['text', 'reasoning'],
  },
  {
    id: 'grok-3-mini-beta',
    name: 'Grok-3 Mini (Beta)',
    provider: 'xai',
    description: 'Compact reasoning model with thinking',
    context: '128K tokens',
    capabilities: ['text', 'reasoning'],
  },
];
