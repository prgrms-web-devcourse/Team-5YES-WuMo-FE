import { Category } from '@/types/place';

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
