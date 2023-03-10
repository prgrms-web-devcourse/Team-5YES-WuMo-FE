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
