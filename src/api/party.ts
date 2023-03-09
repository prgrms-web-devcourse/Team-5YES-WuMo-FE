import { PartyCreateBody, PartyUpdateBody } from '@/types/party';

import instance from './api';

export const createPartyAPI = async (partyAPIBody: PartyCreateBody) => {
  try {
    const response = await instance.post('/api/v1/parties', partyAPIBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartyMembersAPI = async (partyId: number) => {
  const params = {
    pageSize: 10,
  };
  if (partyId) {
    try {
      const response = await instance.get(`/api/v1/parties/${partyId}/members`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchPartyDetailAPI = async () => {
  // 파티 목록 구현되면 동적으로 받아올 예정
  const id = 14;
  try {
    const response = await instance.get(`/api/v1/parties/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPartyDetailAPI = async (
  partyId: number,
  partyAPIBody: PartyUpdateBody
) => {
  try {
    const response = await instance.patch(`/api/v1/parties/${partyId}`, partyAPIBody);
    if (response.status === 200) return response.data;
    else console.log(response);
  } catch (error) {
    console.error(error);
  }
};
