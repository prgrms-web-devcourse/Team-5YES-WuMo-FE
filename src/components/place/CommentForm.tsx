import { Button, Flex, FormControl, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

const CommentForm = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <FormControl>
      <Flex gap='3' paddingTop='3' paddingBottom='3'>
        <Input
          value={value}
          onChange={handleChange}
          placeholder='댓글을 입력해 주세요.'
          borderRadius='lg'
          borderColor='gray.200'
          focusBorderColor='primary.red'
        />
        <Button variant='outline'>등록</Button>
      </Flex>
    </FormControl>
  );
};

export default CommentForm;
