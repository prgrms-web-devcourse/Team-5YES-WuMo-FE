import {
  MdCalendarToday,
  MdCreditCard,
  MdLocationPin,
  MdOutlineComment,
} from 'react-icons/md';

import { Category, Comment, Place, PlaceInformationStepItem } from '@/types/place';

export const description = [
  {
    subtitle: '가게명',
    example: '스타벅스, 맥도날드',
  },
  {
    subtitle: '장소명',
    example: '강남역, 양재역',
  },
  {
    subtitle: '주소지',
    example: '강남대로 100길',
  },
];

export const selectedCategoryStyle = {
  color: 'primary.red',
  fontWeight: 'bold',
  backgroundColor: 'gray.100',
  boxShadow: '0 0 0 2px #ea5148 inset',
};

export const categoryInfo: Category = {
  MEAL: {
    text: '식사',
    imageID: '1f35a',
  },
  COFFEE: {
    text: '커피',
    imageID: '2615',
  },
  DRINKING: {
    text: '술',
    imageID: '1f37b',
  },
  GAME: {
    text: '게임',
    imageID: '1f3ae',
  },
  WALKING: {
    text: '산책',
    imageID: '1f6b6',
  },
  SIGHTSEEING: {
    text: '구경',
    imageID: '1f440',
  },
  CULTURE: {
    text: '문화',
    imageID: '1f3a8',
  },
  NATURE: {
    text: '자연',
    imageID: '1f3d5',
  },
  SPORTS: {
    text: '스포츠',
    imageID: '26bd',
  },
};

export const PlaceInfoItems: PlaceInformationStepItem[] = [
  {
    type: 'address',
    icon: <MdLocationPin />,
    text: '주소',
  },
  {
    type: 'visitDate',
    icon: <MdCalendarToday />,
    text: '일정',
  },
  {
    type: 'expectedCost',
    icon: <MdCreditCard />,
    text: '예상 비용',
  },
  {
    type: 'description',
    icon: <MdOutlineComment />,
    text: '메모',
  },
];

export const PLACE_DUMMY_DATA: Place = {
  name: '마마된장 강남358타워점',
  address: '서울 강남구 강남대로 358',
  latitude: 37.4950612185917,
  longitude: 127.029794890834,
  image:
    'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F3877A50090A846F89585BF436F48E425',
  category: 'meal',
  description: '된장찌개 맛있는 곳!',
  visitDate: String(new Date()),
  expectedCost: 30000,
};

export const PLACES_DUMMY_DATA: Place[] = [
  {
    id: 1,
    name: '정통집 강남직영점',
    address: '서울 강남구 강남대로96길 13',
    latitude: 37.4999549951152,
    longitude: 127.028120848084,
    image:
      'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F4887364A683A4370BB2F646C88393BD8',
    category: 'meal',
    description: '웨이팅 주의',
    visitDate: '2023-02-27T13:33:39.614Z',
    expectedCost: 30000,
    spending: 0,
    routeId: 1,
  },
  {
    id: 2,
    name: '오늘통닭 강남역점',
    address: '서울 서초구 서초대로74길 33',
    latitude: 37.49459498836523,
    longitude: 127.02777846305729,
    image:
      'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F66BF9E6CF94E46C2873CAB0C2C5798AE',
    category: 'drinking',
    description: '치맥치맥',
    visitDate: '2023-02-27T13:33:39.614Z',
    expectedCost: 30000,
    spending: 0,
    routeId: 1,
  },
  {
    id: 3,
    name: '장인닭갈비 강남점',
    address: '서울 강남구 테헤란로1길 19',
    latitude: 37.4996136518153,
    longitude: 127.027534918874,
    image:
      'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fc9819e433a15527daf9cd0209e7d4f9916e79667%3Foriginal',
    category: 'meal',
    description: '항상 사람 많더라,,?',
    visitDate: '2023-02-27T13:33:39.614Z',
    expectedCost: 30000,
    spending: 0,
    routeId: 1,
  },
  {
    id: 4,
    name: '마마된장 강남358타워점',
    address: '서울 강남구 강남대로 358',
    latitude: 37.4950612185917,
    longitude: 127.029794890834,
    image:
      'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F3877A50090A846F89585BF436F48E425',
    category: 'meal',
    description: '된장찌개 맛있는 곳!',
    visitDate: String(new Date(2023, 2, 1, 12, 30)),
    expectedCost: 15000,
    spending: 0,
    routeId: 1,
  },
];

export const COMMENT_DUMMY_DATA: Comment[] = [
  {
    content: '맛있겠다..',
    locationId: 1,
    partyMemberId: 1,
  },
  {
    content: '냠냠',
    locationId: 1,
    partyMemberId: 2,
  },
  {
    content: '나 매운 거 못 먹어..',
    locationId: 1,
    partyMemberId: 3,
  },
];
