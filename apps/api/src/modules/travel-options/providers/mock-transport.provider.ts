import { Injectable } from '@nestjs/common';

import type { DestinationRecord } from '@ghumle/contracts';

@Injectable()
export class MockTransportProvider {
  getOptions(destination: DestinationRecord) {
    return {
      destination: {
        id: destination.id,
        slug: destination.slug,
        name: destination.name,
      },
      options: destination.travelOptions,
      notes: [
        'Provider abstraction is ready for future external flight and rail integrations.',
        'Phase 1 uses seeded travel pricing bands for consistent demos and admin control.',
      ],
    };
  }
}
