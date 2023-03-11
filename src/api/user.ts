import { UserEditProps } from '@/types/user';
import { SignInProps, SignProps } from '@/types/userSign';

import axiosInstance from './api';

export const logout = async () => {
  try {
    await axiosInstance.delete('/members/logout');
    localStorage.removeItem('tokens');
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (values: SignInProps) => {
  try {
    const response = await axiosInstance.post('/members/login', values);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (values: SignProps) => {
  try {
    await axiosInstance.post('/members/signup', values);
  } catch (error) {
    console.error(error);
  }
};

export const fetchCheckEmail = async (target: string) => {
  await axiosInstance.get(`/members/check-email?email=${target}`);
};

export const fetchNickname = async (target: string) => {
  await axiosInstance.get(`/members/check-nickname?nickname=${target}`);
};

export const fetchMyProfileInfo = async () => {
  try {
    const response = await axiosInstance.get('/members');
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchMyProfile = async (fields: UserEditProps) => {
  try {
    const response = axiosInstance.patch('/members', fields);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMyInformation = async () => {
  try {
    const response = await axiosInstance.get('/members');
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
