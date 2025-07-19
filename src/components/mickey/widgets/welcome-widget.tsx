import { Hand } from 'lucide-react';
import { WidgetCard } from './widget-card';

export function WelcomeWidget() {
  return (
    <WidgetCard title="Welcome" icon={Hand} className="lg:col-span-2">
        <div className="text-lg py-4">
            <p className="text-primary-foreground">Welcome to Mickey OS.</p>
            <p className="text-sm text-muted-foreground mt-1">
                Your modern desktop environment. Click the menu to get started.
            </p>
        </div>
    </WidgetCard>
  )
}
