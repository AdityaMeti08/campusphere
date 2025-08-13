// app/signin/page.tsx

'use client';

import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Signing in with', email, password);
    // TODO: integrate with actual authentication method
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-full border border-black/20 px-4 py-2 text-sm"
          required
        />

        <button
          type="submit"
          className="w-full rounded-full bg-[#FFD83D] hover:bg-[#D1A300] text-black font-medium px-4 py-2"
        >
          Sign In
        </button>

        <p className="text-xs text-center text-black/50">
          Don't have an account? <a href="/join" className="underline">Join now</a>
        </p>
      </form>
    </main>
  );
}
