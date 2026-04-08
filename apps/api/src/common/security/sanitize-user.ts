export function sanitizeUser<T extends { passwordHash?: unknown; refreshTokenHash?: unknown }>(
  user: T,
): Omit<T, 'passwordHash' | 'refreshTokenHash'> {
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  delete safeUser.refreshTokenHash;
  return safeUser;
}
