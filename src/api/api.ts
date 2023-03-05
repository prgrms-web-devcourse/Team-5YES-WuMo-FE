import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';

type AxiosInterceptorChildrenType = {
  children: JSX.Element;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const AxiosInterceptor = ({ children }: AxiosInterceptorChildrenType) => {
  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      console.log(response);
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error.status === 401) {
        console.log(error.message + ' 다시 로그인 하시죠.');
      }
      console.log(error);
      return Promise.reject();
    };

    const interceptorResponse = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    const interceptorRequest = instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : '';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(interceptorResponse);
      instance.interceptors.request.eject(interceptorRequest);
    };
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
