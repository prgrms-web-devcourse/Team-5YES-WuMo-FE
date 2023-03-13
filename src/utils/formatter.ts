import dayjs from 'dayjs';

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('ko-KR').format(value);

export const parsePrice = (value: number) => Number(String(value).replace(/^\$/, ''));

export const getPriceText = (price: number) => `${formatPrice(price)}원`;

export const convertDateTime = (date: Date) => dayjs(date).add(9, 'h').toISOString();

export const formatDateTime = (date: string) => dayjs(date).format('YYYY.MM.DD HH:mm');

export const formatCreatedDateTime = (date: string) =>
  dayjs(date).add(9, 'h').format('YYYY.MM.DD HH:mm');
