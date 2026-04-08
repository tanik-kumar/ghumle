import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { AuditService } from '../../common/audit/audit.service';
import type { AuthenticatedUser } from '../../common/security/current-user.decorator';
import { sanitizeUser } from '../../common/security/sanitize-user';
import { UsersRepository } from '../users/repositories/users.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly auditService: AuditService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists with this email.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.createUser({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
    });

    const tokens = await this.createTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersRepository.setRefreshTokenHash(user.id, await bcrypt.hash(tokens.refreshToken, 10));
    await this.auditService.log(user.id, 'auth.registered', 'User', user.id);

    return {
      user: sanitizeUser(user),
      tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const tokens = await this.createTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersRepository.setRefreshTokenHash(user.id, await bcrypt.hash(tokens.refreshToken, 10));
    await this.auditService.log(user.id, 'auth.logged-in', 'User', user.id);

    return {
      user: sanitizeUser(user),
      tokens,
    };
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<AuthenticatedUser & { type: string }>(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
    });

    const user = await this.usersRepository.findById(payload.sub);

    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Refresh session not found.');
    }

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!tokenMatches) {
      throw new UnauthorizedException('Refresh token mismatch.');
    }

    const tokens = await this.createTokens({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.usersRepository.setRefreshTokenHash(user.id, await bcrypt.hash(tokens.refreshToken, 10));

    return {
      user: sanitizeUser(user),
      tokens,
    };
  }

  async me(userId: string) {
    const user = await this.usersRepository.findById(userId);
    return user ? sanitizeUser(user) : null;
  }

  private async createTokens(payload: AuthenticatedUser) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET ?? 'change-me-access',
      expiresIn: (process.env.JWT_ACCESS_TTL ?? '15m') as any,
    });

    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
        expiresIn: (process.env.JWT_REFRESH_TTL ?? '30d') as any,
      },
    );

    return { accessToken, refreshToken };
  }
}
