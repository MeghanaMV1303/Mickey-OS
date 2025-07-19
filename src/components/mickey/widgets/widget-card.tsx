import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface WidgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function WidgetCard({ title, icon: Icon, children, className }: WidgetCardProps) {
  return (
    <Card className={cn('shadow-lg rounded-2xl border-primary/20 backdrop-blur-2xl bg-primary/20', className)}>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <Icon className="w-5 h-5 text-primary-foreground" />
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
