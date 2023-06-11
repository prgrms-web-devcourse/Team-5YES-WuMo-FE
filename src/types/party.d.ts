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

export type PartyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  partyId?: number;
  partyDetail?: PartyListProps;
};

export type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role: string;
  profileImage?: string | null;
  isLeader?: boolean;
};

export type PartyMemberListProps = {
  totalMembers: number;
  members: PartyMemberProps[];
  lastId: number;
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
  partyId?: number;
  otherMemberId: number;
};

export type MyPartyList = {
  party: PartyListPropsWithMembers[];
  lastId: number;
};

export type PartyListProps = {
  partyType: 'onGoing' | 'completed' | 'all';
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

export type InvitationCodeModalType = {
  invitationCode: string;
  onClose: () => void;
  isOpen: boolean;
};
