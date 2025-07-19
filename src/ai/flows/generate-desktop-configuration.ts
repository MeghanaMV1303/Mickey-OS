'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating desktop configurations based on user input.
 *
 * - generateDesktopConfiguration - A function that takes user input describing their desired desktop configuration and returns a configuration file.
 * - GenerateDesktopConfigurationInput - The input type for the generateDesktopConfiguration function.
 * - GenerateDesktopConfigurationOutput - The return type for the generateDesktopConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDesktopConfigurationInputSchema = z.object({
  description: z
    .string()
    .describe("A description of the user's ideal desktop configuration."),
});
export type GenerateDesktopConfigurationInput = z.infer<
  typeof GenerateDesktopConfigurationInputSchema
>;

const GenerateDesktopConfigurationOutputSchema = z.object({
  configurationFile: z
    .string()
    .describe('The generated configuration file for the desktop environment.'),
});
export type GenerateDesktopConfigurationOutput = z.infer<
  typeof GenerateDesktopConfigurationOutputSchema
>;

export async function generateDesktopConfiguration(
  input: GenerateDesktopConfigurationInput
): Promise<GenerateDesktopConfigurationOutput> {
  return generateDesktopConfigurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDesktopConfigurationPrompt',
  input: {schema: GenerateDesktopConfigurationInputSchema},
  output: {schema: GenerateDesktopConfigurationOutputSchema},
  prompt: `You are a system administrator tasked with generating desktop configuration files based on user descriptions.

  Based on the following description, generate a configuration file that sets up the desktop environment accordingly.

  Description: {{{description}}}

  Ensure the configuration is well-formatted and includes all necessary settings.
  The configuration file should be complete and ready to be applied to the system.
  Respond using valid configuration file.
  Example:
  \`\`\`json
  {{{{raw}}}}
  {{
    "theme": "light",
    "font_size": 12,
    "background_color": "#F5F5F5",
    "accent_color": "#FFB9C9",
    "widgets": ["clock", "weather", "system_monitor"]
  }}
  {{{{/raw}}}}
  \`\`\`
  `,
});

const generateDesktopConfigurationFlow = ai.defineFlow(
  {
    name: 'generateDesktopConfigurationFlow',
    inputSchema: GenerateDesktopConfigurationInputSchema,
    outputSchema: GenerateDesktopConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
