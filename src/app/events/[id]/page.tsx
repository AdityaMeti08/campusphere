// app/events/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';

const EVENTS: Record<
  string,
  {
    title: string;
    date: string;
    time: string;
    venue: string;
    attendees: number;
    description: string;
    cover: string;
  }
> = {
  'designathon': {
    title: 'Designathon 2025',
    date: 'Fri, Aug 22',
    time: '7:00 PM – 10:00 PM',
    venue: 'E-Block Hall',
    attendees: 128,
    description:
      'Join us for an exciting day of creativity where designers, developers, and innovators collaborate to solve real-world problems through design. Expect mentorship, networking, and lots of fun!',
    cover: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&h=675&fit=crop&auto=format',
  },
  'tech-meet': {
    title: 'Tech Club Meetup',
    date: 'Sat, Aug 23',
    time: '5:30 PM – 7:30 PM',
    venue: 'Lab 3, C-Block',
    attendees: 86,
    description:
      'An evening of tech talks, project showcases, and knowledge sharing. Connect with industry experts, alumni, and fellow students passionate about technology.',
    cover: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&h=675&fit=crop&auto=format',
  },
  'open-mic': {
    title: 'Open Mic Night',
    date: 'Sun, Aug 24',
    time: '6:00 PM – 9:00 PM',
    venue: 'Auditorium',
    attendees: 210,
    description:
      'A celebration of talent and creativity! Step onto the stage to perform music, poetry, comedy, or any art form. All are welcome to participate or cheer from the audience.',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&h=675&fit=crop&auto=format',
  },
};
export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const event = useMemo(() => EVENTS[id], [id]);

  if (!event) {
    return (
      <main className="p-6">
        <p className="mb-3">Event not found.</p>
        <Link href="/" className="underline">Go back</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-200 flex items-center px-4 py-3 z-20">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </Link>
        <span className="ml-2 font-medium text-gray-700">Event details</span>
      </header>

      {/* Event-specific image */}
      <div className="w-full aspect-[16/9] overflow-hidden bg-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.cover}
          alt={`${event.title} poster`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="px-5 py-4">
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <Meta icon={<Calendar size={16} />} label={event.date} />
          <Meta icon={<Clock size={16} />} label={event.time} />
          <Meta icon={<MapPin size={16} />} label={event.venue} />
          <Meta icon={<Users size={16} />} label={`${event.attendees} going`} />
        </div>
        <div className="mt-5">
          <h3 className="font-medium mb-1">About</h3>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </main>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-2">{icon}<span>{label}</span></div>;
}
