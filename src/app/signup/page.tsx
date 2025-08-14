'use client';
import Link from 'next/link';

export default function SignUp() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] font-sans px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-4">
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
          type="submit"
          className="w-full rounded-full bg-[#E7C339] hover:bg-[#d4af37] text-[#211C11] font-semibold px-4 py-2 transition-colors"
        >
          Create Account
        </button>

        <p className="text-xs text-black/50 text-center">
          Already have an account?{' '}
          <Link href="/signin" className="underline text-[#8B4513]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
