import { SectionHeading } from '@ghumle/ui';

import { DestinationCard } from '../../components/destination-card';
import { getDestinations } from '../../lib/api';

export default async function ExplorePage() {
  const destinations = await getDestinations();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Explore"
        title="Global destinations organized for budget, style, and season"
        description="Every destination card carries enough signal to compare budget fit, trip duration, tags, and broad safety posture before the user commits to a detailed plan."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
