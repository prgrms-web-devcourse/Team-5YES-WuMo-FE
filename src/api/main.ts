import axiosInstance from '@/api/api';
import { MyPartyListParams } from '@/types/party';

export const fetchMyPartyList = async ({
  cursorId,
  pageSize,
  partyType,
}: MyPartyListParams) => {
  try {
    const response = await axiosInstance.get(
      `/parties/members/me?partyType=${partyType}&cursorId=${
        cursorId ? cursorId : ''
      }&pageSize=${pageSize}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
