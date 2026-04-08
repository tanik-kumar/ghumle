export interface AuthProfile {
  fullName?: string | null;
  avatarUrl?: string | null;
  baseCurrency?: string | null;
  countryCode?: string | null;
  timezone?: string | null;
  preferredTravelStyles?: string[];
  privacyLevel?: string | null;
  isTravelPartnerVisible?: boolean;
  bio?: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isActive?: boolean;
  profile?: AuthProfile | null;
  adminUser?: {
    permissions?: string[];
  } | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
  savedAt: string;
}

export const authSessionStorageKey = 'ghumle.auth';
export const authAccessTokenStorageKey = 'ghumle.accessToken';
export const authRefreshTokenStorageKey = 'ghumle.refreshToken';
export const authSessionEventName = 'ghumle-auth-changed';

function dispatchAuthSessionChange() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(authSessionEventName));
}

export function readAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(authSessionStorageKey);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      typeof parsed.user?.email !== 'string' ||
      typeof parsed.tokens?.accessToken !== 'string' ||
      typeof parsed.tokens?.refreshToken !== 'string'
    ) {
      clearAuthSession();
      return null;
    }

    return parsed as AuthSession;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(authSessionStorageKey, JSON.stringify(session));
  window.localStorage.setItem(authAccessTokenStorageKey, session.tokens.accessToken);
  window.localStorage.setItem(authRefreshTokenStorageKey, session.tokens.refreshToken);
  dispatchAuthSessionChange();
}

export function clearAuthSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(authSessionStorageKey);
  window.localStorage.removeItem(authAccessTokenStorageKey);
  window.localStorage.removeItem(authRefreshTokenStorageKey);
  dispatchAuthSessionChange();
}

export function getDisplayName(user: AuthUser | null | undefined) {
  if (!user) {
    return 'Traveler';
  }

  return user.profile?.fullName?.trim() || user.email.split('@')[0] || 'Traveler';
}
