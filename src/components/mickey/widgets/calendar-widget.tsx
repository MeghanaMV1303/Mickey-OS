'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { WidgetCard } from './widget-card';
import { CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const getInitialEvents = () => {
    const today = new Date();
    return [
      { date: new Date(new Date().setDate(today.getDate() + 2)), title: 'Team Sync', color: 'bg-primary' },
      { date: new Date(new Date().setDate(today.getDate() + 5)), title: 'Project Deadline', color: 'bg-destructive' },
      { date: new Date(new Date().setDate(today.getDate() + 10)), title: 'Dentist', color: 'bg-accent' },
    ];
}


export function CalendarWidget() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [events] = useState(getInitialEvents);

    const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 2);

    return (
        <WidgetCard title="Calendar" icon={CalendarDays} className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0 [&_td]:p-0"
                        classNames={{
                            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        }}
                        components={{
                            DayContent: ({ date }) => {
                              const dayEvent = events.find(
                                (event) => event.date.toDateString() === date.toDateString()
                              );
                              return (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <span>{date.getDate()}</span>
                                  {dayEvent && (
                                    <div className={cn('absolute bottom-1 w-1.5 h-1.5 rounded-full', dayEvent.color)}></div>
                                  )}
                                </div>
                              );
                            },
                        }}
                    />
                </div>
                 <div className="w-full md:w-48 flex-shrink-0 space-y-3 border-l-0 md:border-l pl-0 md:pl-4">
                    <h4 className="font-semibold text-sm">Upcoming</h4>
                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-3">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div className="text-xs text-center font-semibold text-muted-foreground pt-1">
                                        <div>{event.date.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                        <div className="text-lg font-bold text-foreground">{event.date.getDate()}</div>
                                    </div>
                                    <p className="font-medium text-sm pt-1">{event.title}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No upcoming events.</p>
                    )}
                </div>
            </div>
        </WidgetCard>
    )
}
