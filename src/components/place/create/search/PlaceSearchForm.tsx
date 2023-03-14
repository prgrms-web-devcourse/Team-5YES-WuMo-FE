import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FormEvent, useEffect, useState } from 'react';
import { MdCancel, MdSearch } from 'react-icons/md';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

import { placeSearchState } from '@/store/recoilPlaceState';
import { PLACE_ERROR_MESSAGES } from '@/utils/constants/messages';

const PlaceSearchForm = () => {
  const [places, setPlaces] = useState<kakao.maps.services.Places>();
  const [searchState, setSearchState] = useRecoilState(placeSearchState);
  const [keyword, setKeyword] = useState(searchState.keyword);

  const { loading, error } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_API_JS_KEY,
    libraries: ['services'],
  });

  useEffect(() => {
    kakao.maps.load(() => setPlaces(new kakao.maps.services.Places()));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert(PLACE_ERROR_MESSAGES.KEYWORD_REQUIRED);
      return;
    }

    if (!places) return;

    places.keywordSearch(keyword, (data, status) => {
      if (status === 'OK') {
        if (data) setSearchState({ ...searchState, keyword, result: data });
      } else if (status === 'ZERO_RESULT') {
        alert(PLACE_ERROR_MESSAGES.NO_RESULT);
      } else if (status === 'ERROR') {
        alert(PLACE_ERROR_MESSAGES.RESPONSE_ERROR);
      }
    });
  };

  if (loading || error) return <></>;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          variant='flushed'
          borderColor='gray.300'
          paddingLeft='0'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='장소를 검색하세요.'
          focusBorderColor='primary.red'
        />
        <InputRightElement
          cursor='pointer'
          w='12'
          gap='4'
          right='1'
          justifyContent='flex-end'>
          {keyword && <MdCancel onClick={() => setKeyword('')} color='gray' />}
          <MdSearch onClick={handleSubmit} />
        </InputRightElement>
      </InputGroup>
    </Form>
  );
};

export default PlaceSearchForm;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;
