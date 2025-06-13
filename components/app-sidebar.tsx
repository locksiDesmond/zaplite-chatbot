'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [search, setSearch] = useState('');

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 flex flex-col h-full">
      <SidebarHeader className="flex flex-col gap-2 p-4 pb-2 border-b border-sidebar-foreground/10">
        <Button
          className="w-full font-semibold text-base py-2 rounded-lg bg-gradient-to-tr from-pink-700 to-pink-500 text-white shadow-md hover:from-pink-800 hover:to-pink-600"
          onClick={() => {
            setOpenMobile(false);
            router.push('/');
            router.refresh();
          }}
        >
          + New Chat
        </Button>
        <Input
          className="mt-2 w-full rounded-md bg-sidebar-accent/30 border-none focus:ring-2 focus:ring-pink-500 text-sm px-3 py-2"
          placeholder="Search your threads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-foreground/10">
        {user ? (
          <SidebarUserNav user={user} />
        ) : (
          <Button
            className="w-full text-sm font-medium rounded-lg bg-sidebar-accent/40 hover:bg-sidebar-accent/60 text-white"
            variant="ghost"
            onClick={() => router.push('/api/auth/signin')}
          >
            <span className="mr-2">⇨</span> Login
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
