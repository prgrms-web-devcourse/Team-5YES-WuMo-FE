import {
  MdCalendarToday,
  MdCreditCard,
  MdLocationPin,
  MdOutlineComment,
} from 'react-icons/md';

import { Category, Comment, PlaceInformation } from '@/types/place';

import { formatDateTime, getPriceText } from '../formatter';

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

export const PlaceInfoItems = (data: PlaceInformation) => [
  {
    type: 'address',
    icon: <MdLocationPin />,
    text: '주소',
    value: data.address,
  },
  {
    type: 'visitDate',
    icon: <MdCalendarToday />,
    text: '일정',
    value: formatDateTime(data.visitDate),
  },
  {
    type: 'expectedCost',
    icon: <MdCreditCard />,
    text: '예상 비용',
    value: getPriceText(data.expectedCost),
  },
  {
    type: 'description',
    icon: <MdOutlineComment />,
    text: '메모',
    value: data.description,
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

export const MAX_ADDRESS_LENGTH = 50;

export const getSearchAddress = (address: string) => {
  const cityList = [
    '서울',
    '부산',
    '인천',
    '대구',
    '대전',
    '광주',
    '울산',
    '세종',
    '제주',
  ];
  const provinceList = ['강원', '경기', '경북', '경남', '전북', '전남', '충북', '충남'];

  const target = address.split(' ')[0];
  if (cityList.includes(target)) return target;
  else if (provinceList.includes(target)) return address.split(' ')[1];
  return '';
};
