export type PartyCreateStepItem = {
  title: string;
  component: JSX.Element;
};

export type PartyCreateBody = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage: string;
  password: string;
  memberId: number;
  role: string;
};
export type PartyListProps = {
  coverImage: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  id: number;
};

type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role?: string;
  profileImage: string;
};

export type PartyListPropsWithMembers = PartyListProps & { members: PartyMemberProps[] };
