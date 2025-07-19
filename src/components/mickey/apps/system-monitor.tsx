'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import { Cpu, HardDrive, MemoryStick } from 'lucide-react';

const generateInitialData = () => {
  const data = [];
  for (let i = 10; i >= 0; i--) {
    data.push({
      time: new Date(Date.now() - i * 1000).toLocaleTimeString([], { second: '2-digit' }),
      usage: Math.floor(Math.random() * 20) + 5,
    });
  }
  return data;
};

const generateDiskData = () => [
    { name: 'Used', value: Math.floor(Math.random() * (400 - 150 + 1)) + 150 },
    { name: 'Free', value: Math.floor(Math.random() * (600 - 450 + 1)) + 450 },
];

const generateMemoryData = () => [
    { name: 'Used', value: Math.floor(Math.random() * (12 - 4 + 1)) + 4 },
    { name: 'Free', value: Math.floor(Math.random() * (28 - 14 + 1)) + 14 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function SystemMonitor() {
  const [cpuData, setCpuData] = useState(generateInitialData());
  const [memoryData, setMemoryData] = useState(generateMemoryData());
  const [diskData, setDiskData] = useState(generateDiskData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData((prevData) => {
        const newData = prevData.slice(1);
        newData.push({
          time: new Date().toLocaleTimeString([], { second: '2-digit' }),
          usage: Math.max(5, Math.min(95, (prevData.at(-1)?.usage || 20) + (Math.random() * 10 - 5))),
        });
        return newData;
      });
      setMemoryData(generateMemoryData());
      setDiskData(generateDiskData());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderPieChart = (title: string, data: {name: string, value: number}[], icon: React.ReactNode, unit: string) => {
    const total = data.reduce((acc, entry) => acc + entry.value, 0);
    const used = data.find(d => d.name === 'Used')?.value || 0;
    const percentage = ((used / total) * 100).toFixed(1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">{icon} {title}</CardTitle>
                <span className="text-sm font-bold">{percentage}%</span>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <ChartContainer config={{}} className="mx-auto aspect-square w-full max-w-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={data} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="80%" strokeWidth={2}>
                             {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <div className="text-center text-sm text-muted-foreground -mt-4 pb-4">
                {used.toFixed(1)} {unit} of {total.toFixed(1)} {unit} used
            </div>
        </Card>
    );
  };


  return (
    <div className="p-4 space-y-4 h-full">
        <h1 className="text-2xl font-bold px-2">System Monitor</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderPieChart("Memory Usage", memoryData, <MemoryStick className="w-5 h-5" />, "GB")}
            {renderPieChart("Disk Usage", diskData, <HardDrive className="w-5 h-5" />, "GB")}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium flex items-center gap-2"><Cpu className="w-5 h-5" /> CPU History</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{ usage: { label: 'CPU Usage', color: 'hsl(var(--primary))' } }} className="h-[200px] w-full">
                        <AreaChart data={cpuData}>
                            <defs>
                                <linearGradient id="fillUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false}/>
                            <YAxis unit="%" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Area dataKey="usage" type="monotone" fill="url(#fillUsage)" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
