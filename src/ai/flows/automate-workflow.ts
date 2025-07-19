'use server';

/**
 * @fileOverview Automates user workflows using AI assistant.
 *
 * - automateWorkflow - A function that automates user workflows based on natural language instructions.
 * - AutomateWorkflowInput - The input type for the automateWorkflow function.
 * - AutomateWorkflowOutput - The return type for the automateWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateWorkflowInputSchema = z.object({
  instruction: z
    .string()
    .describe('The natural language instruction for the workflow to automate.'),
});
export type AutomateWorkflowInput = z.infer<typeof AutomateWorkflowInputSchema>;

const AutomateWorkflowOutputSchema = z.object({
  command: z
    .string()
    .describe('The command to execute to automate the workflow.'),
  explanation: z
    .string()
    .describe('The explanation of the command and its usage.'),
});
export type AutomateWorkflowOutput = z.infer<typeof AutomateWorkflowOutputSchema>;

export async function automateWorkflow(
  input: AutomateWorkflowInput
): Promise<AutomateWorkflowOutput> {
  return automateWorkflowFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automateWorkflowPrompt',
  input: {schema: AutomateWorkflowInputSchema},
  output: {schema: AutomateWorkflowOutputSchema},
  prompt: `You are an AI assistant specializing in automating user workflows.

You will receive a natural language instruction from the user, and you will
convert it into a command that can be executed to automate the workflow.

Instruction: {{{instruction}}}

Output the command and an explanation of its usage.
`,
});

const automateWorkflowFlow = ai.defineFlow(
  {
    name: 'automateWorkflowFlow',
    inputSchema: AutomateWorkflowInputSchema,
    outputSchema: AutomateWorkflowOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
