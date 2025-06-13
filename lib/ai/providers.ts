import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const providers = {
  openai: {
    'gpt-4o': openai('gpt-4o'),
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'gpt-4-turbo': openai('gpt-4-turbo'),
    'gpt-3.5-turbo': openai('gpt-3.5-turbo'),
  },
  google: {
    'gemini-2.0-flash-exp': google('gemini-2.0-flash-exp'),
    'gemini-1.5-pro': google('gemini-1.5-pro'),
    'gemini-1.5-flash': google('gemini-1.5-flash'),
  },
  xai: {
    'grok-2-vision-1212': xai('grok-2-vision-1212'),
    'grok-2-1212': xai('grok-2-1212'),
    'grok-3-mini-beta': xai('grok-3-mini-beta'),
  },
};

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'grok-2-vision-1212': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        // OpenAI models
        'gpt-4o': providers.openai['gpt-4o'],
        'gpt-4o-mini': providers.openai['gpt-4o-mini'],
        'gpt-4-turbo': providers.openai['gpt-4-turbo'],
        'gpt-3.5-turbo': providers.openai['gpt-3.5-turbo'],
        
        // Google models
        'gemini-2.0-flash-exp': providers.google['gemini-2.0-flash-exp'],
        'gemini-1.5-pro': providers.google['gemini-1.5-pro'],
        'gemini-1.5-flash': providers.google['gemini-1.5-flash'],
        
        // xAI models
        'grok-2-vision-1212': providers.xai['grok-2-vision-1212'],
        'grok-2-1212': providers.xai['grok-2-1212'],
        'grok-3-mini-beta': wrapLanguageModel({
          model: providers.xai['grok-3-mini-beta'],
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        
        // Legacy compatibility
        'chat-model': providers.xai['grok-2-vision-1212'],
         'title-model': providers.xai['grok-2-1212'],
        'artifact-model': providers.xai['grok-2-1212'],
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
