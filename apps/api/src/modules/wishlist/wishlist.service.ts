import { Injectable, NotFoundException } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsRepository } from '../destinations/repositories/destinations.repository';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { WishlistRepository } from './repositories/wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepository: WishlistRepository,
    private readonly destinationsRepository: DestinationsRepository,
    private readonly auditService: AuditService,
  ) {}

  listMine(userId: string) {
    return this.wishlistRepository.listByUser(userId);
  }

  async create(userId: string, dto: CreateWishlistItemDto) {
    const destination = await this.destinationsRepository.findBySlug(dto.destinationSlug);

    if (!destination) {
      throw new NotFoundException('Destination not found.');
    }

    const item = await this.wishlistRepository.create({
      userId,
      destinationId: destination.id,
      targetBudget: dto.targetBudget,
      targetMonth: dto.targetMonth,
      targetYear: dto.targetYear,
      note: dto.note,
    });

    await this.auditService.log(userId, 'wishlist.created', 'WishlistItem', item.id, dto);
    return item;
  }

  async update(userId: string, id: string, dto: UpdateWishlistItemDto) {
    const item = await this.wishlistRepository.update(id, userId, dto);
    if (!item) {
      throw new NotFoundException('Wishlist item not found.');
    }
    await this.auditService.log(userId, 'wishlist.updated', 'WishlistItem', id, dto);
    return item;
  }

  async remove(userId: string, id: string) {
    const item = await this.wishlistRepository.remove(id, userId);
    if (!item) {
      throw new NotFoundException('Wishlist item not found.');
    }
    await this.auditService.log(userId, 'wishlist.removed', 'WishlistItem', id);
    return item;
  }
}
