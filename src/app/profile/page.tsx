export default function Profile() {
  return (
    <main className="p-5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-black/10" />
        <div>
          <div className="text-lg font-medium">Student Name</div>
          <div className="text-sm text-black/60">Clubs: Design, Tech</div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm text-black/60 mb-2">Badges</h3>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#FFF3A3] px-3 py-1 text-sm">Volunteer</span>
          <span className="rounded-full bg-[#FFD83D] px-3 py-1 text-sm">Speaker</span>
        </div>
      </div>
    </main>
  );
}
