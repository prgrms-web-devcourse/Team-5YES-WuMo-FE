import { Place } from '@/types/place';

import axiosInstance from './api';

export const createPlace = async (data: Place) => {
  try {
    const response = await axiosInstance.post('api/v1/locations', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createImage = async (data: File) => {
  try {
    const formData = new FormData();
    formData.append('image', data);
    const response = await axiosInstance.post('api/v1/images', formData);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
