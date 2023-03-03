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
      console.log(error);
      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
