import { atom } from 'recoil';

import {
  PartyCreateBody,
  PartyInformationType,
  PartyListPropsWithMembers,
  PartyMemberListProps,
  PartyMemberProps,
} from '@/types/party';

const partyBaseState = {
  name: '',
  description: '',
  coverImage: null || '',
  startDate: '',
  endDate: '',
};

export const createPartyState = atom<PartyCreateBody>({
  key: 'createPartyState',
  default: {
    ...partyBaseState,
    role: '',
  },
});

export const partyDetailState = atom<PartyInformationType>({
  key: 'updatePartyState',
  default: {
    ...partyBaseState,
    id: 0,
  },
});

export const partyUpdateState = atom<PartyListPropsWithMembers>({
  key: 'partyUpdateState',
  default: {
    ...partyBaseState,
    id: 0,
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

export const partyMeRoleState = atom<PartyMemberProps>({
  key: 'partyMeRoleState',
  default: {
    memberId: 0,
    nickname: '',
    role: '',
    profileImage: null || '',
    isLeader: false,
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
