import axios, { AxiosError, AxiosResponse } from 'axios';

import Toast from '@/components/base/toast/Toast';

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
    const token = localStorage.getItem('wumo_token');
    if (token) {
      try {
        const response = await axiosInstance.post('/members/reissue', JSON.parse(token));
        const { accessToken } = response.data;
        lock = false;
        onRrefreshed(accessToken);
        subscribers = [];
        localStorage.setItem('wumo_token', JSON.stringify({ accessToken }));

        return accessToken;
      } catch (error) {
        lock = false;
        subscribers = [];
        localStorage.removeItem('wumo_token');
        Toast.show({
          title: '인증 정보에 문제가 발생하였습니다.',
          message: '다시 로그인해주세요.',
          duration: 3000,
          type: 'error',
          authError: true,
        });
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
            title: '인증 정보가 만료되었습니다.',
            message: '다시 로그인해주세요.',
            duration: 3000,
            type: 'error',
            authError: true,
          });
          localStorage.removeItem('wumo_token');
        }
        if (lock) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalConfig));
            });
          });
        }

        lock = true;
        const accessToken = await getRefreshToken();

        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalConfig);
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('wumo_token');

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
        const { accessToken } = JSON.parse(token);
        config.headers.Authorization = `Bearer ${accessToken}`;
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
