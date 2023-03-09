import axiosInstance from './api';

export const createImage = async (image: FormData) => {
  try {
    const response = await axiosInstance.post(`/images`, image);

    if (response) return response.data.imageUrl;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
