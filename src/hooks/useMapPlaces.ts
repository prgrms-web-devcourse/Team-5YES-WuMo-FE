import { useEffect, useState } from 'react';

import { PLACE_SEARCH_ERROR_MESSAGES } from '../utils/constants/messages';
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
        alert(PLACE_SEARCH_ERROR_MESSAGES.NO_RESULT);
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert(PLACE_SEARCH_ERROR_MESSAGES.RESPONSE_ERROR);
      }
    });
  };

  const resetResult = () => setResult(undefined);

  return { result, searchPlaces, resetResult };
};

export default useMapPlaces;
