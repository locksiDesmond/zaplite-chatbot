'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { saveChatModelAsCookie } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { chatModels } from '@/lib/ai/models';
import { cn } from '@/lib/utils';

import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  OpenAIIcon,
  GoogleIcon,
  XAIIcon,
  VisionIcon,
  ReasoningIcon,
  ModelCodeIcon,
  SearchIcon,
} from './icons';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import type { Session } from 'next-auth';

const providerIcons = {
  openai: OpenAIIcon,
  google: GoogleIcon,
  xai: XAIIcon,
};

const capabilityIcons = {
  vision: VisionIcon,
  reasoning: ReasoningIcon,
  code: ModelCodeIcon,
};

export const ModelSelector = ({
  session,
  selectedModelId,
  className,
}: {
  session: Session;
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  const availableChatModels = chatModels.filter((chatModel) =>
    availableChatModelIds.includes(chatModel.id),
  );

  const filteredModels = availableChatModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedModels = filteredModels.reduce(
    (acc, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = [];
      }
      acc[model.provider].push(model);
      return acc;
    },
    {} as Record<string, typeof availableChatModels>,
  );

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find(
        (chatModel) => chatModel.id === optimisticModelId,
      ),
    [optimisticModelId, availableChatModels],
  );

  const ProviderIcon = selectedChatModel
    ? providerIcons[selectedChatModel.provider]
    : null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          data-testid="model-selector"
          variant="outline"
          className="md:px-3 md:h-[34px] gap-2"
        >
          {ProviderIcon && <ProviderIcon size={16} />}
          <span className="max-w-32 truncate">{selectedChatModel?.name}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[400px] p-3">
        <div className="relative mb-3">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {Object.entries(groupedModels).map(([provider, models]) => {
            const ProviderIcon =
              providerIcons[provider as keyof typeof providerIcons];

            return (
              <div key={provider} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  <ProviderIcon size={14} />
                  {provider}
                </div>

                <div className="space-y-1">
                  {models.map((chatModel) => {
                    const { id } = chatModel;
                    const isSelected = id === optimisticModelId;

                    return (
                      <button
                        key={id}
                        data-testid={`model-selector-item-${id}`}
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          startTransition(() => {
                            setOptimisticModelId(id);
                            saveChatModelAsCookie(id);
                          });
                        }}
                        className={cn(
                          'w-full flex items-start justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors text-left group',
                          isSelected && 'bg-accent',
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {chatModel.name}
                            </span>
                            {isSelected && (
                              <CheckCircleFillIcon
                                size={14}
                                className="text-primary"
                              />
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {chatModel.description}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{chatModel.context}</span>

                            <div className="flex items-center gap-1">
                              {chatModel.capabilities.includes('vision') && (
                                <div className="flex items-center gap-1">
                                  <VisionIcon size={12} />
                                  <span>Vision</span>
                                </div>
                              )}
                              {chatModel.capabilities.includes('reasoning') && (
                                <div className="flex items-center gap-1">
                                  <ReasoningIcon size={12} />
                                  <span>Reasoning</span>
                                </div>
                              )}
                              {chatModel.capabilities.includes('code') && (
                                <div className="flex items-center gap-1">
                                  <ModelCodeIcon size={12} />
                                  <span>Code</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {Object.keys(groupedModels).indexOf(provider) <
                  Object.keys(groupedModels).length - 1 && (
                  <DropdownMenuSeparator className="my-3" />
                )}
              </div>
            );
          })}

          {filteredModels.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No models found</p>
              <p className="text-xs">Try adjusting your search query</p>
            </div>
          )}
        </div>

        {!searchQuery && (
          <div className="mt-3 pt-3 border-t">
            <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
              <div className="text-sm font-semibold mb-1">
                Unlock all models + higher limits
              </div>
              <div className="text-xs opacity-80">$8/month</div>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
