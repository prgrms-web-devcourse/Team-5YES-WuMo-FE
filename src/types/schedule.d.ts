export type CommentType = {
  nickName: string;
  profileImage: string;
  memberRole: string;
  content: string;
  image?: string;
  createdAt: string;
};

export type CommentFeedTitleProps = {
  isExpanded: boolean;
  placeData: {
    place: string;
    visitDate: string;
  };
};

export type AmountType = {
  amount: string;
};

export type TimeLineProps = {
  onClickHandler?: () => void;
  routerButton?: JSX.Element;
};

export type routeListProps = {
  name: string;
  address: string;
  image: string;
  visitDate: string;
  spending: number;
  category: string;
} & TimeLineProps;
