'use client';

import { useEffect, useState } from 'react';

import { authSessionEventName, readAuthSession, type AuthSession } from './auth';

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      setSession(readAuthSession());
      setIsHydrated(true);
    };

    syncSession();
    window.addEventListener('storage', syncSession);
    window.addEventListener(authSessionEventName, syncSession);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener(authSessionEventName, syncSession);
    };
  }, []);

  return {
    session,
    isHydrated,
  };
}
