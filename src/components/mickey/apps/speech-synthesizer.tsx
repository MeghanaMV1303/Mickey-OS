'use client';

import {
  generateSpeech,
  type GenerateSpeechOutput,
} from '@/ai/flows/generate-speech';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, MessageSquareText, Play, Pause } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SpeechSynthesizer() {
  const [prompt, setPrompt] = useState('Hello! I am a friendly AI assistant integrated into your desktop.');
  const [result, setResult] = useState<GenerateSpeechOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateSpeech({ text: prompt });
      setResult(response);
    } catch (err) {
      setError('Failed to generate speech. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <MessageSquareText className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Speech Synthesizer</h1>
          <p className="text-muted-foreground">
            Convert text into natural-sounding speech with AI.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'The quick brown fox jumps over the lazy dog.'"
          rows={4}
          className="bg-card"
        />
        <Button type="submit" disabled={loading || !prompt}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Speech
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
          <p>Synthesizing audio... this may take a moment.</p>
        </div>
      )}

      {result && (
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center gap-4">
            <h3 className='font-medium'>Generated Audio</h3>
            <audio 
              ref={audioRef}
              src={result.audioUrl} 
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <Button onClick={togglePlayback} size="lg" className="w-48">
              {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
