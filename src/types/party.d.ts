export type PartyCreateStepItem = {
  title: string;
  component: JSX.Element;
};

export type PartyCreateBody = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverImage?: string | null;
  password?: string;
  role?: string;
};

export type PartyUpdateBody = {
  name: string | undefined;
  description: string | undefined;
  coverImage?: string | null;
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

export type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role?: string;
  profileImage?: string | undefined;
  isLeader?: boolean;
};

export type PartyMemberListProps = {
  totalMembers: number;
  members: PartyMemberProps[];
  lastId: number;
  profileImage?: string | null;
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
  coverImage: string | undefined;
  totalMembers: number;
};

type PartyMembersType = {
  totalMembers: number;
  members: PartyMemberProps[];
};

export type PartyListPropsWithMembers = PartyInformationType & PartyMembersType;

type deleteMemberBanishProps = {
  partyId: number;
  memberId: number;
};

export type MyPartyList = {
  party: PartyListPropsWithMembers[];
  lastId: number;
};

export type MyPartyListParams = {
  partyType: 'ONGOING' | 'COMPLETED' | 'ALL';
  cursorId?: number;
  pageSize: number;
};

export type ExpiredDateType = {
  partyId: number;
  expiredDate: string;
};
