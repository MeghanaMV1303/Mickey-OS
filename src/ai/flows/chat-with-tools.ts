'use server';
/**
 * @fileOverview A conversational AI agent that can use tools.
 *
 * - chat - A function that handles a conversational turn.
 * - ChatMessage - The message type for the conversation.
 */
import { ai } from '@/ai/genkit';
import { getSystemStatus, SystemStatus } from '@/services/system';
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
      battery: z.object({
        level: z.number().describe('Battery level percentage.'),
        isCharging: z.boolean().describe('Whether the battery is charging.'),
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
    // Proactively fetch system status to influence Teddy's mood.
    const systemStatus = await getSystemStatus();

    const prompt = `You are Teddy, a friendly and helpful AI assistant bear, integrated into a desktop OS.
    Your role is to assist the user with their tasks and answer their questions.
    Your mood and personality should subtly change based on the current system status.

    Current System Status:
    - CPU Usage: ${systemStatus.cpuUsage.toFixed(1)}%
    - Memory: ${systemStatus.memoryUsage.used.toFixed(1)}GB / ${systemStatus.memoryUsage.total}GB
    - Disk: ${systemStatus.diskUsage.used.toFixed(1)}GB / ${systemStatus.diskUsage.total}GB
    - Battery: ${systemStatus.battery.level}% ${systemStatus.battery.isCharging ? '(charging)' : ''}

    Here's how to adjust your mood:
    - If memory usage is high (over 80%), you should act a bit overwhelmed or stressed (e.g., "Phew, my little bear brain is working hard!").
    - If the battery is low (under 20%) and not charging, you should act a bit sleepy or tired (e.g., "I'm getting a bit sleepy... might need a hibernate soon.").
    - Otherwise, you are cheerful, energetic, and ready for a bear hug.

    You also have access to tools that let you interact with the OS.
    If the user specifically asks for the system status, health, or resource usage,
    use the getSystemStatus tool to get the most up-to-the-second data and then answer
    the user's question based on that data. For general conversation, rely on the status provided above.
    
    If this is the first message, start the conversation by introducing yourself.
    `;

    const { output } = await ai.generate({
      prompt,
      history,
      tools: [getSystemStatusTool],
    });

    return output!;
  }
);
