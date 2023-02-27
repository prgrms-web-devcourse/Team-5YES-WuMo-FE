import { Category, Place } from '@/types/place';

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
};

export const getImageURL = (id: string) =>
  `https://github.githubassets.com/images/icons/emoji/unicode/${id}.png?v8`;

export const categoryList: Category = {
  meal: {
    text: '식사',
    imageID: '1f35a',
  },
  drinking: {
    text: '커피',
    imageID: '2615',
  },
  beer: {
    text: '술',
    imageID: '1f37b',
  },
  game: {
    text: '게임',
    imageID: '1f3ae',
  },
  walking: {
    text: '산책',
    imageID: '1f6b6',
  },
  sightseeing: {
    text: '구경',
    imageID: '1f440',
  },
  culture: {
    text: '문화',
    imageID: '1f3a8',
  },
  nature: {
    text: '자연',
    imageID: '1f3d5',
  },
  sports: {
    text: '스포츠',
    imageID: '26bd',
  },
};

export const PLACE_DUMMY_DATA: Place = {
  name: '마마된장 강남358타워점',
  address: '서울 강남구 강남대로 358',
  latitude: 37.4950612185917,
  longititude: 127.029794890834,
  image_url:
    'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F3877A50090A846F89585BF436F48E425',
  category: '식사',
  description: '된장찌개 맛있는 곳!',
  visit_date: '2023-02-27T13:33:39.614Z',
  expected_cost: 30000,
  spending: 0,
  created_at: '2023-02-27T13:33:39.614Z',
  updated_at: '2023-02-27T13:33:39.614Z',
  party_id: 1,
  route_id: 1,
};
