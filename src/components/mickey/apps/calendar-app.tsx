
'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PartyPopper } from 'lucide-react';

const getInitialEvents = () => {
    const today = new Date();
    return [
      { date: new Date(new Date().setDate(today.getDate() + 2)), title: 'Team Sync', color: 'bg-primary text-primary-foreground' },
      { date: new Date(new Date().setDate(today.getDate() + 5)), title: 'Project Deadline', color: 'bg-destructive text-destructive-foreground' },
      { date: new Date(new Date().setDate(today.getDate() + 5)), title: 'Lunch with Sarah', color: 'bg-accent text-accent-foreground' },
      { date: new Date(new Date().setDate(today.getDate() + 10)), title: 'Dentist Appointment', color: 'bg-secondary text-secondary-foreground' },
    ];
}

export function CalendarApp() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(getInitialEvents());

  const today = new Date();
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);

  return (
    <div className="p-4 h-full flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
                <Card className="p-2 bg-primary/20 border-primary/50">
                    <PartyPopper className="w-8 h-8 text-primary" />
                </Card>
                <div>
                    <h1 className="text-2xl font-bold">Cute Calendar</h1>
                    <p className="text-muted-foreground">Your adorable agenda!</p>
                </div>
            </div>
            <Card className='flex-1 flex items-center justify-center'>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    classNames={{
                        head_cell: "text-muted-foreground rounded-md w-12 font-normal text-[0.8rem]",
                        cell: "h-12 w-12 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    }}
                    components={{
                        DayContent: ({ date }) => {
                          const dayEvents = events.filter(
                            (event) => event.date.toDateString() === date.toDateString()
                          );
                          return (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <span>{date.getDate()}</span>
                              {dayEvents.length > 0 && (
                                <div className="absolute bottom-2 flex gap-1">
                                  {dayEvents.map((event, i) => (
                                    <div key={i} className={cn('w-1.5 h-1.5 rounded-full', event.color)}></div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        },
                    }}
                />
            </Card>
        </div>
        <div className="w-full md:w-72 flex-shrink-0">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>What's next on your agenda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, i) => (
                             <div key={i} className="flex items-start gap-3">
                                <div className="text-sm text-center font-semibold bg-muted p-2 rounded-md">
                                    <div>{event.date.toLocaleString('default', { month: 'short' })}</div>
                                    <div className="text-lg">{event.date.getDate()}</div>
                                </div>
                                <div>
                                    <p className="font-medium">{event.title}</p>
                                    <p className="text-xs text-muted-foreground">{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                        {upcomingEvents.length === 0 && <p className="text-muted-foreground text-sm text-center pt-4">No upcoming events. Time to relax!</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
