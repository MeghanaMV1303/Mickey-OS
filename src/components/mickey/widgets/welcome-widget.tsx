import { Mouse } from 'lucide-react';
import { WidgetCard } from './widget-card';

export function WelcomeWidget() {
  return (
    <WidgetCard title="Welcome" icon={Mouse} className="lg:col-span-2">
        <div className="text-lg py-4">
            <p className="text-primary-foreground">Hi! I'm Mickey.</p>
            <p className="text-sm text-muted-foreground mt-1">
                Your friendly desktop assistant. Click the menu to explore apps or ask me a question.
            </p>
        </div>
    </WidgetCard>
  )
}
