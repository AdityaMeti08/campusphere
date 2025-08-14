'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextKinetic from '@/components/TextKinetic';
import Marquee from '@/components/Marquee';
import BottomNav from '@/components/BottomNav';
import { Bell, User, BadgeCheck, Trophy, Pencil, Settings } from 'lucide-react';

type NavKey = 'home' | 'search' | 'calendar' | 'notifications' | 'profile';

/* ---------------- Confetti + Toast helpers ------------------ */
/* ---------------- Confetti + Toast helpers ------------------ */
function confettiBurst(x = 0.8, y = 0.2) {
  const end = Date.now() + 600;
  const colors = ['#FFD83D', '#D1A300', '#000000', '#ffffff'];

  function frame() {
    const particleCount = 24;
    if ((window as any).confetti) {
      (window as any).confetti({ particleCount, angle: 60, spread: 60, origin: { x, y }, colors });
      (window as any).confetti({ particleCount, angle: 120, spread: 60, origin: { x: 1 - x, y }, colors });
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
  const [activeNav, setActiveNav] = useState<NavKey>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileSection, setProfileSection] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [customEvents, setCustomEvents] = useState<any[]>([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: '',
    avatar: '',
    name: '',
    title: '',
    likes: '',
    comments: '',
  });
  const toggleSection = (section: string) => {
    setProfileSection((prev) => (prev === section ? null : section));
  };


  // notif simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuzz(true);
      const audio = new Audio('/buzz.mp3');
      audio.play().catch(() => {});
      setTimeout(() => setBuzz(false), 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRSVP = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  if (rsvpd[id]) return;
  confettiBurst(); // trigger confetti
  showCongratsToast(); // show toast
  setRsvpd((prev) => ({ ...prev, [id]: true }));
};

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.id) {
      newEvent.id = Date.now().toString();
    }
    setCustomEvents((prev) => [...prev, newEvent]);
    setNewEvent({ id: '', avatar: '', name: '', title: '', likes: '', comments: '' });
    setIsCreateEventOpen(false);
  };

  const trendingEvents = [
    {
      id: 'designathon',
      avatar: 'https://i.pravatar.cc/48?img=11',
      name: 'Ananya Sharma',
      title: 'Freshers Fest Welcome Party',
      likes: '1.2k',
      comments: '98',
    },
    {
      id: 'tech-meet',
      avatar: 'https://i.pravatar.cc/48?img=22',
      name: 'Rohit Verma',
      title: 'Coding Marathon 2024',
      likes: '845',
      comments: '112',
    },
    {
      id: 'open-mic',
      avatar: 'https://i.pravatar.cc/48?img=36',
      name: 'Meera Iyer',
      title: 'Community Art Showcase',
      likes: '2.1k',
      comments: '340',
    },
    ...customEvents, // add user-created events
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A] pb-20 font-sans">
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

      {/* Create Event Button */}
      <div className="px-5 mt-4">
        <button
          onClick={() => setIsCreateEventOpen(true)}
          className="bg-[#FFD83D] text-black px-4 py-2 rounded-full font-semibold hover:brightness-95 transition"
        >
          + Create Event
        </button>
      </div>

      {/* Floating notification bell */}
      <div className="fixed top-5 right-5 z-50">
  {/* Bell Button */}
  <button
    aria-label="Notifications"
    type="button"
    onClick={() => setIsNotificationsOpen((prev) => !prev)}
    className={`relative flex items-center justify-center w-11 h-11 rounded-full bg-black shadow-lg ring-2 ring-[#FFD83D] hover:bg-gray-800 transition
      ${buzz ? 'animate-[bell-shake_0.7s_ease-in-out]' : ''}
    `}
  >
    <Bell size={24} color="#FFD83D" />
    <span className="absolute top-2 right-2 block h-2 w-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
  </button>

  {/* Notifications Dropdown */}
  {isNotificationsOpen && (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden">
      <div className="p-3 border-b font-semibold text-gray-800">
        Notifications
      </div>
      <ul className="max-h-64 overflow-y-auto">
        <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">Event starting soon</p>
          <p className="text-xs text-gray-500">15 minutes from now</p>
        </li>
        <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">New comment on your post</p>
          <p className="text-xs text-gray-500">2 hours ago</p>
        </li>
        <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm font-medium text-gray-900">You have 3 new followers</p>
          <p className="text-xs text-gray-500">Yesterday</p>
        </li>
      </ul>
      <div className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
        View all
      </div>
    </div>
  )}
</div>



      {/* HERO */}
      <section className="px-5 mt-8 text-center">
        <TextKinetic />
        <p
          className={`mt-4 mx-auto max-w-2xl text-white text-xl sm:text-2xl leading-relaxed 
            drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] transition-opacity duration-700 ${
              showAbout ? 'opacity-100' : 'opacity-0'
            }`}
        >
          What the app is about — 2 lines abstract following the Behance event app’s concise
          hero copy style.
        </p>
      </section>

      {/* Flip Card Auth */}
      <section className="px-5">
        <div className="mt-6 flex justify-center">
          <div className="perspective">
            <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
              {/* Sign In Side */}
              <div className="flip-card-front bg-white p-6 rounded-2xl shadow space-y-4 w-80">
                <h2 className="text-2xl font-semibold text-[#211C11] text-center">Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <Link
                  href="#"
                  className="text-xs text-[#8B4513] hover:underline block text-right"
                >
                  Forgot password?
                </Link>
                <button
                  className="w-full rounded-full bg-[#E7C339] hover:bg-[#d4af37] text-[#211C11] font-semibold px-4 py-2 transition-colors"
                >
                  Sign In
                </button>
                <p className="text-xs text-black/50 text-center">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setFlipped(true)}
                    className="underline text-[#8B4513]"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Sign Up Side */}
              <div className="flip-card-back bg-white p-6 rounded-2xl shadow space-y-4 w-80">
                <h2 className="text-2xl font-semibold text-[#211C11] text-center">Sign Up</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
                />
                <button
                  className="w-full rounded-full bg-[#E7C339] hover:bg-[#d4af37] text-[#211C11] font-semibold px-4 py-2 transition-colors"
                >
                  Create Account
                </button>
                <p className="text-xs text-black/50 text-center">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setFlipped(false)}
                    className="underline text-[#8B4513]"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flip Card CSS */}
        <style jsx>{`
          .perspective {
            perspective: 1000px;
          }
          .flip-card {
            width: 320px;
            height: 420px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
          }
          .flipped {
            transform: rotateY(180deg);
          }
          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
        `}</style>
      </section>

      {/* MARQUEE */}
      <section className="px-5 mt-10">
        <Marquee text="Connect. Create. Celebrate." speed={12} />
      </section>

      {/* TRENDING EVENTS */}
     {/* TRENDING EVENTS */}
     {/* TRENDING EVENTS - show only when Calendar is active */}
{activeNav === 'calendar' && (
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
          <div className="w-full h-16 bg-black flex items-center justify-between px-5">
            <span className="font-medium text-[#FFD83D]">🔥 Trending</span>
            <button
              type="button"
              className="inline-flex items-center justify-center p-1 hover:scale-125 transition-transform"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFD83D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <img
                src={ev.avatar}
                alt="Organizer avatar"
                className="h-8 w-8 rounded-full border border-black/10 object-cover"
              />
              <div className="text-sm text-black/80">
                Posted by <span className="font-medium text-black">{ev.name}</span>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-[22px] font-semibold text-black">{ev.title}</h3>
              <p className="mt-2 text-black/80">{ev.desc}</p>
            </div>
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
              <button
                type="button"
                className={`ml-auto inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  rsvpd[ev.id] ? 'bg-green-500 text-white' : 'bg-black text-white'
                }`}
                onClick={(e) => handleRSVP(e, ev.id)}
              >
                {rsvpd[ev.id] ? '✓ RSVPd' : 'RSVP'}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}


      {/* Create Event Modal */}
{/* Floating Create Event button - always visible */}
<div className="fixed bottom-5 right-5 z-40">
  <button
    type="button"
    onClick={() => setIsCreateEventOpen(true)}
    className="px-5 py-3 rounded-full bg-[#FFD83D] hover:bg-[#e6c532] text-black font-semibold shadow-lg transition"
  >
    + Create Event
  </button>
</div>

{/* Create Event Modal */}
{isCreateEventOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <form
      onSubmit={handleCreateEventSubmit}
      className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4 overflow-y-auto max-h-[90vh]"
    >
      <h2 className="text-xl font-semibold text-[#211C11]">Create Event</h2>

      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="w-full border border-black/20 rounded-full px-4 py-2 text-sm text-black"
        required
      />

      <input
        type="text"
        placeholder="Organizer Name"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        className="w-full border border-black/20 rounded-full px-4 py-2 text-sm text-black"
        required
      />

      <input
        type="text"
        placeholder="Avatar URL"
        value={newEvent.avatar}
        onChange={(e) => setNewEvent({ ...newEvent, avatar: e.target.value })}
        className="w-full border border-black/20 rounded-full px-4 py-2 text-sm text-black"
      />

      <input
        type="number"
        placeholder="Likes"
        value={newEvent.likes}
        onChange={(e) => setNewEvent({ ...newEvent, likes: e.target.value })}
        className="w-full border border-black/20 rounded-full px-4 py-2 text-sm text-black"
      />

      <input
        type="number"
        placeholder="Comments"
        value={newEvent.comments}
        onChange={(e) => setNewEvent({ ...newEvent, comments: e.target.value })}
        className="w-full border border-black/20 rounded-full px-4 py-2 text-sm text-black"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsCreateEventOpen(false)}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-[#FFD83D] hover:bg-[#e6c532] font-semibold shadow"
        >
          Save
        </button>
      </div>
    </form>
  </div>
)}



      {/* PROFILE OVERLAY */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full mx-4 shadow-lg relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src="https://i.pravatar.cc/100?img=33"
              alt="Profile"
              className="w-20 h-20 rounded-full border mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-center text-[#211C11]">
              John Doe
            </h3>

            <div className="mt-8 flex flex-col gap-2 w-full">
              {/* BIO */}
              <div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                  onClick={() => toggleSection('bio')}
                >
                  <User size={20} stroke="#A47C1E" />
                  <span className="text-base font-medium text-[#211C11]">Bio</span>
                </button>
                {profileSection === 'bio' && (
                  <p className="px-4 py-2 text-sm text-gray-600">
                    This is a short biography about the user. It can describe their
                    interests, role, and a quick introduction.
                  </p>
                )}
              </div>

              {/* BADGES */}
              <div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                  onClick={() => toggleSection('badges')}
                >
                  <BadgeCheck size={20} color="#E7C339" />
                  <span className="text-base font-medium text-[#211C11]">Badges</span>
                </button>
                {profileSection === 'badges' && (
                  <p className="px-4 py-2 text-sm text-gray-600">
                    List of badges earned for participation, achievements and
                    contributions.
                  </p>
                )}
              </div>

              {/* ACHIEVEMENTS */}
              <div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                  onClick={() => toggleSection('achievements')}
                >
                  <Trophy size={20} stroke="#6B4B1A" />
                  <span className="text-base font-medium text-[#211C11]">Achievements</span>
                </button>
                {profileSection === 'achievements' && (
                  <p className="px-4 py-2 text-sm text-gray-600">
                    Highlights of completed events, competitions won, and major
                    milestones.
                  </p>
                )}
              </div>

              {/* EDIT PROFILE */}
              <div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                  onClick={() => toggleSection('edit')}
                >
                  <Pencil size={20} stroke="#347B45" />
                  <span className="text-base font-medium text-[#211C11]">Edit Profile</span>
                </button>
              </div>



              {/* SETTINGS */}
<div>
  <button
    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition"
    onClick={() => toggleSection('settings')}
  >
    <Settings size={20} stroke="#b8c5bbff" />
    <span className="text-base font-medium text-[#211C11]">Settings</span>
  </button>

  {profileSection === 'settings' && (
    <div className="pl-12 flex flex-col gap-2 mt-2">
      <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg px-3 py-2 transition">
        <User size={16} stroke="#555" />
        Account Settings
      </button>

      <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg px-3 py-2 transition">
        <BadgeCheck size={16} color="#E7C339" />
        Privacy
      </button>

      <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg px-3 py-2 transition">
        <Bell size={16} stroke="#A47C1E" />
        Help & Support
      </button>
    </div>
  )}
</div>

            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <BottomNav
  active={activeNav}
  onTabChange={(key: NavKey) => {
    setActiveNav(key);
    if (key === 'profile') setIsProfileOpen(true);
  }}
  onProfileClick={() => {
    setActiveNav('profile');
    setIsProfileOpen(true);
  }}
/>
    </main>
  );
}
