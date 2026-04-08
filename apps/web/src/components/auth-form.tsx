'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { Button } from '@ghumle/ui';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    profile?: {
      fullName?: string | null;
    } | null;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

function getApiErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const message = (payload as { message?: unknown }).message;

  if (Array.isArray(message)) {
    return message.join(' ');
  }

  if (typeof message === 'string') {
    return message;
  }

  return fallback;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === 'signup';
  const isSubmitting = status === 'submitting';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus('submitting');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');
    const fullName = String(formData.get('fullName') ?? '').trim();

    try {
      const response = await fetch(`${apiBaseUrl}/auth/${isSignup ? 'register' : 'login'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isSignup ? { email, password, fullName } : { email, password }),
      });

      const payload = (await response.json()) as AuthResponse | unknown;

      if (!response.ok) {
        throw new Error(getApiErrorMessage(payload, isSignup ? 'Account creation failed.' : 'Login failed.'));
      }

      const authPayload = payload as AuthResponse;
      window.localStorage.setItem(
        'ghumle.auth',
        JSON.stringify({
          user: authPayload.user,
          tokens: authPayload.tokens,
          savedAt: new Date().toISOString(),
        }),
      );
      window.localStorage.setItem('ghumle.accessToken', authPayload.tokens.accessToken);
      window.localStorage.setItem('ghumle.refreshToken', authPayload.tokens.refreshToken);

      setStatus('success');
      router.push('/profile');
      router.refresh();
    } catch (caughtError) {
      setStatus('idle');
      setError(caughtError instanceof Error ? caughtError.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isSignup ? (
        <label className="block space-y-2 text-sm text-slate-600">
          <span>Full name</span>
          <input
            autoComplete="name"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--ghumle-color-ocean)] focus:ring-4 focus:ring-cyan-100"
            minLength={2}
            name="fullName"
            placeholder="Demo Traveler"
            required
            type="text"
          />
        </label>
      ) : null}
      <label className="block space-y-2 text-sm text-slate-600">
        <span>Email</span>
        <input
          autoComplete="email"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--ghumle-color-ocean)] focus:ring-4 focus:ring-cyan-100"
          name="email"
          placeholder="traveler@ghumle.app"
          required
          type="email"
        />
      </label>
      <label className="block space-y-2 text-sm text-slate-600">
        <span>Password</span>
        <input
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--ghumle-color-ocean)] focus:ring-4 focus:ring-cyan-100"
          minLength={8}
          name="password"
          placeholder={isSignup ? 'Minimum 8 characters' : 'Password@123'}
          required
          type="password"
        />
      </label>
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {status === 'success' ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
          Success. Redirecting to your profile.
        </p>
      ) : null}
      <Button className="w-full disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
      </Button>
      {!isSignup ? (
        <p className="text-xs text-slate-500">
          Demo account: <span className="font-semibold">traveler@ghumle.app</span> /{' '}
          <span className="font-semibold">Password@123</span>
        </p>
      ) : null}
    </form>
  );
}
