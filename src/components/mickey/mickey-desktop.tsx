'use client';

import { useState } from 'react';
import type { App } from './apps';
import { AppWindow } from './app-window';
import { Taskbar } from './taskbar';
import { ClockWidget } from './widgets/clock-widget';
import { WelcomeWidget } from './widgets/welcome-widget';
import { AiSummaryWidget } from './widgets/ai-summary-widget';
import { DesktopConfigWidget } from './widgets/desktop-config-widget';

export function MickeyDesktop() {
  const [activeApp, setActiveApp] = useState<App | null>(null);

  const onAppSelect = (app: App) => {
    setActiveApp(app);
  };

  const onWindowClose = () => {
    setActiveApp(null);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-background to-card"
      data-ai-hint="desktop background"
    >
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <WelcomeWidget />
          <ClockWidget />
          <AiSummaryWidget />
          <DesktopConfigWidget />
        </div>
      </main>

      {activeApp && (
        <AppWindow app={activeApp} onClose={onWindowClose}>
          <activeApp.component />
        </AppWindow>
      )}

      <Taskbar onAppSelect={onAppSelect} />
    </div>
  );
}
