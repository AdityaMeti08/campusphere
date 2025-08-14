'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate verification / API call
    setTimeout(() => {
      alert('✅ Sign In Successful! Redirecting...');
      router.push('/landing'); // Go to Landing page after sign-in
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-5 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-[#211C11] text-center">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-[#E7C339] hover:bg-[#d4af37] text-[#211C11] font-semibold px-4 py-2 transition-colors"
        >
          Sign In
        </button>

        <p className="text-xs text-black/50 text-center">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="underline text-[#8B4513]">
            Sign Up
          </a>
        </p>
      </form>
    </main>
  );
}
