import { Injectable, NotFoundException } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly auditService: AuditService,
  ) {}

  async getCurrentUser(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateCurrentUser(userId: string, dto: UpdateProfileDto) {
    const profile = await this.usersRepository.updateProfile(
      userId,
      dto as unknown as Record<string, unknown>,
    );
    await this.auditService.log(userId, 'profile.updated', 'UserProfile', profile.id, dto);
    return profile;
  }
}
