import { MickeyDesktop } from '@/components/mickey/mickey-desktop';
import { StreakWidget } from '@/components/mickey/widgets/streak-widget';

export default function Home() {
  return (
    <>
      <MickeyDesktop />
      <div className="absolute top-8 right-8 z-20">
        <StreakWidget />
      </div>
    </>
  );
}
