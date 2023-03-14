import { useEffect, useState } from 'react';

import Toast from '@/components/base/toast/Toast';
import { PLACE_ERROR_MESSAGES } from '@/utils/constants/messages';

import useMapScript from './useMapScript';

const useMapPlaces = () => {
  const [places, setPlaces] = useState<kakao.maps.services.Places>();
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>();
  const { script } = useMapScript();

  useEffect(() => {
    if (!script) return;

    script.addEventListener('load', () => {
      kakao.maps.load(() => setPlaces(new kakao.maps.services.Places()));
    });
  }, [script]);

  const searchPlaces = (keyword: string) => {
    if (!places) return;

    places.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setResult(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        Toast.show({
          message: PLACE_ERROR_MESSAGES.NO_RESULT,
          type: 'warning',
        });
      } else if (status === kakao.maps.services.Status.ERROR) {
        Toast.show({
          message: PLACE_ERROR_MESSAGES.RESPONSE_ERROR,
          type: 'error',
        });
      }
    });
  };

  return { result, searchPlaces };
};

export default useMapPlaces;
