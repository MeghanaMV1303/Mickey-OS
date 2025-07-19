'use client';

import { useEffect, useState } from 'react';
import { WidgetCard } from './widget-card';
import { Clock } from 'lucide-react';

export function ClockWidget() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = date
    ? date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null;

  const day = date
    ? date.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Loading...';

  return (
    <WidgetCard title="Clock" icon={Clock}>
      <div className="text-center py-4">
        <p className="text-5xl font-bold text-primary-foreground tracking-wider h-[48px]">
          {time || '...'}
        </p>
        <p className="text-sm text-muted-foreground mt-2">{day}</p>
      </div>
    </WidgetCard>
  );
}
