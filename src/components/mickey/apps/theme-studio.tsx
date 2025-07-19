
'use client';

import { generateTheme, type GenerateThemeOutput } from '@/ai/flows/generate-theme';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useThemeManager } from '../theme-provider';

export function ThemeStudio() {
  const [prompt, setPrompt] = useState('A serene, minimalist pink mountain range at dawn');
  const [result, setResult] = useState<GenerateThemeOutput | null>(null);
  const [isGenerating, startGenerating] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { setCustomTheme } = useThemeManager();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    startGenerating(async () => {
        try {
            const response = await generateTheme({ prompt });
            setResult(response);
        } catch (err) {
            setError('Failed to generate theme. The model might be overloaded. Please try again in a moment.');
            console.error(err);
        }
    });
  };

  const applyTheme = () => {
    if (result) {
        setCustomTheme(result.palette, result.imageUrl);
        toast({
            title: 'Theme Applied!',
            description: 'Your new desktop theme is now active.',
        });
    }
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <Palette className="w-8 h-8 text-primary" />
        <div>
            <h1 className="text-2xl font-bold">Theme Studio</h1>
            <p className="text-muted-foreground">Create and apply system-wide themes with AI.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A vibrant cyberpunk city at night with neon lights'"
          rows={3}
          className="bg-card"
        />
        <Button type="submit" disabled={isGenerating || !prompt}>
          {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Theme
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isGenerating && (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
            <p>Generating your theme... this can take up to 30 seconds.</p>
        </div>
      )}

      {result && (
        <div className="flex-1 flex flex-col gap-4">
            <Card className="flex-1">
                <CardContent className="p-4 h-full">
                    <div className="relative w-full h-full rounded-md overflow-hidden">
                        <Image
                            src={result.imageUrl}
                            alt={prompt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <Button onClick={applyTheme} size="lg">
                <Wand2 className="mr-2 h-5 w-5"/>
                Apply Theme to Desktop
            </Button>
        </div>
      )}
    </div>
  );
}
