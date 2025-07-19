
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

const TeddyBearIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14c-1.93 0-3.5-1.57-3.5-3.5S13.57 9 15.5 9s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm-7 0c-1.93 0-3.5-1.57-3.5-3.5S6.57 9 8.5 9s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      <path d="M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <circle cx="8.5" cy="12.5" r="1" />
      <circle cx="15.5" cy="12.5" r="1" />
    </svg>
  );


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
    name: 'Teddy Assistant',
    icon: TeddyBearIcon,
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
