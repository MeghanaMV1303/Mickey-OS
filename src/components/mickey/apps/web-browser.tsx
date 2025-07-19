'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe } from 'lucide-react';

export function WebBrowser() {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputValue, setInputValue] = useState('https://www.google.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputValue;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }
    setUrl(finalUrl + '?igu=1');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <form onSubmit={handleNavigate} className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a URL"
            className="bg-card"
          />
          <Button type="submit" variant="outline">Go</Button>
        </form>
      </div>
      <div className="flex-1 bg-white relative">
        {url ? (
          <iframe
            src={url}
            title="Web Browser"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Globe className="w-16 h-16 mb-4" />
            <p>Enter a URL to start browsing.</p>
          </div>
        )}
      </div>
    </div>
  );
}
