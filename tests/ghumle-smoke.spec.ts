import { expect, request as playwrightRequest, test } from '@playwright/test';

const configuredApiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000/api/v1';
const apiBaseUrl = configuredApiBaseUrl.endsWith('/')
  ? configuredApiBaseUrl
  : `${configuredApiBaseUrl}/`;
const webBaseUrl = process.env.WEB_BASE_URL ?? 'http://localhost:3000';

function expectNoSecretFields(payload: unknown) {
  const serialized = JSON.stringify(payload);
  expect(serialized).not.toContain('passwordHash');
  expect(serialized).not.toContain('refreshTokenHash');
}

async function expectOk(response: Awaited<ReturnType<import('@playwright/test').APIRequestContext['get']>>) {
  expect(response.ok(), `${response.url()} -> ${response.status()}`).toBeTruthy();
}

test.describe.serial('Ghumle phase 1 smoke coverage', () => {
  test.setTimeout(120_000);

  test('API modules support public, authenticated, and admin flows', async () => {
    const api = await playwrightRequest.newContext({
      baseURL: apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    const healthResponse = await api.get('health');
    await expectOk(healthResponse);
    const health = await healthResponse.json();
    expect(health.status).toBe('healthy');
    expect(health.checks.database).toBe('ok');

    const destinationsResponse = await api.get('destinations');
    await expectOk(destinationsResponse);
    const destinations = await destinationsResponse.json();
    expect(destinations.length).toBeGreaterThan(3);

    await expectOk(await api.get('destinations/goa'));

    const discoveryResponse = await api.post('discovery/search', {
      data: {
        totalBudget: 90000,
        scope: 'INTERNATIONAL',
        travelers: 2,
        placeTypes: ['BEACH', 'COUPLE'],
        tripDurationDays: 6,
        preferredMonth: 12,
      },
    });
    await expectOk(discoveryResponse);
    expect((await discoveryResponse.json()).length).toBeGreaterThan(0);

    const itineraryPreviewResponse = await api.post('itineraries/generate', {
      data: {
        destinationSlug: 'bali',
        durationDays: 5,
        travelers: 2,
        pace: 'BALANCED',
      },
    });
    await expectOk(itineraryPreviewResponse);
    expect((await itineraryPreviewResponse.json()).days.length).toBe(5);

    await expectOk(await api.get('travel-options/goa'));
    await expectOk(await api.get('matches/suggestions'));

    const adminLoginResponse = await api.post('auth/login', {
      data: {
        email: 'admin@ghumle.app',
        password: 'Password@123',
      },
    });
    await expectOk(adminLoginResponse);
    const adminLogin = await adminLoginResponse.json();
    expectNoSecretFields(adminLogin);
    const adminHeaders = {
      Authorization: `Bearer ${adminLogin.tokens.accessToken}`,
    };

    const demoLoginResponse = await api.post('auth/login', {
      data: {
        email: 'traveler@ghumle.app',
        password: 'Password@123',
      },
    });
    await expectOk(demoLoginResponse);
    const demoLogin = await demoLoginResponse.json();
    expectNoSecretFields(demoLogin);

    const email = `smoke-${Date.now()}@ghumle.app`;
    const registerResponse = await api.post('auth/register', {
      data: {
        fullName: 'Smoke Test Traveler',
        email,
        password: 'Password@123',
      },
    });
    await expectOk(registerResponse);
    const registered = await registerResponse.json();
    expectNoSecretFields(registered);
    expect(registered.user.email).toBe(email);

    const loginResponse = await api.post('auth/login', {
      data: {
        email,
        password: 'Password@123',
      },
    });
    await expectOk(loginResponse);
    const login = await loginResponse.json();
    expectNoSecretFields(login);

    const userHeaders = {
      Authorization: `Bearer ${login.tokens.accessToken}`,
    };

    const authMeResponse = await api.get('auth/me', { headers: userHeaders });
    await expectOk(authMeResponse);
    expectNoSecretFields(await authMeResponse.json());

    await expectOk(
      await api.patch('users/me', {
        headers: userHeaders,
        data: {
          fullName: 'Smoke Test Traveler Updated',
          countryCode: 'IN',
          timezone: 'Asia/Kolkata',
          baseCurrency: 'INR',
          preferredTravelStyles: ['BEACH', 'COUPLE'],
          isTravelPartnerVisible: true,
          bio: 'Smoke test profile update.',
        },
      }),
    );
    await expectOk(await api.get('users/me', { headers: userHeaders }));

    const wishlistCreateResponse = await api.post('wishlist', {
      headers: userHeaders,
      data: {
        destinationSlug: 'goa',
        targetBudget: 65000,
        targetMonth: 12,
        targetYear: 2026,
        note: 'Smoke test wishlist item.',
      },
    });
    await expectOk(wishlistCreateResponse);
    const wishlistItem = await wishlistCreateResponse.json();
    await expectOk(
      await api.patch(`wishlist/${wishlistItem.id}`, {
        headers: userHeaders,
        data: {
          targetBudget: 70000,
          note: 'Smoke test wishlist item updated.',
        },
      }),
    );
    await expectOk(await api.get('wishlist', { headers: userHeaders }));
    await expectOk(await api.delete(`wishlist/${wishlistItem.id}`, { headers: userHeaders }));

    const savedItineraryResponse = await api.post('itineraries/save', {
      headers: userHeaders,
      data: {
        title: 'Smoke Bali Plan',
        destinationSlug: 'bali',
        durationDays: 4,
        travelers: 2,
        pace: 'BALANCED',
        totalBudget: 120000,
        travelMonth: 8,
        travelYear: 2026,
        notes: 'Smoke test itinerary save.',
      },
    });
    await expectOk(savedItineraryResponse);
    const savedItinerary = await savedItineraryResponse.json();
    await expectOk(await api.get('itineraries/my', { headers: userHeaders }));
    await expectOk(await api.get(`itineraries/${savedItinerary.id}`, { headers: userHeaders }));
    await expectOk(
      await api.patch(`itineraries/${savedItinerary.id}`, {
        headers: userHeaders,
        data: {
          title: 'Smoke Bali Plan Updated',
          pace: 'PACKED',
        },
      }),
    );
    await expectOk(await api.post(`itineraries/${savedItinerary.id}/duplicate`, { headers: userHeaders }));
    await expectOk(
      await api.patch(`itineraries/${savedItinerary.id}/days/1/regenerate`, {
        headers: userHeaders,
      }),
    );

    const savingsGoalResponse = await api.post('savings-goals', {
      headers: userHeaders,
      data: {
        title: 'Smoke savings goal',
        goalAmount: 150000,
        savedAmount: 25000,
        targetDate: '2027-03-01T00:00:00.000Z',
      },
    });
    await expectOk(savingsGoalResponse);
    const savingsGoal = await savingsGoalResponse.json();
    await expectOk(await api.get('savings-goals', { headers: userHeaders }));
    await expectOk(
      await api.post(`savings-goals/${savingsGoal.id}/deposits`, {
        headers: userHeaders,
        data: {
          amount: 5000,
          note: 'Smoke deposit.',
        },
      }),
    );

    await expectOk(await api.get('matches/profile', { headers: userHeaders }));
    await expectOk(
      await api.post('matches/profile', {
        headers: userHeaders,
        data: {
          visibility: 'MATCHABLE',
          lookingForPartner: true,
          destinationSlugs: ['goa'],
          minBudget: 50000,
          maxBudget: 90000,
          tripMonth: 12,
          tripYear: 2026,
          preferredTags: ['BEACH', 'COUPLE'],
          about: 'Smoke test travel match profile.',
          safetyAgreementAccepted: true,
        },
      }),
    );
    await expectOk(await api.get('matches/requests', { headers: userHeaders }));
    await expectOk(
      await api.post('matches/requests', {
        headers: userHeaders,
        data: {
          recipientId: demoLogin.user.id,
          destinationSlug: 'goa',
          message: 'Smoke test connection request.',
        },
      }),
    );

    await expectOk(await api.get('admin/overview', { headers: adminHeaders }));
    await expectOk(await api.get('admin/reports', { headers: adminHeaders }));
    await expectOk(await api.get('admin/faqs', { headers: adminHeaders }));

    await api.dispose();
  });

  test('web pages load and critical UI flows work', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        pageErrors.push(message.text());
      }
    });

    const routes = [
      '/',
      '/explore',
      '/search/budget',
      '/destinations/goa',
      '/planner',
      '/my-trips',
      '/wishlist',
      '/savings',
      '/partners',
      '/profile',
      '/login',
      '/signup',
      '/admin',
    ];

    for (const route of routes) {
      const response = await page.goto(`${webBaseUrl}${route}`, { waitUntil: 'networkidle' });
      expect(response?.status(), route).toBeLessThan(400);
      await expect(page.getByText('Ghumle').first()).toBeVisible();
    }

    await page.goto(`${webBaseUrl}/search/budget`, { waitUntil: 'networkidle' });
    await page.getByLabel('Total budget').fill('85000');
    await page.getByLabel('Scope').selectOption('INTERNATIONAL');
    await page.getByLabel('Type of place').selectOption('CITY');
    await page.getByRole('button', { name: 'Find trips' }).click();
    await expect(page.getByText('Estimated total').first()).toBeVisible();

    await page.goto(`${webBaseUrl}/planner`, { waitUntil: 'networkidle' });
    await page.getByLabel('Destination').selectOption('goa');
    await page.getByLabel('Pace').selectOption('PACKED');
    await page.getByRole('button', { name: 'Generate itinerary' }).click();
    await expect(page.getByText('Day 1').first()).toBeVisible();

    await page.goto(`${webBaseUrl}/savings`, { waitUntil: 'networkidle' });
    await page.getByLabel('Trip goal amount').fill('175000');
    await page.getByLabel('Saved amount').fill('35000');
    await page.getByRole('button', { name: 'Recalculate' }).click();
    await expect(page.getByText('Monthly savings needed')).toBeVisible();

    await page.goto(`${webBaseUrl}/login`, { waitUntil: 'networkidle' });
    await page.getByLabel('Email').fill('traveler@ghumle.app');
    await page.getByLabel('Password').fill('Password@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/profile');
    await expect(page.getByRole('button', { name: 'Continue planning' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Continue planning' }).first().click();
    await page.waitForURL('**/planner');
    await page.goto(`${webBaseUrl}/profile`, { waitUntil: 'networkidle' });
    await expect(page.getByText('Demo Traveler', { exact: true })).toBeVisible();
    const loggedInEmail = await page.evaluate(() => {
      const session = window.localStorage.getItem('ghumle.auth');
      return session ? JSON.parse(session).user.email : null;
    });
    expect(loggedInEmail).toBe('traveler@ghumle.app');

    await page.goto(`${webBaseUrl}/signup`, { waitUntil: 'networkidle' });
    await page.waitForURL('**/planner');
    await page.getByRole('button', { name: 'Logout' }).first().click();
    await page.waitForURL('**/login');

    const signupEmail = `ui-smoke-${Date.now()}@ghumle.app`;
    await page.goto(`${webBaseUrl}/signup`, { waitUntil: 'networkidle' });
    await page.getByLabel('Full name').fill('UI Smoke Traveler');
    await page.getByLabel('Email').fill(signupEmail);
    await page.getByLabel('Password').fill('Password@123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.waitForURL('**/profile');
    const signedUpEmail = await page.evaluate(() => {
      const session = window.localStorage.getItem('ghumle.auth');
      return session ? JSON.parse(session).user.email : null;
    });
    expect(signedUpEmail).toBe(signupEmail);

    expect(pageErrors).toEqual([]);
  });
});
