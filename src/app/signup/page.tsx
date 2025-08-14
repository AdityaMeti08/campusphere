'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Simulate verification (replace with API)
    setTimeout(() => {
      alert('✅ Account Created! Please Sign In.');
      router.push('/signin'); // Redirect to sign-in after successful signup
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-5 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-[#211C11] text-center">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm text-black"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
          <a href="/signin" className="underline text-[#8B4513]">
            Sign In
          </a>
        </p>
      </form>
    </main>
  );
}
