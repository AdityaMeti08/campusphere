'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// @ts-ignore - SplitText is a Club plugin; fallback simple splitter
const SafeSplit = SplitText ?? class {
  elements: HTMLElement[];
  lines: HTMLElement[];
  constructor(el: HTMLElement, _opts?: any) {
    this.elements = [el];
    this.lines = [el];
  }
};

export default function TextKinetic() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const split = new SafeSplit(el, { type: 'lines,words,chars' });
    const target = (split as any).chars ?? el.querySelectorAll('span');
    gsap.set(target, { yPercent: 120, rotateX: -40, opacity: 0 });
    gsap.to(target, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      ease: 'expo.out',
      stagger: 0.02,
      duration: 1.2,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  return (
    <h1
      ref={ref}
      className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight"
      aria-label="Connect. Create. Celebrate."
    >
      <span className="mr-2 text-[#D1A300]">Connect.</span>
      <span className="mr-2">Create.</span>
      <span className="mr-2 text-[#FFD83D]">Celebrate.</span>
    </h1>
  );
}
