import {
  Folder,
  Globe,
  BrainCircuit,
  Package,
  Settings,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react';
import { AiAssistant } from './apps/ai-assistant';
import { FileManager } from './apps/file-manager';
import { PackageManager } from './apps/package-manager';
import { SystemSettings } from './apps/system-settings';
import { WebBrowser } from './apps/web-browser';
import { TicTacToe } from './apps/tic-tac-toe';

export type App = {
  id: string;
  name: string;
  icon: LucideIcon;
  component: () => JSX.Element;
};

export const apps: App[] = [
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
    id: 'ai-assistant',
    name: 'AI Assistant',
    icon: BrainCircuit,
    component: AiAssistant,
  },
  {
    id: 'package-manager',
    name: 'Package Manager',
    icon: Package,
    component: PackageManager,
  },
  {
    id: 'system-settings',
    name: 'System Settings',
    icon: Settings,
    component: SystemSettings,
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    icon: Gamepad2,
    component: TicTacToe,
  }
];
