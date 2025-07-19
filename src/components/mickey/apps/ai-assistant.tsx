'use client';

import { automateWorkflow, type AutomateWorkflowOutput } from '@/ai/flows/automate-workflow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AiAssistant() {
  const [instruction, setInstruction] = useState('');
  const [result, setResult] = useState<AutomateWorkflowOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await automateWorkflow({ instruction });
      setResult(response);
    } catch (err) {
      setError('Failed to get automation command. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <BrainCircuit className="w-8 h-8 text-primary" />
        <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Automate tasks with natural language.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g., 'Find all files larger than 100MB in my home directory and compress them into a single archive'"
          rows={4}
          className="bg-card"
        />
        <Button type="submit" disabled={loading || !instruction}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Command
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="flex-1">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Generated Command:</h3>
              <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                <code>{result.command}</code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Explanation:</h3>
              <p className="text-muted-foreground">{result.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
