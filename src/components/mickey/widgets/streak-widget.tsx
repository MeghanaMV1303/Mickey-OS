'use client';

import { useState, useEffect } from 'react';
import { WidgetCard } from './widget-card';
import { Medal } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function StreakWidget() {
  const [streak, setStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const storedStreak = localStorage.getItem('loginStreak');
    const storedLastLogin = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();

    let currentStreak = storedStreak ? parseInt(storedStreak, 10) : 0;

    if (storedLastLogin) {
      const lastLogin = new Date(storedLastLogin);
      const diffTime = new Date(today).getTime() - lastLogin.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // Consecutive day
        currentStreak++;
      } else if (diffDays > 1) {
        // Streak broken
        currentStreak = 1;
      }
      // If diffDays is 0, do nothing, it's the same day.
    } else {
      // First login
      currentStreak = 1;
    }
    
    if (storedLastLogin !== today) {
      localStorage.setItem('loginStreak', currentStreak.toString());
      localStorage.setItem('lastLoginDate', today);
    }
    
    setStreak(currentStreak);
    setLastLoginDate(new Date(localStorage.getItem('lastLoginDate')!).toLocaleDateString());

  }, []);

  if (streak === 0) {
    return null; // Don't render anything until client-side hydration is complete
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-lg p-2 pr-4 shadow-lg border border-primary/20 cursor-default">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Medal className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-sm font-semibold">
              {streak} Day Streak!
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>You've logged in {streak} day{streak > 1 ? 's' : ''} in a row. Keep it up!</p>
            {lastLoginDate && <p className="text-xs text-muted-foreground">Last login: {lastLoginDate}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
