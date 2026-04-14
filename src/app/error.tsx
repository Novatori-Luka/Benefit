'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-white/10 text-[8rem] font-bold leading-none select-none mb-6">500</p>
      <h2 className="font-playfair text-3xl font-bold text-white uppercase mb-4">Something went wrong</h2>
      <p className="text-white/40 text-sm tracking-wide mb-10">An unexpected error occurred. Please try again.</p>
      <button
        onClick={reset}
        className="border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
