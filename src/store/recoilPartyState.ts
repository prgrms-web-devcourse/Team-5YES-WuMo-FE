import { atom } from 'recoil';

import { PartyCreateBody, PartyListProps, PartyMemberListProps } from '@/types/party';

export const createPartyState = atom<PartyCreateBody>({
  key: 'createPartyState',
  default: {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: '',
    password: '',
    role: '',
  },
});

export const partyDetailState = atom<PartyListProps>({
  key: 'updatePartyState',
  default: {
    id: 0,
    name: '',
    description: '',
    coverImage: '',
    startDate: '',
    endDate: '',
    members: [],
    totalMembers: 0,
  },
});

export const partyMemberListState = atom<PartyMemberListProps>({
  key: 'partyMemberListState',
  default: {
    totalMembers: 0,
    members: [],
    lastId: 0,
  },
});

// 파티 수정 업데이트 체크하는 용도
export const isUpdateData = atom<boolean>({
  key: 'isUpdateData',
  default: false,
});

export const stepState = atom<number>({
  key: 'stepState',
  default: 1,
});
