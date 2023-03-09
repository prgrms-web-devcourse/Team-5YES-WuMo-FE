import axiosInstance from '@/api/api';
import { PartyCreateBody, PartyUpdateBody } from '@/types/party';

export const createParty = async (partyAPIBody: PartyCreateBody) => {
  try {
    const response = await axiosInstance.post('/api/v1/parties', partyAPIBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartyMembers = async (partyId: number) => {
  const params = {
    pageSize: 10,
  };
  if (partyId) {
    try {
      const response = await axiosInstance.get(`/api/v1/parties/${partyId}/members`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchPartyInformation = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(`api/v1/parties/${partyId}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPartyDetail = async (
  partyId: number,
  partyAPIBody: PartyUpdateBody
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/parties/${partyId}`,
      partyAPIBody
    );
    if (response.status === 200) return response.data;
    else console.log(response);
  } catch (error) {
    console.error(error);
  }
};
