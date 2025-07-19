'use client';

import {
  generateVideo,
  type GenerateVideoOutput,
} from '@/ai/flows/generate-video';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clapperboard, Loader2, Sparkles, Film } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function VideoStudio() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GenerateVideoOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateVideo({ prompt });
      setResult(response);
    } catch (err) {
      setError('Failed to generate video. The model may be busy, please try again in a few moments.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <Clapperboard className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Video Studio</h1>
          <p className="text-muted-foreground">
            Create short video clips from text with AI.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g., 'A majestic dragon soaring over a mystical forest at dawn.'"
          rows={3}
          className="bg-card"
        />
        <Button type="submit" disabled={loading || !prompt}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Video
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
          <Film className="w-16 h-16 animate-pulse text-primary" />
          <p className="font-semibold">Generating your video...</p>
          <p className='text-sm text-center'>This can take up to a minute. Please be patient.</p>
        </div>
      )}

      {result && (
        <Card className="flex-1">
          <CardContent className="p-4 h-full">
            <div className="relative w-full h-full rounded-md overflow-hidden bg-black">
              <video
                src={result.videoUrl}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
