'use client';

import {
  chat,
  type ChatMessage,
} from '@/ai/flows/chat-with-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, Loader2, Send, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
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


export function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setError(null);
    
    const userMessage: ChatMessage = { role: 'user', content: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await chat(newMessages);
      setMessages([...newMessages, response]);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setInput('');
    }
  };
  
  const getAvatar = (role: 'user' | 'model') => {
    if (role === 'user') {
      return (
        <Avatar>
          <AvatarFallback><User/></AvatarFallback>
        </Avatar>
      );
    }
    return (
        <Avatar>
            <AvatarFallback className='bg-primary text-primary-foreground'><TeddyBearIcon className="w-5 h-5"/></AvatarFallback>
        </Avatar>
    )
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <TeddyBearIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Teddy Assistant</h1>
          <p className="text-muted-foreground">
            I'm Teddy! Ask me a question or for help with a task.
          </p>
        </div>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col gap-4">
            <ScrollArea className="flex-1 pr-4">
                <div className='space-y-4'>
                {messages.length === 0 && <p className="text-muted-foreground text-center">Hi there! I'm Teddy, your friendly AI bear. How can I help you today? You can ask me things like "What's the system status?"</p>}
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.role === 'model' && getAvatar(msg.role)}
                        <div className={cn("rounded-lg px-4 py-2 max-w-sm", msg.role === 'model' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                            {msg.content[0].text}
                        </div>
                        {msg.role === 'user' && getAvatar(msg.role)}
                    </div>
                ))}
                 {loading && (
                    <div className="flex items-start gap-3 justify-start">
                         {getAvatar('model')}
                        <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                 )}
                </div>
            </ScrollArea>

            {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Teddy anything..."
                className="bg-background"
                />
                <Button type="submit" disabled={loading || !input} size="icon">
                    <Send />
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
