export type PartyCreateStepItem = {
  title: string;
  component: JSX.Element;
};

export type PartyCreateBody = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage?: string;
  password?: string;
  role?: string;
};

export type PartyUpdateBody = {
  name: string | undefined;
  description: string | undefined;
  coverImage: string | undefined;
  startDate: string;
  endDate: string;
};

export type RoleUpdateBody = {
  role: string;
};

export type PartyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  partyDetail?: PartyListProps;
};

export type PartyListProps = {
  id: number;
  coverImage: string;
  description: string;
  name: string;
  startDate: string;
  endDate: string;
  members: PartyMemberProps;
  totalMembers: number;
};

export type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role?: string;
  profileImage: string;
}[];

export type PartyMemberListProps = {
  totalMembers: number;
  members: PartyMemberProps;
  lastId: number;
  profileImage: string | null;
};

export type PartyListPropsWithMembers = PartyListProps & { members: PartyMemberProps[] };

export type LocationsType = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  visitDate: string;
  expectedCost: number;
  spending: number;
  category: string;
};

export type CalculateStayDurationProps = {
  startDate: string | undefined;
  endDate: string | undefined;
};

export type PartyInformationType = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage: string;
};

export type MyPartyList = {
  lastId: number;
  party: [PartyInformationType & { members: PartyMemberProps[] }];
};

type MyPartyListPrams = {
  cursorId?: number;
  pageSize: number;
  partyType: string;
};
