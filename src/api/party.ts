import axiosInstance from '@/api/api';
import { ExpiredDateType, PartyCreateBody, PartyUpdateBody } from '@/types/party';

export const createParty = async (partyAPIBody: PartyCreateBody) => {
  try {
    const response = await axiosInstance.post('/parties', partyAPIBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartyMembers = async (partyId: number) => {
  const params = {
    pageSize: 10,
  };
  try {
    const response = await axiosInstance.get(`/parties/${partyId}/members`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartyInformation = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(`/parties/${partyId}`);
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
    const response = await axiosInstance.patch(`/parties/${partyId}`, partyAPIBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPartyInvitation = async (props: ExpiredDateType) => {
  const response = await axiosInstance.post(`/parties/${props.partyId}/invitations`, {
    expiredDate: props.expiredDate,
  });

  if (response) return response.data;
};

export const fetchPartyInvitationCode = async (code: string) => {
  try {
    const response = await axiosInstance.get(`/parties/invitations/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createRegisterParty = async (partyId: string) => {
  const response = await axiosInstance.post(`/parties/${partyId}/members`, {
    role: '광대',
  });
  return response.data;
};
