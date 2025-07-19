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
            <AvatarFallback className='bg-primary text-primary-foreground'><BrainCircuit/></AvatarFallback>
        </Avatar>
    )
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <BrainCircuit className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Chat with the AI or ask it to perform tasks.
          </p>
        </div>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col gap-4">
            <ScrollArea className="flex-1 pr-4">
                <div className='space-y-4'>
                {messages.length === 0 && <p className="text-muted-foreground text-center">Ask me anything... e.g., "What's the system status?"</p>}
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
                placeholder="Ask about system status..."
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
