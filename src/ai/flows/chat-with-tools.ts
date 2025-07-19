'use server';
/**
 * @fileOverview A conversational AI agent that can use tools.
 *
 * - chat - A function that handles a conversational turn.
 * - ChatMessage - The message type for the conversation.
 */
import { ai } from '@/ai/genkit';
import { getSystemStatus } from '@/services/system';
import { z } from 'genkit';

// Define the tool for the AI to use.
const getSystemStatusTool = ai.defineTool(
  {
    name: 'getSystemStatus',
    description: 'Get the current system status including CPU, memory, and disk usage.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      cpuUsage: z.number().describe('CPU usage percentage.'),
      memoryUsage: z.object({
        used: z.number().describe('Used memory in GB.'),
        total: z.number().describe('Total memory in GB.'),
      }),
      diskUsage: z.object({
        used: z.number().describe('Used disk space in GB.'),
        total: z.number().describe('Total disk space in GB.'),
      }),
    }),
  },
  async () => {
    return await getSystemStatus();
  }
);

// Define the schema for chat messages
const ChatMessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string(),
    })),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatHistorySchema = z.array(ChatMessageSchema);
export type ChatHistory = z.infer<typeof ChatHistorySchema>;


// Create the chat flow
export const chat = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatHistorySchema,
    outputSchema: ChatMessageSchema,
  },
  async (history) => {
    const prompt = `You are Mickey, a friendly and helpful AI assistant with a bit of a playful personality, integrated into a desktop OS.
    Your role is to assist the user with their tasks and answer their questions in a clear and cheerful manner.
    You have access to tools that let you interact with the OS.
    
    If the user asks about the system status, health, or resource usage,
    use the getSystemStatus tool to get the current data and then answer
    the user's question based on that data.
    
    Start the conversation by introducing yourself.
    `;

    const { output } = await ai.generate({
      prompt,
      history,
      tools: [getSystemStatusTool],
    });

    return output!;
  }
);
