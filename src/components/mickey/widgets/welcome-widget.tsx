'use client';

import { Mouse } from 'lucide-react';
import { WidgetCard } from './widget-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function WelcomeWidget() {
  return (
    <WidgetCard title="Welcome" icon={Mouse} className="lg:col-span-2">
      <div className="flex items-center gap-4 py-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-primary">
            <Mouse className="h-10 w-10 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="text-lg">
          <p className="font-semibold text-primary-foreground">Hi! I'm Mickey.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your friendly desktop assistant. Click the menu to explore apps or
            ask me a question.
          </p>
        </div>
      </div>
    </WidgetCard>
  );
}
