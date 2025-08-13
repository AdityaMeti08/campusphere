export default function Search() {
  return (
    <main className="p-5">
      <input placeholder="Search events, clubs" className="w-full rounded-full border border-black/10 px-5 py-3" />
      <div className="mt-4 flex gap-2">
        {['Today','This week','Free','Workshops','Sports'].map(f=>(
          <button key={f} className="rounded-full border border-black/15 px-4 py-2 text-sm">{f}</button>
        ))}
      </div>
    </main>
  );
}
    