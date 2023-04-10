import { atom } from 'recoil';

import { BestRouteListParamsType } from '@/types/routeList';

export const recoilBestRouteListParams = atom<BestRouteListParamsType>({
  key: 'recoilBestRouteListParams',
  default: {
    cursorId: 1,
    pageSize: 3,
    sortType: 'NEWEST',
    searchWord: '',
  },
});

export const likeRouteListSortSearchState = atom<BestRouteListParamsType>({
  key: 'likeRouteListSortSearchState',
  default: {
    cursorId: 1,
    pageSize: 1000,
    sortType: 'NEWEST',
    searchWord: '',
  },
});
