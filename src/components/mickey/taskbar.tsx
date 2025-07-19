'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { apps, type App } from './apps';
import { useEffect, useState } from 'react';

interface TaskbarProps {
  onAppSelect: (app: App) => void;
}

export function Taskbar({ onAppSelect }: TaskbarProps) {
  const [time, setTime] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (app: App) => {
    onAppSelect(app);
    setPopoverOpen(false);
  };

  return (
    <footer className="h-14 bg-primary/50 backdrop-blur-lg border-t border-primary/20 shadow-t-lg flex items-center justify-between px-4 z-20">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <LayoutGrid className="w-5 h-5" />
            Menu
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bottom-2 -translate-y-12" side="top" align="start">
          <div className="p-2 grid grid-cols-4 gap-4">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors text-center"
              >
                <app.icon className="w-6 h-6 text-primary-foreground" />
                <span className="text-xs font-medium truncate w-full">{app.name}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="font-medium text-sm text-primary-foreground">{time}</div>
    </footer>
  );
}
