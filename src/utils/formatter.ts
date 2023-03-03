import 'dayjs/locale/ko';

import dayjs from 'dayjs';

dayjs.locale('ko');

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('ko-KR').format(value);

export const parsePrice = (value: string) => value.replace(/^\$/, '');

export const getPriceText = (price: number) => `${formatPrice(price)}원`;

export const formatDate = (date: string) => dayjs(date).format('YYYY.M.D A h시 m분');
