'use client';

import { useEffect, useState } from 'react';
import { WidgetCard } from './widget-card';
import { Clock } from 'lucide-react';

interface WorldTime {
  city: string;
  time: string;
}

export function ClockWidget() {
  const [date, setDate] = useState<Date | null>(null);
  const [worldTimes, setWorldTimes] = useState<WorldTime[]>([]);

  useEffect(() => {
    const timeZones = [
      { city: 'New York', tz: 'America/New_York' },
      { city: 'London', tz: 'Europe/London' },
      { city: 'Tokyo', tz: 'Asia/Tokyo' },
    ];

    const updateClocks = () => {
        const now = new Date();
        setDate(now);
        setWorldTimes(
            timeZones.map(({ city, tz }) => ({
            city,
            time: now.toLocaleTimeString([], { timeZone: tz, hour: '2-digit', minute: '2-digit' }),
            }))
        );
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const time = date
    ? date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const day = date
    ? date.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : 'Loading...';

  return (
    <WidgetCard title="Clock" icon={Clock}>
      <div className="text-center py-4 space-y-4">
        <div className="flex items-baseline justify-center gap-2">
            <div className="text-4xl font-bold text-primary-foreground tracking-wider font-mono tabular-nums">
                {time || '...'}
            </div>
            <p className="text-sm text-muted-foreground">{day}</p>
        </div>
        <div className="flex justify-around text-xs text-muted-foreground border-t border-border/50 pt-3">
            {worldTimes.map(({city, time}) => (
                <div key={city}>
                    <p className="font-semibold">{city}</p>
                    <p>{time}</p>
                </div>
            ))}
        </div>
      </div>
    </WidgetCard>
  );
}
