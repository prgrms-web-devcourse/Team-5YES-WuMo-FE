import axios from 'axios';

const useImageSearch = () => {
  const Kakao = axios.create({
    baseURL: 'https://dapi.kakao.com',
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_REST_KEY}`, // 공통으로 요청 할 헤더
    },
  });

  const blogSearch = (keyword: string) => {
    return Kakao.get('/v2/search/image', { params: { query: keyword } });
  };

  return { blogSearch };
};

export default useImageSearch;
