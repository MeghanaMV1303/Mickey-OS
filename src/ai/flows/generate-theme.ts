'use server';

/**
 * @fileOverview Generates a theme with an image and color palette.
 * - generateTheme - Generates a theme based on a text prompt.
 * - GenerateThemeInput - Input type for generateTheme.
 * - GenerateThemeOutput - Output type for generateTheme.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import Vibrant from 'node-vibrant';

const GenerateThemeInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate a theme from.'),
});
export type GenerateThemeInput = z.infer<typeof GenerateThemeInputSchema>;

const ColorPaletteSchema = z.object({
  Vibrant: z.string().optional(),
  Muted: z.string().optional(),
  DarkVibrant: z.string().optional(),
  DarkMuted: z.string().optional(),
  LightVibrant: z.string().optional(),
  LightMuted: z.string().optional(),
});
export type ColorPalette = z.infer<typeof ColorPaletteSchema>;

const GenerateThemeOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
  palette: ColorPaletteSchema.describe('The extracted color palette.'),
});
export type GenerateThemeOutput = z.infer<typeof GenerateThemeOutputSchema>;


function HSLToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

async function extractColorsFromDataUri(dataUri: string): Promise<ColorPalette> {
    const base64Data = dataUri.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    const palette = await Vibrant.from(imageBuffer).getPalette();
    
    return {
      Vibrant: palette.Vibrant?.hsl ? HSLToHex(palette.Vibrant.hsl[0] * 360, palette.Vibrant.hsl[1] * 100, palette.Vibrant.hsl[2] * 100) : undefined,
      Muted: palette.Muted?.hsl ? HSLToHex(palette.Muted.hsl[0] * 360, palette.Muted.hsl[1] * 100, palette.Muted.hsl[2] * 100) : undefined,
      DarkVibrant: palette.DarkVibrant?.hsl ? HSLToHex(palette.DarkVibrant.hsl[0] * 360, palette.DarkVibrant.hsl[1] * 100, palette.DarkVibrant.hsl[2] * 100) : undefined,
      DarkMuted: palette.DarkMuted?.hsl ? HSLToHex(palette.DarkMuted.hsl[0] * 360, palette.DarkMuted.hsl[1] * 100, palette.DarkMuted.hsl[2] * 100) : undefined,
      LightVibrant: palette.LightVibrant?.hsl ? HSLToHex(palette.LightVibrant.hsl[0] * 360, palette.LightVibrant.hsl[1] * 100, palette.LightVibrant.hsl[2] * 100) : undefined,
      LightMuted: palette.LightMuted?.hsl ? HSLToHex(palette.LightMuted.hsl[0] * 360, palette.LightMuted.hsl[1] * 100, palette.LightMuted.hsl[2] * 100) : undefined,
    };
}


export async function generateTheme(
  input: GenerateThemeInput
): Promise<GenerateThemeOutput> {
  return generateThemeFlow(input);
}

const generateThemeFlow = ai.defineFlow(
  {
    name: 'generateThemeFlow',
    inputSchema: GenerateThemeInputSchema,
    outputSchema: GenerateThemeOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media.url;
    const palette = await extractColorsFromDataUri(imageUrl);

    return {
      imageUrl,
      palette,
    };
  }
);
