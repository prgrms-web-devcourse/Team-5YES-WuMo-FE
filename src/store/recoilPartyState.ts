import { atom } from 'recoil';

import { PartyCreateBody } from '@/types/party';

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

export const stepState = atom<number>({
  key: 'stepState',
  default: 1,
});
