export type CommentType = {
  id: number;
  nickName: string;
  profileImage: string | null;
  memberRole: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentListType = {
  partyRouteComments: CommentType[];
  lastId: number;
};

export type CommentFeedTitleProps = {
  placeData: {
    place: string;
    visitDate: string;
  };
};

export type AmountType = {
  amount: number;
};
export type ChangeAmountType = {
  locationId: number;
  spending: number;
};

export type TimeLineProps = {
  onClickHandler?: (locationId: number, routeId: number) => void;
  routerButton?: JSX.Element;
  isPublic: boolean;
};

export type ScheduleLocationType = {
  id: number;
  name: string;
  address: string;
  image: string;
  visitDate: string;
  spending: number;
  category: string;
};

export type ScheduleType = {
  id: number;
  isLiking: boolean;
  name: string;
  isPublic: boolean;
  locations: ScheduleLocationType[];
  partyId: number;
};

export type routeListProps = {
  name: string;
  address: string;
  image: string;
  visitDate: string;
  spending: number;
  category: string;
} & Pick<TimeLineProps, 'onClickHandler', 'routerButton'>;

export type CreateCommentBody = {
  content: string;
  image?: string;
  partyId: number;
  locationId: number;
};

export type CommentCreateType = {
  content: string;
  image: File | null;
};
