import instance from './api';

export const createImageUrlAPI = async (formData: FormData) => {
  try {
    const response = await instance.post('/api/v1/images', formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
