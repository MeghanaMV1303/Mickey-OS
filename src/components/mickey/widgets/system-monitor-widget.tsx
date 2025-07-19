'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts';
import { Cpu, HardDrive, MemoryStick, Gauge } from 'lucide-react';
import { WidgetCard } from './widget-card';
import { getSystemStatus, type SystemStatus } from '@/services/system';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function SystemMonitorWidget() {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    const updateStatus = async () => {
      const systemStatus = await getSystemStatus();
      setStatus(systemStatus);
    };
    updateStatus();
    const interval = setInterval(updateStatus, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const renderPieChart = (
    title: string,
    data: { name: string; value: number }[],
    icon: React.ReactNode,
    unit: string
  ) => {
    const total = data.reduce((acc, entry) => acc + entry.value, 0);
    const used = data.find(d => d.name === 'Used')?.value || 0;
    const percentage = total > 0 ? ((used / total) * 100).toFixed(1) : 0;

    return (
      <div className="flex flex-col items-center">
        <div className="font-medium flex items-center gap-2 text-sm">
          {icon} {title} ({percentage}%)
        </div>
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square w-full max-w-[100px] h-[100px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="80%"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="text-xs text-muted-foreground -mt-4">
          {used.toFixed(1)}
          {unit} / {total.toFixed(1)}
          {unit}
        </div>
      </div>
    );
  };

  const memoryData = status
    ? [
        { name: 'Used', value: status.memoryUsage.used },
        { name: 'Free', value: status.memoryUsage.total - status.memoryUsage.used },
      ]
    : [];

  const diskData = status
    ? [
        { name: 'Used', value: status.diskUsage.used },
        { name: 'Free', value: status.diskUsage.total - status.diskUsage.used },
      ]
    : [];
  
  const cpuPercentage = status ? status.cpuUsage : 0;

  return (
    <WidgetCard title="System Status" icon={Gauge} className="lg:col-span-2">
      <div className="grid grid-cols-3 gap-4 items-center justify-center pt-4">
        {status ? (
          <>
            {renderPieChart(
              'RAM',
              memoryData,
              <MemoryStick className="w-4 h-4" />,
              'GB'
            )}
            {renderPieChart(
              'Disk',
              diskData,
              <HardDrive className="w-4 h-4" />,
              'GB'
            )}
            <div className="flex flex-col items-center">
                 <div className="font-medium flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4" /> CPU
                </div>
                <div className="text-4xl font-bold text-primary-foreground tracking-wider h-[100px] flex items-center justify-center">
                    {cpuPercentage.toFixed(0)}%
                </div>
            </div>
          </>
        ) : (
          <p className="col-span-3 text-center text-muted-foreground">
            Loading system status...
          </p>
        )}
      </div>
    </WidgetCard>
  );
}
