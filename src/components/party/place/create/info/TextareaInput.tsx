import { Flex, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

type TextareaInputType = {
  initialValue: string;
};

const TextareaInput = ({ initialValue }: TextareaInputType) => {
  const [value, setValue] = useState(initialValue);
  const maxLength = 50;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > maxLength) return;
    setValue(e.target.value);
  };

  return (
    <>
      <Textarea
        placeholder='메모를 입력하세요.'
        value={value}
        onChange={handleChange}
        resize='none'
        border='1px solid lightgrey'
        w='full'
        rows={2}
        borderRadius='md'
        outline='none'
        padding='4'
        lineHeight='base'
      />
      <Flex justify='flex-end' fontSize='sm' color='gray.600'>
        {value.length}/{maxLength}자
      </Flex>
    </>
  );
};

export default TextareaInput;
