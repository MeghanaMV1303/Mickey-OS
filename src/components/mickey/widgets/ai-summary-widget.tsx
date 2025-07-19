'use client';
import { useState } from 'react';
import { summarizeSystemLogs, type SummarizeSystemLogsOutput } from '@/ai/flows/summarize-system-logs';
import { WidgetCard } from './widget-card';
import { FileText, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AiSummaryWidget() {
  const [logs, setLogs] = useState('');
  const [result, setResult] = useState<SummarizeSystemLogsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await summarizeSystemLogs({ logs });
      setResult(response);
    } catch (err) {
      setError('Failed to summarize logs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WidgetCard title="System Log Summarizer" icon={FileText} className="lg:col-span-2">
      <div className="space-y-3">
        <Textarea
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
          placeholder="Paste system logs here..."
          rows={5}
          className="bg-card/80"
        />
        <Button onClick={handleSubmit} disabled={loading || !logs} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Summarize with AI
        </Button>
        {error && (
            <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {result && (
          <ScrollArea className="h-48 mt-2 p-3 rounded-md bg-background/50">
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold">Summary:</h4>
                <p className="text-muted-foreground">{result.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold">Potential Issues:</h4>
                <p className="text-muted-foreground">{result.potentialIssues}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendations:</h4>
                <p className="text-muted-foreground">{result.recommendations}</p>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </WidgetCard>
  );
}
