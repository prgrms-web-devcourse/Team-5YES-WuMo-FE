import axios, { AxiosError, AxiosResponse } from 'axios';

import Toast from '@/components/base/toast/Toast';
import { AT_KEY, GRANT_TYPE } from '@/utils/constants/auth';
import { TOAST_MESSAGE } from '@/utils/constants/messages';

import { reissueToken } from './user';

type AxiosInterceptorChildrenType = {
  children: JSX.Element;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const AxiosInterceptor = ({ children }: AxiosInterceptorChildrenType) => {
  let lock = false;
  let subscribers: ((token: string) => void)[] = [];

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    subscribers.push(cb);
  };

  const onRrefreshed = (token: string) => {
    subscribers.forEach((cb) => cb(token));
  };

  const getRefreshToken = async (): Promise<string | void> => {
    const token = localStorage.getItem(AT_KEY);
    if (token) {
      try {
        const response = await reissueToken(token);
        const { accessToken } = response.data;
        lock = false;
        onRrefreshed(accessToken);
        subscribers = [];
        localStorage.setItem(AT_KEY, JSON.stringify(accessToken));

        return accessToken;
      } catch (error) {
        lock = false;
        subscribers = [];
        Toast.show({
          title: TOAST_MESSAGE.FAILED_AUTH,
          message: TOAST_MESSAGE.REQUEST_LOGIN,
          duration: 1500,
          type: 'error',
          authError: true,
        });
        localStorage.removeItem(AT_KEY);
      }
    }
  };

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const { config: originalConfig, response } = error;

      if (response?.status === 401 && originalConfig) {
        if (originalConfig.url === '/members/reissue') {
          Toast.show({
            title: TOAST_MESSAGE.EXPIRED_TOKEN,
            message: TOAST_MESSAGE.REQUEST_LOGIN,
            duration: 1500,
            type: 'error',
            authError: true,
          });
          localStorage.removeItem(AT_KEY);
        }
        if (lock) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalConfig.headers.Authorization = `${GRANT_TYPE} ${token}`;
              resolve(axios(originalConfig));
            });
          });
        }

        lock = true;
        const accessToken = await getRefreshToken();

        originalConfig.headers.Authorization = `${GRANT_TYPE} ${accessToken}`;
        return axios(originalConfig);
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(AT_KEY);

      if (!token) {
        config.headers.Authorization = null;
        return config;
      }
      config.headers = config.headers ?? {};
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      if (!config.headers.Authorization) {
        const accessToken = JSON.parse(token);
        config.headers.Authorization = `${GRANT_TYPE} ${accessToken}`;
        return config;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return children;
};

export default axiosInstance;
export { AxiosInterceptor };
