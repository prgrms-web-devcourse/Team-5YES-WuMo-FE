import { atom } from 'recoil';

import { BestRouteListSortSearchProps, RouteList } from '@/types/routeList';

export const bestRouteListSortSearchState = atom<BestRouteListSortSearchProps>({
  key: 'bestRouteListSortSearchState',
  default: {
    cursorId: 1,
    pageSize: 5,
    sortType: 'NEWEST',
    searchWord: '',
  },
});

export const searchResultList = atom<RouteList>({
  key: 'searchResultList',
  default: {
    routes: [],
    lastId: 0,
  },
});
