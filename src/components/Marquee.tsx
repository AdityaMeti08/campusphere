'use client';

import { useEffect, useState } from 'react';

type Props = {
  text?: string;
  speed?: number; // seconds per loop
};

export default function Marquee({
  text = 'Connect. Create. Celebrate. Connect. Create. Celebrate. Connect. Create. Celebrate. ',
  speed = 12,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap box-border transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="inline-block animate-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <span className="text-lg text-black/80 px-6">{text.repeat(10)}</span>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
