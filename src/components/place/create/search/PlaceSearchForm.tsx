import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { MdCancel, MdSearch } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import Toast from '@/components/base/toast/Toast';
import useMapPlaces from '@/hooks/useMapPlaces';
import { placeSearchState } from '@/store/recoilPlaceState';
import { PLACE_ERROR_MESSAGES } from '@/utils/constants/messages';

const PlaceSearchForm = () => {
  const [searchState, setSearchState] = useRecoilState(placeSearchState);
  const [keyword, setKeyword] = useState(searchState.keyword);
  const { result, searchPlaces } = useMapPlaces();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      Toast.show({
        message: PLACE_ERROR_MESSAGES.KEYWORD_REQUIRED,
        type: 'warning',
      });
      return;
    }
    searchPlaces(keyword);
    if (result) setSearchState({ ...searchState, keyword, result });
  };

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
