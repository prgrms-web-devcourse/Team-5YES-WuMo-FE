import axiosInstance from '@/api/api';

type ChangeRouteReleased = {
  routeId: number;
  isPublic: boolean;
  name?: string;
};

export const patchChangRouteReleased = async (routeReleased: ChangeRouteReleased) => {
  try {
    const response = await axiosInstance.patch(`/routes`, routeReleased);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createLikeRoute = async (routeId: number) => {
  try {
    const response = await axiosInstance.post(`routes/${routeId}/likes`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLikeRoute = async (routeId: number) => {
  try {
    await axiosInstance.delete(`routes/${routeId}/likes`);
  } catch (error) {
    console.error(error);
  }
};
