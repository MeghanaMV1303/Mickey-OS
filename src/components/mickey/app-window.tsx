'use client';

import type React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { App } from './apps';

interface AppWindowProps {
  app: App;
  children: React.ReactNode;
  onClose: () => void;
}

export function AppWindow({ app, children, onClose }: AppWindowProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-4xl h-full max-h-[85vh] shadow-2xl flex flex-col animate-in zoom-in-95 fade-in-50 duration-300 bg-card/90">
        <CardHeader className="flex flex-row items-center justify-between p-2 pl-4 border-b bg-card/80 rounded-t-lg">
          <div className="flex items-center gap-2 font-medium text-sm">
            <app.icon className="w-4 h-4" />
            <span>{app.name}</span>
          </div>
          <Button variant="ghost" size="icon" className="w-7 h-7" onClick={onClose}>
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-y-auto rounded-b-lg">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
