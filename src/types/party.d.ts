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

export type PartyListProps = {
  coverImage: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  id: number;
};

export type PartyMemberProps = {
  memberId: number;
  nickname: string;
  role?: string;
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
