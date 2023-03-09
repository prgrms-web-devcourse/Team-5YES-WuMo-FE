export type NavigationName = '홈' | '관심목록' | '모임 생성' | '내 모임' | '내 정보';
export type NavigationItem = {
  id: string;
  name: string;
  icon: IconType;
  activeIcon: IconType;
  link: string;
};
