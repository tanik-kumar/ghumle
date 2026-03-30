import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  enqueueDealAlert(destinationSlug: string, thresholdPrice: number) {
    return {
      destinationSlug,
      thresholdPrice,
      status: 'queued',
      provider: 'placeholder',
    };
  }

  enqueueMatchNotification(userId: string, matchUserId: string) {
    return {
      userId,
      matchUserId,
      status: 'queued',
      provider: 'placeholder',
    };
  }
}
