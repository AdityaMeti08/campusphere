'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextKinetic from '@/components/TextKinetic';
import Marquee from '@/components/Marquee';
import BottomNav from '@/components/BottomNav';

// ------------------------------------------------------------------
// Confetti + toast (loads from CDN first time it's used)
function confettiBurst(x = 0.5, y = 0.35) {
  const end = Date.now() + 600;
  const colors = ['#FFD83D', '#D1A300', '#000000', '#ffffff'];
  function frame() {
    const particleCount = 24;
    // @ts-expect-error
    if (window.confetti) {
      // @ts-expect-error
      window.confetti({ particleCount, angle: 60, spread: 60, origin: { x, y }, colors });
      // @ts-expect-error
      window.confetti({ particleCount, angle: 120, spread: 60, origin: { x: 1 - x, y }, colors });
    }
    if (Date.now() < end) requestAnimationFrame(frame);
  }
  if (!(window as any).confetti) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    s.async = true;
    s.onload = () => frame();
    document.head.appendChild(s);
  } else {
    frame();
  }
}

function showCongratsToast(message = "Congrats! You are RSVP’d 🎉") {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className =
    'fixed left-1/2 -translate-x-1/2 top-4 z-[100] rounded-full bg-black text-white px-4 py-2 text-sm shadow';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1600);
}

export default function Landing() {
  const [compactBrand, setCompactBrand] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [rsvpd, setRsvpd] = useState<{ [key: string]: boolean }>({});
  const [buzz, setBuzz] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompactBrand(window.scrollY > 80);
      if (!showAbout && window.scrollY > 100) {
        setShowAbout(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAbout]);

  // simulate new notifications and buzz
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuzz(true);
      const audio = new Audio('/buzz.mp3'); // put buzz.mp3 in public folder
      audio.play().catch(() => {});
      setTimeout(() => setBuzz(false), 1000); // stop shake after 1s
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRSVP = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (rsvpd[id]) return;
    confettiBurst(0.8, 0.2);
    showCongratsToast();
    setRsvpd((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A] pb-20">

      {/* HEADER */}
      <header className="px-5 pt-6 sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="relative h-8 w-32">
            <span
              className={`absolute inset-0 text-3xl font-semibold text-white transition-all duration-300 ${
                compactBrand ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              Campusphere
            </span>
            <span
              className={`absolute inset-0 text-3xl font-semibold text-white transition-all duration-300 ${
                compactBrand ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
              }`}
            >
              C
            </span>
            <span className="sr-only">Campusphere</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="px-5 mt-8 text-center">
        <TextKinetic />
        <p
          className={`mt-4 mx-auto max-w-2xl text-white text-xl sm:text-2xl leading-relaxed 
            drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] transition-opacity duration-700 ${
              showAbout ? 'opacity-100' : 'opacity-0'
            }`}
        >
          What the app is about — 2 lines abstract following the Behance event app’s concise hero copy style.
        </p>

        {/* Sign In Form */}
        <form className="mt-6 w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-black">Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 transition-colors"
          >
            Sign In
          </button>
          <p className="text-xs text-black/50">
            Don&apos;t have an account?{' '}
            <a href="/join" className="underline">
              Join now
            </a>
          </p>
        </form>
      </section>

      {/* MARQUEE */}
      <section className="px-5">
        <Marquee text="Connect. Create. Celebrate." speed={12} />
      </section>

      {/* TRENDING EVENTS */}
      <section className="px-5 mt-6 mb-10">
        <h2 className="text-xl font-medium text-white mb-3">Trending events</h2>
        <div className="space-y-4">
          {[
            {
              id: 'designathon',
              avatar: 'https://i.pravatar.cc/48?img=11',
              name: 'Ananya Sharma',
              title: 'Bengaluru Startup Meetup',
              desc: 'Network with entrepreneurs, pitch ideas, and connect with investors at this startup‑focused meetup.',
              likes: '1.2k',
              comments: '98',
            },
            {
              id: 'tech-meet',
              avatar: 'https://i.pravatar.cc/48?img=22',
              name: 'Rohit Verma',
              title: '24‑Hour Hackathon',
              desc: 'Code, collaborate, and create something amazing in 24 hours.',
              likes: '845',
              comments: '112',
            },
            {
              id: 'open-mic',
              avatar: 'https://i.pravatar.cc/48?img=36',
              name: 'Meera Iyer',
              title: 'Open Mic Night',
              desc: 'Music, poetry, and stand‑up — take the stage or cheer others on.',
              likes: '2.1k',
              comments: '340',
            },
          ].map((ev) => (
            <Link
              key={ev.id}
              href={`/events/${ev.id}`}
              className="block rounded-3xl bg-[#FFD83D] border border-[#C7A800] overflow-hidden hover:brightness-95 transition"
            >
              <div className="p-5">
                {/* Organizer */}
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ev.avatar}
                    alt="Organizer avatar"
                    className="h-8 w-8 rounded-full border border-black/10 object-cover"
                  />
                  <div className="text-sm text-black/80">
                    Posted by <span className="font-medium text-black">{ev.name}</span>
                  </div>
                </div>
                {/* Title + Desc */}
                <div className="mt-3">
                  <h3 className="text-[22px] font-semibold text-black">{ev.title}</h3>
                  <p className="mt-2 text-black/80">{ev.desc}</p>
                </div>
                {/* Actions */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    className="inline-flex items-center gap-2 rounded-xl bg-black/10 border border-black/10 px-3 py-1.5 text-sm text-black/80"
                    onClick={(e) => e.preventDefault()}
                  >
                    ❤️ {ev.likes}
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-xl bg-black/10 border border-black/10 px-3 py-1.5 text-sm text-black/80"
                    onClick={(e) => e.preventDefault()}
                  >
                    💬 {ev.comments}
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-xl bg-black/10 border border-black/10 px-3 py-1.5 text-sm text-black/80"
                    onClick={(e) => e.preventDefault()}
                  >
                    ↗ Share
                  </button>
                  {/* RSVP */}
                  <button
                    type="button"
                    className={`ml-auto inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      rsvpd[ev.id] ? 'bg-green-500 text-white' : 'bg-black text-white'
                    }`}
                    onClick={(e) => handleRSVP(e, ev.id)}
                  >
                    {rsvpd[ev.id] ? '✓ ' : 'RSVP'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <BottomNav active="home" notificationCount={3} buzz={buzz} />
    </main>
  );
}

