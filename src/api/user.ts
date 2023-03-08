import axiosInstance from './api';

export const logout = async () => {
  try {
    await axiosInstance.delete('/api/v1/members/logout');
    localStorage.removeItem('tokens');
  } catch (error) {
    console.error(error);
  }
};
