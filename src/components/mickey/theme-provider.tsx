'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import type { ColorPalette } from '@/ai/flows/generate-theme';

type CustomTheme = {
  palette: ColorPalette | null;
  backgroundImage: string | null;
};

type ThemeManagerContextType = {
  customTheme: CustomTheme;
  setCustomTheme: (palette: ColorPalette, backgroundImage: string) => void;
  clearCustomTheme: () => void;
};

const ThemeManagerContext = React.createContext<ThemeManagerContextType | undefined>(undefined);

function hexToHsl(hex: string): string {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `${(h * 360).toFixed(0)} ${(s * 100).toFixed(0)}% ${(l * 100).toFixed(0)}%`;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [customTheme, setCustomThemeState] = React.useState<CustomTheme>({ palette: null, backgroundImage: null });
  const { theme } = useTheme();

  const setCustomTheme = (palette: ColorPalette, backgroundImage: string) => {
    setCustomThemeState({ palette, backgroundImage });
  };
  
  const clearCustomTheme = () => {
    setCustomThemeState({ palette: null, backgroundImage: null });
  };
  
  React.useEffect(() => {
    const doc = document.documentElement;
    if (customTheme.palette) {
        const p = customTheme.palette;
        const primaryColor = p.Vibrant || p.LightVibrant || '#FFB9C9';
        const accentColor = p.DarkVibrant || p.Muted || '#FF8FAB';
        const backgroundColor = theme === 'dark' 
            ? (p.DarkMuted || '#1e1b22') 
            : (p.LightMuted || '#f7f5fa');

        doc.style.setProperty('--primary-override', hexToHsl(primaryColor));
        doc.style.setProperty('--accent-override', hexToHsl(accentColor));
        doc.style.setProperty('--background-override', hexToHsl(backgroundColor));
    } else {
        doc.style.removeProperty('--primary-override');
        doc.style.removeProperty('--accent-override');
        doc.style.removeProperty('--background-override');
    }
  }, [customTheme, theme]);

  return (
    <NextThemesProvider {...props}>
      <ThemeManagerContext.Provider value={{ customTheme, setCustomTheme, clearCustomTheme }}>
        {children}
      </ThemeManagerContext.Provider>
    </NextThemesProvider>
  );
}

export function useThemeManager() {
    const context = React.useContext(ThemeManagerContext);
    if (context === undefined) {
        throw new Error('useThemeManager must be used within a ThemeProvider');
    }
    return context;
}
