// Summarize System Logs
'use server';
/**
 * @fileOverview Summarizes system logs to identify potential issues and optimize system performance.
 *
 * - summarizeSystemLogs - A function that handles the summarization of system logs.
 * - SummarizeSystemLogsInput - The input type for the summarizeSystemLogs function.
 * - SummarizeSystemLogsOutput - The return type for the summarizeSystemLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSystemLogsInputSchema = z.object({
  logs: z
    .string()
    .describe('System logs to summarize.'),
});
export type SummarizeSystemLogsInput = z.infer<typeof SummarizeSystemLogsInputSchema>;

const SummarizeSystemLogsOutputSchema = z.object({
  summary: z.string().describe('A summary of the system logs.'),
  potentialIssues: z.string().describe('Potential issues identified in the logs.'),
  recommendations: z.string().describe('Recommendations for optimizing system performance.'),
});
export type SummarizeSystemLogsOutput = z.infer<typeof SummarizeSystemLogsOutputSchema>;

export async function summarizeSystemLogs(input: SummarizeSystemLogsInput): Promise<SummarizeSystemLogsOutput> {
  return summarizeSystemLogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSystemLogsPrompt',
  input: {schema: SummarizeSystemLogsInputSchema},
  output: {schema: SummarizeSystemLogsOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing system logs to identify potential issues and optimize system performance.

  Summarize the following system logs, identify potential issues, and provide recommendations for optimizing system performance.

  System Logs:
  {{{logs}}}
  `,
});

const summarizeSystemLogsFlow = ai.defineFlow(
  {
    name: 'summarizeSystemLogsFlow',
    inputSchema: SummarizeSystemLogsInputSchema,
    outputSchema: SummarizeSystemLogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
