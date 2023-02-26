import {
  MdAddCircle,
  MdAddCircleOutline,
  MdFavorite,
  MdFavoriteBorder,
  MdHome,
  MdOutlineHome,
  MdPeople,
  MdPeopleOutline,
  MdPerson,
  MdPersonOutline,
} from 'react-icons/md';

import { navigationItem } from '@/types/navigationItem';

import ROUTES from './routes';

export const NAVIGATION_ITEM: navigationItem[] = [
  {
    id: '1',
    name: '홈',
    icon: MdOutlineHome,
    activeIcon: MdHome,
    link: ROUTES.MAIN,
  },
  {
    id: '2',
    name: '관심목록',
    icon: MdFavoriteBorder,
    activeIcon: MdFavorite,
    link: ROUTES.LIKE,
  },
  {
    id: '3',
    name: '파티 생성',
    icon: MdAddCircleOutline,
    activeIcon: MdAddCircle,
    link: ROUTES.PARTY_CREATE,
  },
  {
    id: '4',
    name: '내 모임',
    icon: MdPeopleOutline,
    activeIcon: MdPeople,
    link: ROUTES.NOTICE,
  },
  {
    id: '5',
    name: '내 정보',
    icon: MdPersonOutline,
    activeIcon: MdPerson,
    link: ROUTES.MY_INFO,
  },
];
