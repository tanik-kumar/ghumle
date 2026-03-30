import type {
  AdminOverviewMetrics,
  DestinationRecord,
  DiscoveryRequest,
  DiscoverySuggestion,
  ItineraryDayPlan,
  ItineraryGenerationRequest,
  MonthNumber,
  SavingsPlanInput,
  SavingsPlanResult,
  TravelMatchPreview,
  WishlistEntryPreview,
} from './domain';

export const destinationCategories = [
  { slug: 'beach', name: 'Beach' },
  { slug: 'mountains', name: 'Mountains' },
  { slug: 'nature', name: 'Nature' },
  { slug: 'adventure', name: 'Adventure' },
  { slug: 'religious', name: 'Religious' },
  { slug: 'city', name: 'City' },
  { slug: 'luxury', name: 'Luxury' },
  { slug: 'family', name: 'Family' },
  { slug: 'couple', name: 'Couple' },
  { slug: 'solo', name: 'Solo' },
  { slug: 'party', name: 'Party' },
] as const;

export const mockDestinations: DestinationRecord[] = [
  {
    id: 'dest_goa',
    slug: 'goa',
    name: 'Goa',
    country: 'India',
    countryCode: 'IN',
    region: 'Konkan Coast',
    scope: 'DOMESTIC',
    summary:
      'Goa balances easy beaches, nightlife, water sports, and short-trip convenience for couples, friends, and families.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 5200,
    popularityScore: 91,
    convenienceScore: 88,
    safetyScore: 78,
    familyScore: 84,
    coupleScore: 89,
    bestMonths: [11, 12, 1, 2, 3],
    bestTimeToVisit: 'November to March',
    recommendedDuration: { minDays: 4, maxDays: 6 },
    visaNote: 'No visa required for domestic travelers. International travelers need a valid India entry document.',
    safetyNote: 'Stay alert around nightlife zones, pre-book cabs late at night, and follow beach swimming flags.',
    tags: ['BEACH', 'PARTY', 'COUPLE', 'FAMILY'],
    topAttractions: ['Baga Beach', 'Fontainhas', 'Dudhsagar Falls', 'Chapora Fort'],
    hotelAreas: ['Candolim', 'Calangute', 'Panaji', 'Anjuna'],
    foodSuggestions: ['Goan fish thali', 'Bebinca', 'Beach shacks in Candolim'],
    activitySuggestions: ['Sunset cruise', 'Scooter hopping', 'Water sports', 'Portuguese quarter walk'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 3500, maxPrice: 9500, note: 'Best for metro departures.' },
      { mode: 'TRAIN', minPrice: 900, maxPrice: 2800, note: 'Value choice from western and southern India.' },
      { mode: 'BUS', minPrice: 1200, maxPrice: 3200, note: 'Overnight buses work well from nearby states.' },
      { mode: 'LOCAL', minPrice: 400, maxPrice: 1500, note: 'Scooter rental remains the most flexible mode.' },
      { mode: 'SELF_DRIVE', minPrice: 1800, maxPrice: 4200, note: 'Good for groups coming from Karnataka or Maharashtra.' },
      { mode: 'PICKUP', minPrice: 900, maxPrice: 2200, note: 'Airport transfers vary by beach belt.' },
    ],
    costTemplate: {
      transportPerTraveler: 5500,
      stayPerNight: 4200,
      foodPerTravelerPerDay: 1100,
      localTransportPerDay: 900,
      activitiesPerTravelerPerDay: 1300,
      contingencyRate: 0.12,
    },
  },
  {
    id: 'dest_manali',
    slug: 'manali',
    name: 'Manali',
    country: 'India',
    countryCode: 'IN',
    region: 'Himachal Pradesh',
    scope: 'DOMESTIC',
    summary:
      'Manali is a strong budget mountain option for scenery, cafes, winter views, and light adventure without a luxury spend.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 4800,
    popularityScore: 86,
    convenienceScore: 75,
    safetyScore: 81,
    familyScore: 82,
    coupleScore: 87,
    bestMonths: [3, 4, 5, 6, 10, 11],
    bestTimeToVisit: 'March to June and October to November',
    recommendedDuration: { minDays: 4, maxDays: 7 },
    visaNote: 'No visa required for domestic travelers.',
    safetyNote: 'Mountain drives can slow sharply in rain or snow. Keep buffer time for transfers.',
    tags: ['MOUNTAINS', 'NATURE', 'ADVENTURE', 'COUPLE', 'FAMILY'],
    topAttractions: ['Solang Valley', 'Old Manali', 'Atal Tunnel', 'Jogini Falls'],
    hotelAreas: ['Mall Road', 'Old Manali', 'Prini', 'Vashisht'],
    foodSuggestions: ['Himachali dham', 'Cafe breakfasts in Old Manali', 'Local trout'],
    activitySuggestions: ['Paragliding', 'Short hikes', 'Snow point visit', 'Cafe circuit'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 6500, maxPrice: 12500, note: 'Usually via Bhuntar with road transfer.' },
      { mode: 'BUS', minPrice: 900, maxPrice: 2400, note: 'Reliable overnight option from Delhi or Chandigarh.' },
      { mode: 'SELF_DRIVE', minPrice: 2500, maxPrice: 7500, note: 'Useful for flexible sightseeing if roads are clear.' },
      { mode: 'LOCAL', minPrice: 500, maxPrice: 1600, note: 'Local cabs for valley hops and sightseeing.' },
      { mode: 'PICKUP', minPrice: 2200, maxPrice: 4800, note: 'Bhuntar to Manali transfer pricing varies by season.' },
      { mode: 'TRAIN', minPrice: 0, maxPrice: 0, note: 'Nearest rail access still requires road transfer.' },
    ],
    costTemplate: {
      transportPerTraveler: 3800,
      stayPerNight: 3500,
      foodPerTravelerPerDay: 900,
      localTransportPerDay: 850,
      activitiesPerTravelerPerDay: 1200,
      contingencyRate: 0.1,
    },
  },
  {
    id: 'dest_rishikesh',
    slug: 'rishikesh',
    name: 'Rishikesh',
    country: 'India',
    countryCode: 'IN',
    region: 'Uttarakhand',
    scope: 'DOMESTIC',
    summary:
      'Rishikesh combines river adventure, spiritual retreats, and low-cost stays, making it a high-value short trip.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 3900,
    popularityScore: 82,
    convenienceScore: 80,
    safetyScore: 84,
    familyScore: 75,
    coupleScore: 76,
    bestMonths: [2, 3, 4, 9, 10, 11],
    bestTimeToVisit: 'February to April and September to November',
    recommendedDuration: { minDays: 3, maxDays: 5 },
    visaNote: 'No visa required for domestic travelers.',
    safetyNote: 'Use verified rafting operators and avoid riverside edges after dark.',
    tags: ['NATURE', 'ADVENTURE', 'RELIGIOUS', 'SOLO'],
    topAttractions: ['Laxman Jhula', 'Triveni Ghat', 'Neer Garh Waterfall', 'Rafting stretch'],
    hotelAreas: ['Tapovan', 'Laxman Jhula', 'Swarg Ashram'],
    foodSuggestions: ['Cafe breakfasts in Tapovan', 'North Indian thali', 'Riverside vegetarian cafes'],
    activitySuggestions: ['Yoga session', 'Rafting', 'Aarti', 'Short waterfall trek'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 3500, maxPrice: 8500, note: 'Fly to Dehradun then continue by road.' },
      { mode: 'TRAIN', minPrice: 600, maxPrice: 2200, note: 'Haridwar rail access keeps costs down.' },
      { mode: 'BUS', minPrice: 700, maxPrice: 1800, note: 'Frequent overnight services from Delhi NCR.' },
      { mode: 'LOCAL', minPrice: 350, maxPrice: 1100, note: 'Auto-rickshaw and local cab support.' },
      { mode: 'SELF_DRIVE', minPrice: 1800, maxPrice: 4500, note: 'Easy for nearby states and weekend travel.' },
      { mode: 'PICKUP', minPrice: 900, maxPrice: 2200, note: 'Dehradun or Haridwar transfers available.' },
    ],
    costTemplate: {
      transportPerTraveler: 2600,
      stayPerNight: 2500,
      foodPerTravelerPerDay: 800,
      localTransportPerDay: 650,
      activitiesPerTravelerPerDay: 950,
      contingencyRate: 0.08,
    },
  },
  {
    id: 'dest_bali',
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Bali Province',
    scope: 'INTERNATIONAL',
    summary:
      'Bali remains one of the best value international beach destinations with strong villa options, cafes, and mixed trip styles.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 7600,
    popularityScore: 94,
    convenienceScore: 79,
    safetyScore: 82,
    familyScore: 83,
    coupleScore: 93,
    bestMonths: [4, 5, 6, 7, 8, 9],
    bestTimeToVisit: 'April to September',
    recommendedDuration: { minDays: 5, maxDays: 8 },
    visaNote: 'Visa requirements vary by passport. Indian travelers should verify current Indonesia entry rules before booking.',
    safetyNote: 'Watch traffic around scooter-heavy areas and book water activities only with reputed operators.',
    tags: ['BEACH', 'LUXURY', 'COUPLE', 'FAMILY', 'PARTY'],
    topAttractions: ['Ubud', 'Uluwatu Temple', 'Seminyak', 'Nusa Penida'],
    hotelAreas: ['Seminyak', 'Ubud', 'Canggu', 'Nusa Dua'],
    foodSuggestions: ['Nasi goreng', 'Beach clubs in Seminyak', 'Cafe brunches in Canggu'],
    activitySuggestions: ['Temple hopping', 'Beach club day', 'Rice terrace visit', 'Island day trip'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 21000, maxPrice: 42000, note: 'Primary access mode for most travelers.' },
      { mode: 'LOCAL', minPrice: 700, maxPrice: 2200, note: 'Scooter or local taxi pricing varies by zone.' },
      { mode: 'SELF_DRIVE', minPrice: 1200, maxPrice: 2600, note: 'Scooter rentals are common but safety gear matters.' },
      { mode: 'PICKUP', minPrice: 1200, maxPrice: 3200, note: 'Airport transfers vary by stay region.' },
      { mode: 'TRAIN', minPrice: 0, maxPrice: 0, note: 'Not applicable.' },
      { mode: 'BUS', minPrice: 0, maxPrice: 0, note: 'Not applicable for primary arrival.' },
    ],
    costTemplate: {
      transportPerTraveler: 28000,
      stayPerNight: 6200,
      foodPerTravelerPerDay: 1400,
      localTransportPerDay: 1100,
      activitiesPerTravelerPerDay: 1900,
      contingencyRate: 0.13,
    },
  },
  {
    id: 'dest_phuket',
    slug: 'phuket',
    name: 'Phuket',
    country: 'Thailand',
    countryCode: 'TH',
    region: 'Southern Thailand',
    scope: 'INTERNATIONAL',
    summary:
      'Phuket is a strong phase-one international recommendation when users want beach energy, islands, and manageable mid-range budgets.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 7200,
    popularityScore: 89,
    convenienceScore: 82,
    safetyScore: 79,
    familyScore: 81,
    coupleScore: 87,
    bestMonths: [11, 12, 1, 2, 3, 4],
    bestTimeToVisit: 'November to April',
    recommendedDuration: { minDays: 4, maxDays: 7 },
    visaNote: 'Check current Thailand visa or visa-exemption rules for your passport before finalizing.',
    safetyNote: 'Respect sea-condition advisories and prefer metered transport or app-based taxis.',
    tags: ['BEACH', 'PARTY', 'COUPLE', 'FAMILY'],
    topAttractions: ['Patong', 'Phi Phi day trip', 'Big Buddha', 'Old Phuket Town'],
    hotelAreas: ['Patong', 'Kata', 'Karon', 'Old Town'],
    foodSuggestions: ['Thai curries', 'Night markets', 'Seafood restaurants near beaches'],
    activitySuggestions: ['Island hopping', 'Sunset viewpoint', 'Street market walk', 'Snorkeling'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 19000, maxPrice: 34000, note: 'Best routed through Bangkok or direct seasonal flights.' },
      { mode: 'LOCAL', minPrice: 900, maxPrice: 2600, note: 'Tuk-tuks and taxis are pricier in tourist zones.' },
      { mode: 'SELF_DRIVE', minPrice: 1600, maxPrice: 3200, note: 'Scooters are common but require caution and insurance.' },
      { mode: 'PICKUP', minPrice: 1500, maxPrice: 3500, note: 'Airport transfers depend on beach strip.' },
      { mode: 'TRAIN', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
      { mode: 'BUS', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
    ],
    costTemplate: {
      transportPerTraveler: 24000,
      stayPerNight: 5200,
      foodPerTravelerPerDay: 1300,
      localTransportPerDay: 1000,
      activitiesPerTravelerPerDay: 1700,
      contingencyRate: 0.12,
    },
  },
  {
    id: 'dest_dubai',
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Middle East',
    scope: 'INTERNATIONAL',
    summary:
      'Dubai is a premium city choice for travelers who want comfort, shopping, iconic sights, and predictable infrastructure.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 11800,
    popularityScore: 93,
    convenienceScore: 95,
    safetyScore: 91,
    familyScore: 90,
    coupleScore: 85,
    bestMonths: [11, 12, 1, 2, 3],
    bestTimeToVisit: 'November to March',
    recommendedDuration: { minDays: 4, maxDays: 6 },
    visaNote: 'Many travelers require a UAE visa in advance or through airline/hotel sponsorship.',
    safetyNote: 'Strong general safety standards, but budget for higher local transport and attraction costs.',
    tags: ['CITY', 'LUXURY', 'FAMILY', 'COUPLE'],
    topAttractions: ['Burj Khalifa', 'Dubai Mall', 'Desert safari', 'Dubai Marina'],
    hotelAreas: ['Downtown', 'Dubai Marina', 'Business Bay', 'Deira'],
    foodSuggestions: ['Global dining in Downtown', 'Local Emirati tasting', 'Food halls in malls'],
    activitySuggestions: ['Skyline viewing', 'Desert evening', 'Museum visit', 'Marina walk'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 17000, maxPrice: 38000, note: 'Frequent direct connections from India and major hubs.' },
      { mode: 'LOCAL', minPrice: 700, maxPrice: 2400, note: 'Metro is efficient, taxis add up quickly.' },
      { mode: 'SELF_DRIVE', minPrice: 3500, maxPrice: 9000, note: 'Useful for regional exploration, less critical in-city.' },
      { mode: 'PICKUP', minPrice: 1800, maxPrice: 4200, note: 'Popular for late-night arrivals.' },
      { mode: 'TRAIN', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
      { mode: 'BUS', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
    ],
    costTemplate: {
      transportPerTraveler: 23000,
      stayPerNight: 8500,
      foodPerTravelerPerDay: 2200,
      localTransportPerDay: 1200,
      activitiesPerTravelerPerDay: 2800,
      contingencyRate: 0.15,
    },
  },
  {
    id: 'dest_singapore',
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Southeast Asia',
    scope: 'INTERNATIONAL',
    summary:
      'Singapore is a safe, family-friendly city break with excellent transport and predictable planning, though not the cheapest option.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 12600,
    popularityScore: 88,
    convenienceScore: 96,
    safetyScore: 94,
    familyScore: 95,
    coupleScore: 81,
    bestMonths: [2, 3, 4, 7, 8, 9],
    bestTimeToVisit: 'February to April and July to September',
    recommendedDuration: { minDays: 4, maxDays: 6 },
    visaNote: 'Check current Singapore e-visa or visa-free eligibility rules for your passport.',
    safetyNote: 'Very safe and efficient. Budget pressure usually comes from hotels and attraction passes.',
    tags: ['CITY', 'FAMILY', 'LUXURY'],
    topAttractions: ['Gardens by the Bay', 'Sentosa', 'Marina Bay', 'Chinatown'],
    hotelAreas: ['Marina Bay', 'Bugis', 'Orchard', 'Clarke Quay'],
    foodSuggestions: ['Hawker centres', 'Kaya toast breakfast', 'Peranakan cuisine'],
    activitySuggestions: ['Skypark view', 'Night safari', 'Museum pass', 'Waterfront walk'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 22000, maxPrice: 42000, note: 'Most arrivals are direct or single-stop flights.' },
      { mode: 'LOCAL', minPrice: 600, maxPrice: 1800, note: 'MRT coverage keeps transit efficient.' },
      { mode: 'PICKUP', minPrice: 1900, maxPrice: 4300, note: 'Useful for family arrivals with luggage.' },
      { mode: 'SELF_DRIVE', minPrice: 0, maxPrice: 0, note: 'Not usually necessary for visitors.' },
      { mode: 'TRAIN', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
      { mode: 'BUS', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
    ],
    costTemplate: {
      transportPerTraveler: 26000,
      stayPerNight: 9200,
      foodPerTravelerPerDay: 1900,
      localTransportPerDay: 700,
      activitiesPerTravelerPerDay: 2500,
      contingencyRate: 0.12,
    },
  },
  {
    id: 'dest_paris',
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Ile-de-France',
    scope: 'INTERNATIONAL',
    summary:
      'Paris fits aspirational city and couple trips where experience value outweighs strict budget optimization.',
    currency: 'INR',
    heroImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    averageDailyBudget: 16800,
    popularityScore: 96,
    convenienceScore: 87,
    safetyScore: 80,
    familyScore: 78,
    coupleScore: 96,
    bestMonths: [4, 5, 6, 9, 10],
    bestTimeToVisit: 'April to June and September to October',
    recommendedDuration: { minDays: 5, maxDays: 7 },
    visaNote: 'Schengen visa requirements apply for many travelers. Processing lead time matters.',
    safetyNote: 'Watch for pickpocket hotspots in crowded tourist corridors and metro hubs.',
    tags: ['CITY', 'COUPLE', 'LUXURY'],
    topAttractions: ['Eiffel Tower', 'Louvre', 'Montmartre', 'Seine cruise'],
    hotelAreas: ['Le Marais', 'Saint-Germain', 'Opera', 'Latin Quarter'],
    foodSuggestions: ['Bistro dinners', 'Bakery breakfasts', 'Cafe culture in Saint-Germain'],
    activitySuggestions: ['Museum day', 'Seine walk', 'Neighborhood hopping', 'Sunset cruise'],
    travelOptions: [
      { mode: 'FLIGHT', minPrice: 42000, maxPrice: 78000, note: 'Long-haul pricing depends heavily on season and lead time.' },
      { mode: 'TRAIN', minPrice: 2000, maxPrice: 8000, note: 'Useful for onward Europe travel, not primary arrival.' },
      { mode: 'LOCAL', minPrice: 900, maxPrice: 2200, note: 'Metro makes city movement efficient.' },
      { mode: 'PICKUP', minPrice: 3200, maxPrice: 6800, note: 'Airport transfers save hassle for late arrivals.' },
      { mode: 'SELF_DRIVE', minPrice: 0, maxPrice: 0, note: 'Not recommended for central stay patterns.' },
      { mode: 'BUS', minPrice: 0, maxPrice: 0, note: 'Not applicable for arrival.' },
    ],
    costTemplate: {
      transportPerTraveler: 54000,
      stayPerNight: 13200,
      foodPerTravelerPerDay: 2600,
      localTransportPerDay: 1000,
      activitiesPerTravelerPerDay: 3200,
      contingencyRate: 0.16,
    },
  },
];

export const mockTravelMatches: TravelMatchPreview[] = [
  {
    id: 'match_1',
    displayName: 'Riya S.',
    destinationSlug: 'bali',
    destinationName: 'Bali',
    minBudget: 70000,
    maxBudget: 110000,
    travelMonth: 8,
    travelYear: 2026,
    note: 'Looking for a balanced Bali trip with one villa split and two island days.',
    matchingTags: ['BEACH', 'COUPLE', 'PARTY'],
    visibility: 'MATCHABLE',
  },
  {
    id: 'match_2',
    displayName: 'Aman K.',
    destinationSlug: 'rishikesh',
    destinationName: 'Rishikesh',
    minBudget: 12000,
    maxBudget: 22000,
    travelMonth: 10,
    travelYear: 2026,
    note: 'Prefer rafting plus yoga mornings. Open to a small mixed group.',
    matchingTags: ['SOLO', 'ADVENTURE', 'NATURE'],
    visibility: 'MATCHABLE',
  },
  {
    id: 'match_3',
    displayName: 'Nina & Dev',
    destinationSlug: 'phuket',
    destinationName: 'Phuket',
    minBudget: 85000,
    maxBudget: 130000,
    travelMonth: 12,
    travelYear: 2026,
    note: 'Couple planning island hopping and open to sharing private transfers.',
    matchingTags: ['BEACH', 'COUPLE', 'FAMILY'],
    visibility: 'PUBLIC',
  },
];

export const mockWishlist: WishlistEntryPreview[] = [
  {
    id: 'wish_1',
    destinationSlug: 'goa',
    destinationName: 'Goa',
    targetBudget: 38000,
    targetMonth: 12,
    targetYear: 2026,
    note: 'Year-end beach trip with friends.',
  },
  {
    id: 'wish_2',
    destinationSlug: 'singapore',
    destinationName: 'Singapore',
    targetBudget: 145000,
    targetMonth: 3,
    targetYear: 2027,
    note: 'Family trip with Sentosa and Gardens by the Bay.',
  },
];

export const adminOverviewMetrics: AdminOverviewMetrics = {
  totalUsers: 12480,
  activeTrips: 3180,
  monthlySavingsTracked: 8420000,
  openReports: 12,
  featuredDestinations: 8,
};

export function calculateSavingsPlan(input: SavingsPlanInput): SavingsPlanResult {
  const goalRemaining = Math.max(0, input.goalAmount - input.savedAmount);
  const targetDate = new Date(input.targetDate);
  const today = new Date();
  const months =
    Math.max(
      1,
      (targetDate.getFullYear() - today.getFullYear()) * 12 +
        (targetDate.getMonth() - today.getMonth()),
    ) || 1;
  const monthlySavingsNeeded = Math.ceil(goalRemaining / months);
  const progressPercent = Math.min(100, Math.round((input.savedAmount / input.goalAmount) * 100));

  const recommendations = [
    `You need to save approximately INR ${monthlySavingsNeeded.toLocaleString()} per month.`,
  ];

  if (monthlySavingsNeeded > input.goalAmount * 0.12) {
    recommendations.push('Consider extending the trip date by 2 months to reduce pressure.');
  }

  if (monthlySavingsNeeded > 25000) {
    recommendations.push('Try moving to a mid-range hotel area or reducing premium activities.');
  }

  return {
    monthlySavingsNeeded,
    remainingMonths: months,
    progressPercent,
    recommendations,
  };
}

export function generateItinerary(
  input: ItineraryGenerationRequest,
  destination = mockDestinations.find((item) => item.slug === input.destinationSlug),
): ItineraryDayPlan[] {
  if (!destination) {
    return [];
  }

  const attractionPool = [...destination.topAttractions, ...destination.activitySuggestions];
  const visitsPerDay = input.pace === 'RELAXED' ? 2 : input.pace === 'BALANCED' ? 3 : 4;

  return Array.from({ length: input.durationDays }, (_, index) => {
    const day = index + 1;
    const start = (index * visitsPerDay) % attractionPool.length;
    const visits = Array.from(
      { length: visitsPerDay },
      (_, offset) => attractionPool[(start + offset) % attractionPool.length],
    ).filter((item): item is string => Boolean(item));

    return {
      day,
      title: `Day ${day} in ${destination.name}`,
      summary:
        input.pace === 'RELAXED'
          ? 'Keep transitions light and preserve downtime.'
          : input.pace === 'BALANCED'
            ? 'Blend major highlights with one slower block.'
            : 'Pack the day with core highlights and optional evening activity.',
      localTravelMinutes: input.pace === 'RELAXED' ? 50 : input.pace === 'BALANCED' ? 85 : 120,
      hotelArea: destination.hotelAreas[index % destination.hotelAreas.length] ?? destination.hotelAreas[0] ?? 'Central stay',
      meals: [
        `Breakfast near ${destination.hotelAreas[0]}`,
        destination.foodSuggestions[index % destination.foodSuggestions.length] ?? destination.foodSuggestions[0] ?? 'Local meal',
        destination.foodSuggestions[(index + 1) % destination.foodSuggestions.length] ??
          destination.foodSuggestions[0] ??
          'Dinner in a popular district',
      ],
      activities: [
        destination.activitySuggestions[index % destination.activitySuggestions.length] ?? destination.activitySuggestions[0] ?? 'Local exploration',
        input.pace === 'PACKED' ? 'Optional evening stroll or market visit' : 'Early evening downtime',
      ],
      visits,
    };
  });
}

function scoreBudgetFit(totalBudget: number, estimatedTotalCost: number): number {
  if (estimatedTotalCost <= totalBudget) {
    return Math.max(72, 100 - Math.round(((totalBudget - estimatedTotalCost) / totalBudget) * 28));
  }

  const overshootPercent = (estimatedTotalCost - totalBudget) / totalBudget;
  return Math.max(20, 74 - Math.round(overshootPercent * 100));
}

function scoreWeather(bestMonths: MonthNumber[], preferredMonth: MonthNumber): number {
  if (bestMonths.includes(preferredMonth)) {
    return 96;
  }

  const nearestDistance = Math.min(...bestMonths.map((month) => Math.abs(month - preferredMonth)));
  return Math.max(54, 88 - nearestDistance * 8);
}

function buildCostBreakup(
  destination: DestinationRecord,
  travelers: number,
  tripDurationDays: number,
): DiscoverySuggestion['costBreakup'] {
  const nights = Math.max(1, tripDurationDays - 1);
  const transport = destination.costTemplate.transportPerTraveler * travelers;
  const stay = destination.costTemplate.stayPerNight * nights;
  const food = destination.costTemplate.foodPerTravelerPerDay * tripDurationDays * travelers;
  const localTransport = destination.costTemplate.localTransportPerDay * tripDurationDays;
  const activities = destination.costTemplate.activitiesPerTravelerPerDay * tripDurationDays * travelers;
  const subtotal = transport + stay + food + localTransport + activities;
  const contingency = Math.round(subtotal * destination.costTemplate.contingencyRate);

  return {
    transport,
    stay,
    food,
    localTransport,
    activities,
    contingency,
  };
}

export function rankDestinations(request: DiscoveryRequest): DiscoverySuggestion[] {
  return mockDestinations
    .filter((destination) => destination.scope === request.scope)
    .filter((destination) =>
      request.placeTypes.length === 0
        ? true
        : request.placeTypes.some((placeType) => destination.tags.includes(placeType)),
    )
    .map((destination) => {
      const costBreakup = buildCostBreakup(destination, request.travelers, request.tripDurationDays);
      const estimatedTotalCost = Object.values(costBreakup).reduce((sum, value) => sum + value, 0);
      const budgetFit = scoreBudgetFit(request.totalBudget, estimatedTotalCost);
      const convenience = destination.convenienceScore;
      const popularity = destination.popularityScore;
      const weatherSuitability = scoreWeather(destination.bestMonths, request.preferredMonth);
      const valueForMoney = Math.max(
        45,
        Math.round((destination.popularityScore + 11000 / destination.averageDailyBudget) * 0.62),
      );

      const whyItMatches = [
        `${destination.name} fits ${request.placeTypes.map((item) => item.toLowerCase()).join(', ')} travel intent.`,
        `Typical total trip cost stays around INR ${estimatedTotalCost.toLocaleString()} for ${request.travelers} traveler(s).`,
        `Best months include ${destination.bestMonths.slice(0, 3).map((month) => monthNames[month]).join(', ')}.`,
      ];

      const totalScore = Math.round(
        budgetFit * 0.34 +
          convenience * 0.18 +
          popularity * 0.16 +
          weatherSuitability * 0.16 +
          valueForMoney * 0.16,
      );

      return {
        destination,
        estimatedTotalCost,
        costBreakup,
        scoreBreakdown: {
          budgetFit,
          convenience,
          popularity,
          weatherSuitability,
          valueForMoney,
        },
        totalScore,
        whyItMatches,
      };
    })
    .sort((left, right) => right.totalScore - left.totalScore)
    .slice(0, 6);
}

export const monthNames: Record<MonthNumber, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
