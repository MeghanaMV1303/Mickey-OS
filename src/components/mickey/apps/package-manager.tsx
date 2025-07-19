
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, HardDrive, Palette, RefreshCcw, Trash2, BrainCircuit } from 'lucide-react';
import { useState } from 'react';

const allPackages = [
  { id: 'file-manager', name: 'File Manager', description: 'Browse and manage your local files.', category: 'utilities', icon: HardDrive },
  { id: 'theme-studio', name: 'Theme Studio', description: 'Create themes with AI.', category: 'customization', icon: Palette },
  { id: 'ai-assistant', name: 'AI Assistant', description: 'Automate tasks with natural language.', category: 'ai', icon: BrainCircuit },
  { id: 'vscode', name: 'Code Editor', description: 'A powerful and lightweight code editor.', category: 'development' },
  { id: 'gimp', name: 'Image Editor', description: 'Advanced image manipulation tool.', category: 'creativity' },
  { id: 'vlc', name: 'Media Player', description: 'Plays almost any video and audio format.', category: 'media' },
  { id: 'chat-app', name: 'Connect', description: 'Stay in touch with your team.', category: 'social' },
  { id: 'music-maker', name: 'Sonata', description: 'Compose and produce your own music.', category: 'creativity' },
];

export function PackageManager() {
  const [installed, setInstalled] = useState<Set<string>>(new Set(['file-manager', 'theme-studio', 'ai-assistant']));

  const togglePackage = (id: string) => {
    setInstalled(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const installedPackages = allPackages.filter(p => installed.has(p.id));
  const availablePackages = allPackages.filter(p => !installed.has(p.id));
  
  // Let's pretend one app has an update
  const packagesWithUpdates = installed.size > 0 ? [allPackages.find(p => p.id === 'file-manager')] : [];

  const PackageCard = ({ pkg }: { pkg: any }) => {
    const isInstalled = installed.has(pkg.id);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription>{pkg.description}</CardDescription>
                    </div>
                    {pkg.icon && <pkg.icon className="w-8 h-8 text-muted-foreground"/>}
                </div>
            </CardHeader>
            <CardFooter>
            <Button
                onClick={() => togglePackage(pkg.id)}
                variant={isInstalled ? 'destructive' : 'default'}
                className="w-full"
            >
                {isInstalled ? (
                <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Uninstall
                </>
                ) : (
                <>
                    <Download className="mr-2 h-4 w-4" />
                    Install
                </>
                )}
            </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <div className="p-4 md:p-6 h-full">
      <div className="mb-4 px-1">
        <h1 className="text-2xl font-bold">Package Manager</h1>
        <p className="text-muted-foreground">Install, update, and manage your applications.</p>
      </div>
      <Tabs defaultValue="installed" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="installed" className="flex-1 overflow-y-auto mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {installedPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
            {installedPackages.length === 0 && <p className="text-muted-foreground text-center mt-8">No packages installed.</p>}
        </TabsContent>
        <TabsContent value="updates" className="flex-1 overflow-y-auto mt-4">
            {packagesWithUpdates[0] && (
                <Card>
                    <CardHeader>
                        <CardTitle>{packagesWithUpdates[0]?.name}</CardTitle>
                        <CardDescription>Version 2.0 is available. Includes security patches and performance improvements.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="w-full">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Update Now
                        </Button>
                    </CardFooter>
                </Card>
            )}
             {packagesWithUpdates.length === 0 && <p className="text-muted-foreground text-center mt-8">All packages are up to date.</p>}
        </TabsContent>
        <TabsContent value="discover" className="flex-1 overflow-y-auto mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availablePackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
            {availablePackages.length === 0 && <p className="text-muted-foreground text-center mt-8">No new packages to discover.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
