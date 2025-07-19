'use client';

import { generateImage, type GenerateImageOutput } from '@/ai/flows/generate-image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

export function ImageStudio() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GenerateImageOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateImage({ prompt });
      setResult(response);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <ImageIcon className="w-8 h-8 text-primary" />
        <div>
            <h1 className="text-2xl font-bold">Image Studio</h1>
            <p className="text-muted-foreground">Create images from text with AI.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A photo of a majestic lion in the savanna at sunset'"
          rows={3}
          className="bg-card"
        />
        <Button type="submit" disabled={loading || !prompt}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Image
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
            <p>Generating your image... this may take a moment.</p>
        </div>
      )}

      {result && (
        <Card className="flex-1">
          <CardContent className="p-4 h-full">
            <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                    src={result.imageUrl}
                    alt={prompt}
                    fill
                    className="object-contain"
                />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
