'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

const availablePackages = [
  { id: 'vscode', name: 'Code Editor', description: 'A powerful and lightweight code editor.' },
  { id: 'gimp', name: 'Image Editor', description: 'Advanced image manipulation tool.' },
  { id: 'vlc', name: 'Media Player', description: 'Plays almost any video and audio format.' },
  { id: 'terminal', name: 'PowerTerm', description: 'Your new favorite command-line interface.' },
  { id: 'chat-app', name: 'Connect', description: 'Stay in touch with your team.' },
  { id: 'music-maker', name: 'Sonata', description: 'Compose and produce your own music.' },
];

export function PackageManager() {
  const [installed, setInstalled] = useState<Set<string>>(new Set(['terminal']));

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Package Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePackages.map((pkg) => {
          const isInstalled = installed.has(pkg.id);
          return (
            <Card key={pkg.id}>
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
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
          );
        })}
      </div>
    </div>
  );
}
