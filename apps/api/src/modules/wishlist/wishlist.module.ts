import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsModule } from '../destinations/destinations.module';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './repositories/wishlist.repository';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [DestinationsModule],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository, AuditService],
})
export class WishlistModule {}
