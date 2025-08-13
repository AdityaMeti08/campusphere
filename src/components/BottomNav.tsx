import Link from 'next/link';
type Props = {
  active?: 'home' | 'search' | 'calendar' | 'notifications' | 'profile';
  notificationCount?: number;
  buzz?: boolean;
  onProfileClick?: () => void; // NEW
};

export default function BottomNav({ active = 'home', notificationCount = 0, buzz = false, onProfileClick }: Props) {
  const items = [
    { key: 'home', label: 'Home', href: '/', type: 'link' },
    { key: 'search', label: 'Search', href: '/search', type: 'link' },
    { key: 'calendar', label: 'Calendar', href: '/calendar', type: 'link' },
    { key: 'notifications', label: 'Alerts', href: '/notifications', type: 'link' },
    { key: 'profile', label: 'Profile', type: 'button' }, // Will use callback
  ];

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md rounded-3xl bg-[#FFE169] bg-gradient-to-br from-[#FFE169] to-[#F9C74F] ring-1 ring-[#5C3B00]/10 shadow-lg px-3 py-2">
        <ul className="grid grid-cols-5 items-center">
          {items.map((item) => {
            const isActive = active === item.key;
            const isBell = item.key === 'notifications';

            const baseClasses = `relative flex flex-col items-center gap-1`;

            if (item.type === 'link') {
              return (
                <li key={item.key} className="flex justify-center">
                  <Link href={item.href!} className={baseClasses}>
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-gradient-to-b from-[#FFD83D] to-[#E8B100]' : 'bg-white/30'
                      } ${isBell && buzz ? 'animate-[bell-shake_0.7s_ease-in-out]' : ''}`}
                    >
                      {isBell && notificationCount > 0 && (
                        <span className="absolute top-1 right-1 min-w-[1.2rem] h-5 px-1 rounded-full bg-red-500 text-white text-[0.7rem] font-bold flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] font-medium text-[#5C3B00]">{item.label}</span>
                  </Link>
                </li>
              );
            }

            if (item.type === 'button') {
              return (
                <li key={item.key} className="flex justify-center">
                  <button
                    type="button"
                    onClick={onProfileClick}
                    className={baseClasses}
                  >
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-gradient-to-b from-[#FFD83D] to-[#E8B100]' : 'bg-white/30'
                      }`}
                    >
                      {/* Icon manually here to avoid Link */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                      </svg>
                    </span>
                    <span className="text-[11px] font-medium text-[#5C3B00]">{item.label}</span>
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </nav>
  );
}
