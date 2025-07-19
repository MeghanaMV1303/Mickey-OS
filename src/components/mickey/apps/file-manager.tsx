'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { File, Folder, FileArchive, Music, Image as ImageIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const files = [
  { name: 'Documents', type: 'Folder', modified: '2024-05-10', icon: Folder },
  { name: 'Music', type: 'Folder', modified: '2024-05-09', icon: Folder },
  { name: 'Pictures', type: 'Folder', modified: '2024-05-11', icon: Folder },
  { name: 'project-brief.pdf', type: 'PDF', modified: '2024-05-10', icon: File },
  { name: 'vacation-photo.jpg', type: 'JPEG Image', modified: '2024-05-11', icon: ImageIcon },
  { name: 'favorite-song.mp3', type: 'MP3 Audio', modified: '2024-05-09', icon: Music },
  { name: 'archive.zip', type: 'ZIP Archive', modified: '2024-05-08', icon: FileArchive },
];

export function FileManager() {
  return (
    <div className="p-4 h-full">
      <h1 className="text-2xl font-bold mb-4 px-2">File Manager</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Last Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name} className="hover:bg-accent/50 cursor-pointer">
                <TableCell className="font-medium flex items-center gap-2">
                  <file.icon className="w-4 h-4 text-primary-foreground/80" />
                  {file.name}
                </TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell className="text-right">{file.modified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
