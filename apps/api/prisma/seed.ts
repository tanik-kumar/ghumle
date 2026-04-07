import { config as loadEnv } from 'dotenv';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, TripStatus, Visibility } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

import {
  adminOverviewMetrics,
  calculateSavingsPlan,
  destinationCategories,
  generateItinerary,
  mockDestinations,
  mockTravelMatches,
  mockWishlist,
} from '@ghumle/contracts';

loadEnv({ path: '../../.env', quiet: true });
loadEnv({ quiet: true });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgresql://ghumle:ghumle@localhost:5432/ghumle',
});
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.reportAbuse.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.matchRequest.deleteMany();
  await prisma.travelMatchProfile.deleteMany();
  await prisma.savingsDeposit.deleteMany();
  await prisma.savingsGoal.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.tripPlan.deleteMany();
  await prisma.budgetPreference.deleteMany();
  await prisma.review.deleteMany();
  await prisma.priceEstimate.deleteMany();
  await prisma.destinationCategoryLink.deleteMany();
  await prisma.destinationCategory.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  const categoryMap = new Map<string, { id: string; slug: string }>();

  for (const category of destinationCategories) {
    const created = await prisma.destinationCategory.create({
      data: {
        slug: category.slug,
        name: category.name,
      },
    });
    categoryMap.set(category.name.toUpperCase(), created);
  }

  for (const destination of mockDestinations) {
    const createdDestination = await prisma.destination.create({
      data: {
        slug: destination.slug,
        name: destination.name,
        country: destination.country,
        countryCode: destination.countryCode,
        region: destination.region,
        summary: destination.summary,
        heroImage: destination.heroImage,
        currency: destination.currency,
        averageDailyBudget: destination.averageDailyBudget,
        popularityScore: destination.popularityScore,
        convenienceScore: destination.convenienceScore,
        safetyScore: destination.safetyScore,
        familyScore: destination.familyScore,
        coupleScore: destination.coupleScore,
        bestMonths: destination.bestMonths,
        bestTimeToVisit: destination.bestTimeToVisit,
        recommendedDurationMin: destination.recommendedDuration.minDays,
        recommendedDurationMax: destination.recommendedDuration.maxDays,
        visaNote: destination.visaNote,
        safetyNote: destination.safetyNote,
        tags: destination.tags,
        topAttractions: destination.topAttractions,
        hotelAreas: destination.hotelAreas,
        foodSuggestions: destination.foodSuggestions,
        activitySuggestions: destination.activitySuggestions,
        scope: destination.scope,
        priceEstimates: {
          create: destination.travelOptions.map((option) => ({
            mode: option.mode,
            minPrice: option.minPrice,
            maxPrice: option.maxPrice,
            note: option.note,
          })),
        },
      },
    });

    await prisma.destinationCategoryLink.createMany({
      data: destination.tags
        .map((tag) => categoryMap.get(tag))
        .filter((item): item is { id: string; slug: string } => Boolean(item))
        .map((category) => ({
          destinationId: createdDestination.id,
          categoryId: category.id,
        })),
    });
  }

  const passwordHash = await bcrypt.hash('Password@123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@ghumle.app',
      passwordHash,
      role: Role.ADMIN,
      profile: {
        create: {
          fullName: 'Ghumle Admin',
          countryCode: 'IN',
          preferredTravelStyles: ['CITY', 'LUXURY'],
          privacyLevel: Visibility.PRIVATE,
        },
      },
      adminUser: {
        create: {
          permissions: ['destinations.manage', 'reports.manage', 'analytics.view'],
        },
      },
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      email: 'traveler@ghumle.app',
      passwordHash,
      role: Role.USER,
      profile: {
        create: {
          fullName: 'Demo Traveler',
          countryCode: 'IN',
          timezone: 'Asia/Kolkata',
          preferredTravelStyles: ['BEACH', 'COUPLE', 'FAMILY'],
          privacyLevel: Visibility.MATCHABLE,
          isTravelPartnerVisible: true,
          bio: 'Planning one domestic and one international trip each year.',
        },
      },
    },
  });

  const goa = await prisma.destination.findUniqueOrThrow({ where: { slug: 'goa' } });
  const bali = await prisma.destination.findUniqueOrThrow({ where: { slug: 'bali' } });

  const tripPlan = await prisma.tripPlan.create({
    data: {
      userId: demoUser.id,
      destinationId: bali.id,
      title: 'Bali August Escape',
      status: TripStatus.SAVED,
      totalBudget: 110000,
      totalEstimatedCost: 102000,
      travelers: 2,
      travelMonth: 8,
      travelYear: 2026,
      coverImage: bali.heroImage,
      notes: 'Focus on Ubud + Seminyak, one villa stay, one island day trip.',
      budgetPreference: {
        create: {
          userId: demoUser.id,
          totalBudget: 110000,
          travelers: 2,
          durationDays: 6,
          preferredMonth: 8,
          scope: bali.scope,
          countryCode: bali.countryCode,
          placeTypes: ['BEACH', 'COUPLE', 'LUXURY'],
        },
      },
    },
  });

  const itineraryDays = generateItinerary({
    destinationSlug: 'bali',
    durationDays: 6,
    travelers: 2,
    pace: 'BALANCED',
  });

  await prisma.itinerary.create({
    data: {
      tripPlanId: tripPlan.id,
      pace: 'BALANCED',
      hotelArea: 'Seminyak',
      summary: 'A balanced Bali trip with two stay zones and island buffer time.',
      days: {
        create: itineraryDays.map((day) => ({
          dayNumber: day.day,
          title: day.title,
          summary: day.summary,
          localTravelMinutes: day.localTravelMinutes,
          hotelArea: day.hotelArea,
          places: day.visits,
          meals: day.meals,
          activities: day.activities,
        })),
      },
    },
  });

  for (const entry of mockWishlist) {
    const destination = await prisma.destination.findUnique({
      where: { slug: entry.destinationSlug },
    });

    if (!destination) {
      continue;
    }

    await prisma.wishlistItem.create({
      data: {
        userId: demoUser.id,
        destinationId: destination.id,
        targetBudget: entry.targetBudget,
        targetMonth: entry.targetMonth,
        targetYear: entry.targetYear,
        note: entry.note,
      },
    });
  }

  const savings = calculateSavingsPlan({
    goalAmount: 145000,
    savedAmount: 42000,
    targetDate: '2027-03-01T00:00:00.000Z',
  });

  const goal = await prisma.savingsGoal.create({
    data: {
      userId: demoUser.id,
      tripPlanId: tripPlan.id,
      title: 'Singapore family trip fund',
      goalAmount: 145000,
      savedAmount: 42000,
      targetDate: new Date('2027-03-01T00:00:00.000Z'),
      monthlyTarget: savings.monthlySavingsNeeded,
      recommendation: savings.recommendations,
    },
  });

  await prisma.savingsDeposit.createMany({
    data: [
      { goalId: goal.id, amount: 18000, depositDate: new Date('2026-12-01T00:00:00.000Z'), note: 'Initial fund' },
      { goalId: goal.id, amount: 12000, depositDate: new Date('2027-01-01T00:00:00.000Z'), note: 'Bonus deposit' },
      { goalId: goal.id, amount: 12000, depositDate: new Date('2027-02-01T00:00:00.000Z'), note: 'Monthly transfer' },
    ],
  });

  for (const preview of mockTravelMatches) {
    const matchUser = await prisma.user.create({
      data: {
        email: `${preview.id}@ghumle.app`,
        passwordHash,
        profile: {
          create: {
            fullName: preview.displayName,
            countryCode: 'IN',
            preferredTravelStyles: preview.matchingTags,
            privacyLevel: preview.visibility,
            isTravelPartnerVisible: true,
          },
        },
      },
    });

    await prisma.travelMatchProfile.create({
      data: {
        userId: matchUser.id,
        visibility: preview.visibility,
        lookingForPartner: true,
        destinationIds: [preview.destinationSlug],
        minBudget: preview.minBudget,
        maxBudget: preview.maxBudget,
        tripMonth: preview.travelMonth,
        tripYear: preview.travelYear,
        preferredTags: preview.matchingTags,
        about: preview.note,
        safetyAgreementAccepted: true,
      },
    });
  }

  await prisma.notification.create({
    data: {
      userId: demoUser.id,
      type: 'SYSTEM',
      title: 'Seed completed',
      message: `Admin baseline users: ${adminOverviewMetrics.totalUsers} simulated in analytics references.`,
    },
  });

  await prisma.auditLog.createMany({
    data: [
      {
        userId: adminUser.id,
        action: 'seed.admin.created',
        entityType: 'User',
        entityId: adminUser.id,
      },
      {
        userId: demoUser.id,
        action: 'seed.demo-profile.created',
        entityType: 'User',
        entityId: demoUser.id,
      },
      {
        userId: demoUser.id,
        action: 'seed.trip-plan.created',
        entityType: 'TripPlan',
        entityId: tripPlan.id,
      },
    ],
  });

  console.log('Seeded Ghumle demo data successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
