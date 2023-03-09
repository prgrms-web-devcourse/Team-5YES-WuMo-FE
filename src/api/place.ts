import { Place } from '@/types/place';

import axiosInstance from './api';

export const fetchPlaces = async (
  cursorId: number,
  pageSize: number,
  partyId: string
) => {
  try {
    const response = await axiosInstance.get(
      `api/v1/locations?cursorId=${cursorId}&pageSize=${pageSize}&partyId=${partyId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlace = async (locationId: number) => {
  try {
    const response = await axiosInstance.get(`api/v1/locations/${locationId}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createLocation = async (data: Place) => {
  try {
    const response = await axiosInstance.post('api/v1/locations', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
