import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';

import { PlaceSearchFormProps } from '@/types/place';
import { PLACE_SEARCH_ERROR_MESSAGES } from '@/utils/constants/messages';

const PlaceSearchForm = ({ initialRef, searchHandler }: PlaceSearchFormProps) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert(PLACE_SEARCH_ERROR_MESSAGES.KEYWORD_REQUIRED);
      return;
    }
    searchHandler(keyword);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        variant='outline'
        borderColor='gray.300'
        borderRadius='2xl'
        ref={initialRef}
        value={keyword}
        onChange={handleChange}
        placeholder='장소를 검색하세요.'
      />
    </Form>
  );
};

export default PlaceSearchForm;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;
