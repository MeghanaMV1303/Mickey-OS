'use client';

import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserPrompt = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <span className="text-green-400">user@mickey</span>
    <span className="text-blue-400">~</span>
    <span className="text-white">$</span>
    <span className="flex-1">{children}</span>
  </div>
);

export function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newOutput = [...output, `> ${input}`];
      if (input.trim() === 'clear') {
        setOutput([]);
      } else if (input.trim() === 'help') {
        newOutput.push('Available commands: help, clear, echo');
        setOutput(newOutput);
      } else if (input.startsWith('echo ')) {
        newOutput.push(input.substring(5));
        setOutput(newOutput);
      } else {
        newOutput.push(`-bash: ${input}: command not found`);
        setOutput(newOutput);
      }
      setHistory([input, ...history]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
        if(history.length > 0 && historyIndex < history.length -1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        if(historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else {
            setHistoryIndex(-1);
            setInput('');
        }
    }
  };

  return (
    <div className="bg-black text-white font-mono text-sm h-full flex flex-col p-2">
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
            {output.map((line, index) => (
                <div key={index} className={cn(line.startsWith('>') && "text-gray-400")}>{line.startsWith('>') ? <UserPrompt>{line.substring(2)}</UserPrompt> : line}</div>
            ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <UserPrompt>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full"
            autoFocus
          />
        </UserPrompt>
      </div>
    </div>
  );
}
