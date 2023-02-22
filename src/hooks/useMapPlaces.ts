import { useEffect, useState } from 'react';

const useMapPlaces = () => {
  const [places, setPlaces] = useState<kakao.maps.services.Places>();
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_JS_KEY
    }&libraries=services&autoload=false`;

    document.head.appendChild(script);

    script.addEventListener('load', () => {
      kakao.maps.load(() => setPlaces(new kakao.maps.services.Places()));
    });
  }, []);

  const searchPlaces = (keyword: string) => {
    if (!places) return;

    places.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setResult(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  return { searchPlaces, result };
};

export default useMapPlaces;
