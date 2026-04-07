import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { DatabaseModule } from './common/database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { DestinationsModule } from './modules/destinations/destinations.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { HealthModule } from './modules/health/health.module';
import { ItinerariesModule } from './modules/itineraries/itineraries.module';
import { MatchingModule } from './modules/matching/matching.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SavingsModule } from './modules/savings/savings.module';
import { TravelOptionsModule } from './modules/travel-options/travel-options.module';
import { UsersModule } from './modules/users/users.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 80,
      },
    ]),
    HealthModule,
    AuthModule,
    UsersModule,
    DestinationsModule,
    DiscoveryModule,
    ItinerariesModule,
    TravelOptionsModule,
    WishlistModule,
    SavingsModule,
    MatchingModule,
    NotificationsModule,
    AdminModule,
  ],
})
export class AppModule {}
