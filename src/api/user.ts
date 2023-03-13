import axios from 'axios';

import Toast from '@/components/base/toast/Toast';
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        return Toast.show({
          title: '로그인에 실패하였습니다.',
          message: error.response.data.message,
          type: 'warning',
        });
      }
      if (error.response?.status === 400) {
        return Toast.show({
          title: '로그인에 실패하였습니다.',
          message: '존재하지 않는 Email입니다.',
          type: 'warning',
        });
      }
    }
    return console.error(error);
  }
};

export const signUp = async (values: SignProps) => {
  try {
    await axiosInstance.post('/members/signup', values);
  } catch (error) {
    return Toast.show({
      title: '회원가입 중 오류가 발생하였습니다.',
      message: '잠시 후 다시 시도해주세요.',
      type: 'error',
    });
  }
};

export const fetchCheckEmail = async (target: string) => {
  await axiosInstance.get(`/members/check-email?email=${target}`);
};

export const fetchCheckNickname = async (target: string) => {
  await axiosInstance.get(`/members/check-nickname?nickname=${target}`);
};

export const fetchMyProfileInfo = async () => {
  try {
    const response = await axiosInstance.get('/members/me');
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchMyProfile = async (fields: UserEditProps) => {
  try {
    const response = axiosInstance.patch('/members/me', fields);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Toast.show({
        title: '프로필 수정을 실패하였습니다.',
        message: '잠시 후 다시 시도해주세요.',
        type: 'error',
      });
    }
  }
};

export const sendEmailCertificationCode = async (target: string) => {
  try {
    await axiosInstance.get(`/members/send-code?address=${target}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Toast.show({
        title: '인증 메일 전송을 실패하였습니다.',
        message: '잠시 후 다시 시도해주세요.',
        type: 'error',
      });
    }
  }
};

export const checkEmailCertificaitonCode = async (email: string, code: string) => {
  try {
    await axiosInstance.get(`/members/check-code?address=${email}&code=${code}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return Toast.show({
          title: '이메일 인증에 실패하였습니다.',
          message: error.response.data.message,
          type: 'warning',
        });
      }
    }
    return console.error(error);
  }
};
