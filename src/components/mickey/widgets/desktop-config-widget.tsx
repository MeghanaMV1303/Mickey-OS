'use client';

import { useState } from 'react';
import { generateDesktopConfiguration, type GenerateDesktopConfigurationOutput } from '@/ai/flows/generate-desktop-configuration';
import { WidgetCard } from './widget-card';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function DesktopConfigWidget() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<GenerateDesktopConfigurationOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateDesktopConfiguration({ description });
      setResult(response);
    } catch (err) {
      setError('Failed to generate configuration. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WidgetCard title="Desktop Configuration" icon={SlidersHorizontal} className="lg:col-span-2">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Describe your ideal desktop setup, and AI will generate a configuration for you.</p>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 'A minimalist dark theme with a large font size and a weather widget.'"
          rows={3}
          className="bg-card/80"
        />
        <Button onClick={handleSubmit} disabled={loading || !description} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate with AI
        </Button>
        {error && (
            <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {result && (
          <div>
            <h4 className="font-semibold mb-1">Generated Configuration:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
              <code>{result.configurationFile}</code>
            </pre>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
