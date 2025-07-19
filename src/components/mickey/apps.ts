import {
  Folder,
  Globe,
  Package,
  Settings,
  Gamepad2,
  Image as ImageIcon,
  Terminal as TerminalIcon,
  Gauge,
  Palette,
  MessageSquareText,
  Clapperboard,
  type LucideIcon,
  Mouse,
} from 'lucide-react';
import { AiAssistant } from './apps/ai-assistant';
import { FileManager } from './apps/file-manager';
import { PackageManager } from './apps/package-manager';
import { SystemSettings } from './apps/system-settings';
import { WebBrowser } from './apps/web-browser';
import { TicTacToe } from './apps/tic-tac-toe';
import { ImageStudio } from './apps/image-studio';
import { Terminal } from './apps/terminal';
import { SystemMonitor } from './apps/system-monitor';
import { ThemeStudio } from './apps/theme-studio';
import { SpeechSynthesizer } from './apps/speech-synthesizer';
import { VideoStudio } from './apps/video-studio';
import type { SVGProps } from 'react';

export type App = {
  id: string;
  name: string;
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
  component: () => JSX.Element;
};

export const apps: App[] = [
  // Core Apps
  {
    id: 'file-manager',
    name: 'File Manager',
    icon: Folder,
    component: FileManager,
  },
  {
    id: 'web-browser',
    name: 'Web Browser',
    icon: Globe,
    component: WebBrowser,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: TerminalIcon,
    component: Terminal,
  },
  {
    id: 'system-settings',
    name: 'System Settings',
    icon: Settings,
    component: SystemSettings,
  },
  // AI & Creative
  {
    id: 'ai-assistant',
    name: 'Mickey Assistant',
    icon: Mouse,
    component: AiAssistant,
  },
  {
    id: 'image-studio',
    name: 'Image Studio',
    icon: ImageIcon,
    component: ImageStudio,
  },
  {
    id: 'video-studio',
    name: 'Video Studio',
    icon: Clapperboard,
    component: VideoStudio,
  },
  {
    id: 'theme-studio',
    name: 'Theme Studio',
    icon: Palette,
    component: ThemeStudio,
  },
  {
    id: 'speech-synthesizer',
    name: 'Speech Synthesizer',
    icon: MessageSquareText,
    component: SpeechSynthesizer,
  },
  // Utilities
  {
    id: 'system-monitor',
    name: 'System Monitor',
    icon: Gauge,
    component: SystemMonitor,
  },
  {
    id: 'package-manager',
    name: 'Package Manager',
    icon: Package,
    component: PackageManager,
  },
  // Fun
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    icon: Gamepad2,
    component: TicTacToe,
  },
];
