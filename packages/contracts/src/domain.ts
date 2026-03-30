import { z } from 'zod';

export const destinationTagValues = [
  'BEACH',
  'MOUNTAINS',
  'NATURE',
  'ADVENTURE',
  'RELIGIOUS',
  'CITY',
  'LUXURY',
  'FAMILY',
  'COUPLE',
  'SOLO',
  'PARTY',
] as const;

export const tripScopeValues = ['DOMESTIC', 'INTERNATIONAL'] as const;
export const itineraryPaceValues = ['RELAXED', 'BALANCED', 'PACKED'] as const;
export const visibilityValues = ['PRIVATE', 'MATCHABLE', 'PUBLIC'] as const;
export const matchStatusValues = ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'] as const;

export type DestinationTag = (typeof destinationTagValues)[number];
export type TripScope = (typeof tripScopeValues)[number];
export type ItineraryPace = (typeof itineraryPaceValues)[number];
export type Visibility = (typeof visibilityValues)[number];
export type MatchStatus = (typeof matchStatusValues)[number];

export type MonthNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export const monthLabels: Record<MonthNumber, string> = {
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

export interface DestinationCostTemplate {
  transportPerTraveler: number;
  stayPerNight: number;
  foodPerTravelerPerDay: number;
  localTransportPerDay: number;
  activitiesPerTravelerPerDay: number;
  contingencyRate: number;
}

export interface TransportOption {
  mode: 'FLIGHT' | 'TRAIN' | 'BUS' | 'LOCAL' | 'SELF_DRIVE' | 'PICKUP';
  minPrice: number;
  maxPrice: number;
  note: string;
}

export interface DestinationRecord {
  id: string;
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  scope: TripScope;
  summary: string;
  currency: string;
  heroImage: string;
  averageDailyBudget: number;
  popularityScore: number;
  convenienceScore: number;
  safetyScore: number;
  familyScore: number;
  coupleScore: number;
  bestMonths: MonthNumber[];
  bestTimeToVisit: string;
  recommendedDuration: {
    minDays: number;
    maxDays: number;
  };
  visaNote: string;
  safetyNote: string;
  tags: DestinationTag[];
  topAttractions: string[];
  hotelAreas: string[];
  foodSuggestions: string[];
  activitySuggestions: string[];
  travelOptions: TransportOption[];
  costTemplate: DestinationCostTemplate;
}

export interface DiscoveryRequest {
  totalBudget: number;
  scope: TripScope;
  countryCode?: string;
  worldwide?: boolean;
  travelers: number;
  placeTypes: DestinationTag[];
  tripDurationDays: number;
  preferredMonth: MonthNumber;
}

export interface DiscoverySuggestion {
  destination: DestinationRecord;
  estimatedTotalCost: number;
  costBreakup: {
    transport: number;
    stay: number;
    food: number;
    localTransport: number;
    activities: number;
    contingency: number;
  };
  scoreBreakdown: {
    budgetFit: number;
    convenience: number;
    popularity: number;
    weatherSuitability: number;
    valueForMoney: number;
  };
  totalScore: number;
  whyItMatches: string[];
}

export interface ItineraryGenerationRequest {
  destinationSlug: string;
  durationDays: number;
  travelers: number;
  pace: ItineraryPace;
}

export interface ItineraryDayPlan {
  day: number;
  title: string;
  summary: string;
  localTravelMinutes: number;
  hotelArea: string;
  meals: string[];
  activities: string[];
  visits: string[];
}

export interface SavingsPlanInput {
  goalAmount: number;
  savedAmount: number;
  targetDate: string;
}

export interface SavingsPlanResult {
  monthlySavingsNeeded: number;
  remainingMonths: number;
  progressPercent: number;
  recommendations: string[];
}

export interface TravelMatchPreview {
  id: string;
  displayName: string;
  destinationSlug: string;
  destinationName: string;
  minBudget: number;
  maxBudget: number;
  travelMonth: MonthNumber;
  travelYear: number;
  note: string;
  matchingTags: DestinationTag[];
  visibility: Visibility;
}

export interface WishlistEntryPreview {
  id: string;
  destinationSlug: string;
  destinationName: string;
  targetBudget: number;
  targetMonth: MonthNumber;
  targetYear: number;
  note: string;
}

export interface AdminOverviewMetrics {
  totalUsers: number;
  activeTrips: number;
  monthlySavingsTracked: number;
  openReports: number;
  featuredDestinations: number;
}

export const discoveryRequestSchema = z.object({
  totalBudget: z.number().positive(),
  scope: z.enum(tripScopeValues),
  countryCode: z.string().optional(),
  worldwide: z.boolean().optional(),
  travelers: z.number().int().min(1).max(12),
  placeTypes: z.array(z.enum(destinationTagValues)).min(1),
  tripDurationDays: z.number().int().min(1).max(21),
  preferredMonth: z.number().int().min(1).max(12),
});

export const itineraryGenerationSchema = z.object({
  destinationSlug: z.string().min(2),
  durationDays: z.number().int().min(1).max(14),
  travelers: z.number().int().min(1).max(12),
  pace: z.enum(itineraryPaceValues),
});

export const savingsPlanSchema = z.object({
  goalAmount: z.number().positive(),
  savedAmount: z.number().min(0),
  targetDate: z.string().datetime(),
});
