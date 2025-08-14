import type { Metadata } from 'next';
import { Geist, Geist_Mono, Urbanist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Campusphere',
  description: 'Campus events at your fingertips',
  themeColor: '#FFD83D',
  manifest: '/manifest.json',
  // Optional icons if you have them in /public
  // icons: {
  //   icon: [
  //     { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
  //     { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
  //   ],
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${urbanist.className} ${urbanist.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}
