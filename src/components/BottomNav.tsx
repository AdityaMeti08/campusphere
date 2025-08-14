'use client';

import React from 'react';
import { Home, Search, Ticket, Bell, User } from 'lucide-react';

type TabKey = 'home' | 'search' | 'calendar' | 'notifications' | 'profile';

type Props = {
  active?: TabKey;
  onTabChange?: (key: TabKey) => void;
  notificationCount?: number;
  buzz?: boolean;
  onProfileClick?: () => void;
};

const OCHRE = '#E7C339';
const BROWN = '#211C11';

export default function BottomNav({
  active = 'home',
  onTabChange,
  notificationCount = 0,
  buzz = false,
  onProfileClick,
}: Props) {
  const groupedTabs: Array<{
    key: TabKey;
    label: string;
    icon: React.ReactElement;
    button?: boolean;
  }> = [
    
    { key: 'calendar', label: 'Events', icon: <Ticket size={22} color={OCHRE} /> },
    { key: 'profile', label: 'Profile', icon: <User size={22} color={OCHRE} />, button: true },
  ];

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none select-none">
      <div className="pointer-events-auto w-full max-w-md flex items-center gap-5 px-2 py-2">

        {/* Home button */}
        {active === 'home' ? (
          <button
            type="button"
            aria-label="Home"
            onClick={() => onTabChange?.('home')}
            className="flex items-center gap-1 px-6 py-2 rounded-full bg-[#E7C339] border-2 border-[#E7C339] shadow font-bold text-[#211C11] text-[15px]"
          >
            <Home size={22} color={BROWN} />
            <span>Home</span>
          </button>
        ) : (
          <button
            type="button"
            aria-label="Home"
            onClick={() => onTabChange?.('home')}
            className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#E7C339] bg-[#FFF6C2]"
          >
            <Home size={22} color={OCHRE} />
          </button>
        )}

        {/* Right-side grouped icons */}
        <div className="flex flex-1 items-center justify-around rounded-full bg-[#FFF6C2] border-2 border-[#E7C339] shadow-[0_8px_24px_rgba(211,195,57,0.1)] h-[52px]">
          {groupedTabs.map((tab) => {
            const isActive = active === tab.key;
            const Icon = tab.icon;

            if (tab.button) {
              // Profile
              return isActive ? (
                <button
                  key={tab.key}
                  type="button"
                  aria-label="Profile"
                  onClick={onProfileClick}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#E7C339] border-2 border-[#E7C339] shadow font-bold text-[#211C11] text-[15px]"
                >
                  {Icon}
                  <span>{tab.label}</span>
                </button>
              ) : (
                <button
                  key={tab.key}
                  type="button"
                  aria-label="Profile"
                  onClick={onProfileClick}
                  className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#E7C339] bg-transparent"
                >
                  {Icon}
                </button>
              );
            }
            // Search / Calendar
            return isActive ? (
              <button
                key={tab.key}
                type="button"
                aria-label={tab.label}
                onClick={() => onTabChange?.(tab.key)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#E7C339] border-2 border-[#E7C339] shadow font-bold text-[#211C11] text-[15px]"
              >
                {Icon}
                <span>{tab.label}</span>
              </button>
            ) : (
              <button
                key={tab.key}
                type="button"
                aria-label={tab.label}
                onClick={() => onTabChange?.(tab.key)}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#E7C339] bg-transparent"
              >
                {Icon}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
