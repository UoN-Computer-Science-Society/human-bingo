import Image from 'next/image';
import BingoBoard from '@/components/BingoBoard';

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center py-3 sm:py-6 gap-3 sm:gap-4">
      {/* Hero with big central logo */}
      <div className="w-full max-w-4xl mx-auto text-center">
        <Image
          src="/CSS_logo_purple_bg.PNG"
          alt="CS Society Logo"
          width={256}
          height={256}
          sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, 16rem"
          priority
          className="mx-auto rounded-2xl shadow-2xl ring-2 sm:ring-4 ring-magenta/40 w-16 sm:w-40 md:w-56 h-auto"
        />
        <p className="hidden sm:block mt-3 text-charcoal/70 text-sm md:text-base">
          Tap a square to add a name. Complete a row, column, or diagonal to win!
        </p>
      </div>

      <BingoBoard />
    </div>
  );
}
