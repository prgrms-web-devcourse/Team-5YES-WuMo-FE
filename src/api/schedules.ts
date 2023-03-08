import axiosInstance from './api';

export const fetchScheduleList = async (partyId: number, isPublic: boolean) => {
  try {
    const response = await axiosInstance.get(
      `api/v1/routes/${partyId}?path=${isPublic ? 1 : 0}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLocationCommentList = async (cursorId: number, locationId: number) => {
  try {
    const response = await axiosInstance.get(
      `api/v1/party-route-comments?cursorId=${cursorId}&pageSize=5&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
