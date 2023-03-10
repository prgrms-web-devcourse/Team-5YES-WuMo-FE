import { Place } from '@/types/place';

import axiosInstance from './api';

export const fetchPlaces = async (
  cursorId: number,
  pageSize: number,
  partyId: number
) => {
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
