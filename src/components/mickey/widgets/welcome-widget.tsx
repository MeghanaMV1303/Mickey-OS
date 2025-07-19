'use client';

import { WidgetCard } from './widget-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { SVGProps } from 'react';

const TeddyBearIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14c-1.93 0-3.5-1.57-3.5-3.5S13.57 9 15.5 9s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm-7 0c-1.93 0-3.5-1.57-3.5-3.5S6.57 9 8.5 9s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      <path d="M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <circle cx="8.5" cy="12.5" r="1" />
      <circle cx="15.5" cy="12.5" r="1" />
    </svg>
  );

export function WelcomeWidget() {
  return (
    <WidgetCard title="Welcome" icon={TeddyBearIcon} className="lg:col-span-2">
      <div className="flex items-center gap-4 py-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-primary">
            <TeddyBearIcon className="h-10 w-10 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="text-lg">
          <p className="font-semibold text-primary-foreground">Hi! I'm Teddy.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your friendly desktop assistant. Click the menu to explore apps or
            ask me a question.
          </p>
        </div>
      </div>
    </WidgetCard>
  );
}
