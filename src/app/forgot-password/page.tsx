'use client';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] font-sans px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-[#211C11] text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-black/70 text-center">
          Enter your registered email to reset your password.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-[#E7C339] hover:bg-[#d4af37] text-[#211C11] font-semibold px-4 py-2 transition-colors"
        >
          Send Reset Link
        </button>

        <p className="text-xs text-black/50 text-center">
          Remembered your password?{' '}
          <Link href="/signin" className="underline text-[#8B4513]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
