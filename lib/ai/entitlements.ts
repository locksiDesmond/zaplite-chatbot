import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      'chat-model',
      'grok-2-vision-1212',
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'grok-2-vision-1212',
      'grok-2-1212',
      'grok-3-mini-beta',
      'gpt-4o',
      'gpt-4o-mini',
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: ['chat-model', 'grok-2-vision-1212'],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
