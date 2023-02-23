export type navigationName = '홈' | '관심목록' | '파티 생성' | '내 파티' | '내 정보';
export type navigationNameAndIcon = Record<navigationName, ReactElement>;
export type navigationItem = {
  id: string;
  name: string;
  icon: IconType;
  activeIcon: IconType;
  link: string;
};
