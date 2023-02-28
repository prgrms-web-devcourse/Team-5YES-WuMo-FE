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
