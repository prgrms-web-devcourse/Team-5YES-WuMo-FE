import axios from '@/api/api';

export const fetchScheduleList = async (routeId: number, isPublic: boolean) => {
  try {
    const response = await axios.get(`api/v1/routes/${routeId}?path=${isPublic ? 1 : 0}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLocationCommentList = async (cursorId: number, locationId: number) => {
  try {
    const response = await axios.get(
      `api/v1/party-route-comments?cursorId=${cursorId}&pageSize=5&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
