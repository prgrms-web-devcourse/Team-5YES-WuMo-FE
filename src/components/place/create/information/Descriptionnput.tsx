import { Flex, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

import { createPlaceState } from '@/store/recoilPlaceState';
import { PLACE_DESCRIPTION_MAX_LENGTH } from '@/utils/constants/party';

const DescriptionInput = () => {
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [value, setValue] = useState(createPlaceBody.description);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > PLACE_DESCRIPTION_MAX_LENGTH) return;
    setValue(e.target.value);
    setCreatePlaceBody({ ...createPlaceBody, description: value });
  };

  return (
    <>
      <Textarea
        placeholder='메모를 입력하세요.'
        value={value}
        onChange={handleChange}
        resize='none'
        border='1px solid lightgrey'
        focusBorderColor='primary.red'
        w='full'
        rows={2}
        borderRadius='md'
        outline='none'
        padding='4'
        lineHeight='base'
      />
      <Flex justify='flex-end' fontSize='sm' color='gray.600'>
        {value.length}/{PLACE_DESCRIPTION_MAX_LENGTH}자
      </Flex>
    </>
  );
};

export default DescriptionInput;
