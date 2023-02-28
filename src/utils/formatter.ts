export const formatPrice = (value: string) =>
  new Intl.NumberFormat('ko-KR').format(Number(value));

export const parsePrice = (value: string) => value.replace(/^\$/, '');

export const getPriceText = (price: number) => `${formatPrice(String(price))}원`;

export const getDateTimeText = (dateTime: string) => {
  const date = new Date(dateTime);

  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};
