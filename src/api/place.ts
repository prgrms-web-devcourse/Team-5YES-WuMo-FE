import { FetchPlacesParams, Place, PlaceToRoute } from '@/types/place';

import axiosInstance from './api';

export const fetchPlaces = async ({ cursorId, pageSize, partyId }: FetchPlacesParams) => {
  try {
    const response = await axiosInstance.get(
      `/locations?cursorId=${cursorId}&pageSize=${pageSize}&partyId=${partyId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlace = async (locationId: number) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPlace = async (data: Place) => {
  try {
    const response = await axiosInstance.post('/locations', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPlaceToRoute = async (data: PlaceToRoute) => {
  try {
    const response = await axiosInstance.post('api/v1/routes', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlaceFromRoute = async (locationId: number) => {
  try {
    await axiosInstance.delete(`api/v1/locations?locationId=${locationId}`);
  } catch (error) {
    console.error(error);
  }
};
