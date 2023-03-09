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
  role: string;
};

export type PartyUpdateProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role?: string;
  profileImage: string | null;
};

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
  startDate: string;
  endDate: string;
};

export type PartyInformationType = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage: string;
};

type PartyMembersType = {
  totalMembers: number;
  members: PartyMemberProps[];
};

export type PartyListPropsWithMembers = PartyInformationType & PartyMembersType;

export type MyPartyList = {
  party: PartyListPropsWithMembers[];
  lastId: number;
};

export type MyPartyListPrams = {
  partyType: 'ONGOING' | 'COMPLETED' | 'ALL';
  cursorId?: number;
  pageSize: number;
};
