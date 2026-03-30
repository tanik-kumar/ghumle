export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  profile: {
    me: '/users/me',
  },
  destinations: {
    list: '/destinations',
    detail: (slug: string) => `/destinations/${slug}`,
  },
  discovery: {
    search: '/discovery/search',
  },
  itineraries: {
    generate: '/itineraries/generate',
    detail: (id: string) => `/itineraries/${id}`,
    duplicate: (id: string) => `/itineraries/${id}/duplicate`,
    regenerateDay: (id: string, dayId: string) => `/itineraries/${id}/days/${dayId}/regenerate`,
  },
  travelOptions: {
    byDestination: (destinationId: string) => `/travel-options/${destinationId}`,
  },
  wishlist: {
    list: '/wishlist',
    detail: (id: string) => `/wishlist/${id}`,
  },
  savings: {
    list: '/savings-goals',
    detail: (id: string) => `/savings-goals/${id}`,
    deposits: (id: string) => `/savings-goals/${id}/deposits`,
  },
  matching: {
    suggestions: '/matches/suggestions',
    profile: '/matches/profile',
    requests: '/matches/requests',
  },
  admin: {
    overview: '/admin/overview',
    destinations: '/admin/destinations',
    reports: '/admin/reports',
  },
} as const;
