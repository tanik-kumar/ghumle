import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { WishlistService } from './wishlist.service';

@ApiTags('Wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'wishlist', version: '1' })
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  listMine(@CurrentUser() user: { sub: string }) {
    return this.wishlistService.listMine(user.sub);
  }

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: CreateWishlistItemDto) {
    return this.wishlistService.create(user.sub, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: { sub: string }, @Param('id') id: string, @Body() dto: UpdateWishlistItemDto) {
    return this.wishlistService.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { sub: string }, @Param('id') id: string) {
    return this.wishlistService.remove(user.sub, id);
  }
}
