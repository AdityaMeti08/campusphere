import EventCard from '@/components/EventCard';
export default function HomeFeed() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-5 pt-6 text-xl font-semibold">C</header>
      <section className="px-5 space-y-5 mt-4">
        <EventCard id="designathon" title="Designathon 2025" />
        <EventCard id="tech-meet" title="Tech Club Meetup" />
        <EventCard id="open-mic" title="Open Mic Night" />
      </section>
    </main>
  );
}
