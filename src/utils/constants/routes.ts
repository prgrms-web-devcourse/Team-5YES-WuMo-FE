const ROUTES = {
  MAIN: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  NOTICE: '/notice',
  SCHEDULE: '/schedule',
  SCHEDULE_COMMENT: '/schedule-comment',
  PLAN: '/plan',
  ALBUM: '/album',
  LIKE: '/like',
  PARTY_CREATE: '/party/new',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PLACE_NEW: '/place/new',
  PLACE_DETAIL: '/place/:id',
  PARTY_LIST: '/party-list',
  BEST_ROUTE_LIST: '/best-route-list',
  BEST_ROUTE_DETAIL: '/best-route-detail',
  LANDING: '/landing',
} as const;

export default ROUTES;
