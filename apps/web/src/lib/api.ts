import {
  adminOverviewMetrics,
  generateItinerary,
  mockDestinations,
  mockTravelMatches,
  mockWishlist,
} from '@ghumle/contracts';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithFallback<T>(path: string, fallback: T): Promise<T> {
  if (!apiBaseUrl) {
    return fallback;
  }

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getDestinations() {
  return fetchWithFallback('/destinations', mockDestinations);
}

export async function getDestinationBySlug(slug: string) {
  const destination = mockDestinations.find((item) => item.slug === slug);
  return fetchWithFallback(`/destinations/${slug}`, destination ?? null);
}

export function getAdminOverview() {
  return fetchWithFallback('/admin/overview', adminOverviewMetrics);
}

export function getTravelMatches() {
  return fetchWithFallback('/matches/suggestions', mockTravelMatches);
}

export function getWishlist() {
  return Promise.resolve(mockWishlist);
}

export function getDemoTrips() {
  return Promise.resolve([
    {
      id: 'trip_demo_1',
      title: 'Bali August Escape',
      destination: mockDestinations.find((item) => item.slug === 'bali') ?? mockDestinations[0],
      pace: 'BALANCED',
      budget: 110000,
      travelers: 2,
      itinerary: generateItinerary({
        destinationSlug: 'bali',
        durationDays: 6,
        travelers: 2,
        pace: 'BALANCED',
      }),
    },
  ]);
}
