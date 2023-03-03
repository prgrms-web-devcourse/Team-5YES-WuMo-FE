export type CommentType = {
  nickName: string;
  profileImage: string;
  memberRole: string;
  content: string;
  image?: string;
  createdAt: string;
};

export type CommentFeedTitleProps = {
  placeData: {
    place: string;
    visitDate: string;
  };
};

export type AmountType = {
  amount: string;
};

export type TimeLineProps = {
  onClickhandler?: () => void;
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
