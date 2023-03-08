import axiosInstance from '@/api/api';

export const fetchPartyInformation = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(`api/v1/parties/${partyId}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPartyUserList = async (partyId: number) => {
  try {
    const response = await axiosInstance.get(
      `api/v1/parties/${partyId}/members?cursorId=0&pageSize=5`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
