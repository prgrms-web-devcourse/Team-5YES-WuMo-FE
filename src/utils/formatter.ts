import 'dayjs/locale/ko';

import dayjs from 'dayjs';

dayjs.locale('ko');

export const formatPrice = (value: string) =>
  new Intl.NumberFormat('ko-KR').format(Number(value));

export const parsePrice = (value: string) => value.replace(/^\$/, '');

export const getPriceText = (price: number) => `${formatPrice(String(price))}원`;

export const formatDate = (date: string) =>
  dayjs(date).format('YYYY년 M월 D일 A h시 m분');
