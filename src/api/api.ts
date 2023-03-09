import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';

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
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      try {
        const response = await axiosInstance.post('/members/reissue', JSON.parse(tokens));
        const { accessToken, refreshToken } = response.data;
        lock = false;
        onRrefreshed(accessToken);
        subscribers = [];
        localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }));

        return accessToken;
      } catch (error) {
        lock = false;
        subscribers = [];
        localStorage.removeItem('tokens');
      }
    }
  };

  useEffect(() => {
    const interceptorResponse = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const { config: originalConfig, response } = error;
        if (response?.status === 401 && originalConfig) {
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

          if (typeof accessToken === 'string') {
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalConfig);
          }

          return Promise.reject(error);
        }
      }
    );

    const interceptorRequest = axiosInstance.interceptors.request.use(
      (config) => {
        const tokens = localStorage.getItem('tokens');

        if (!tokens) {
          config.headers.Authorization = null;
          return config;
        }
        config.headers = config.headers ?? {};
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Content-Type'] = 'application/json';
        }
        if (config.headers && tokens) {
          const { accessToken } = JSON.parse(tokens);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptorResponse);
      axiosInstance.interceptors.request.eject(interceptorRequest);
    };
  }, []);

  return children;
};

export default axiosInstance;
export { AxiosInterceptor };
