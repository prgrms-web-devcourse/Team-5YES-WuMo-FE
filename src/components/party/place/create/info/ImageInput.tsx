import { Box, Button, Flex, Icon, Image } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';

import { InputProps } from '@/types/place';

const ImageInput = ({ value, setValueHandler }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageBase64, setImageBase64] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValueHandler('image_url', file);
      encodeFileToBase64(file);
    }
  };

  const handleFileDelete = () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      setValueHandler('image_url', null);
      setImageBase64('');
    }
  };

  const handleFileChoose = () => {
    inputRef.current?.click();
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        if (!reader.result || typeof reader.result !== 'string') return;
        const result = reader.result;
        setImageBase64(result);
        resolve(Promise);
      };
    });
  };

  return (
    <>
      <Box onClick={handleFileChoose}>
        <input
          hidden
          ref={inputRef}
          type='file'
          name='image'
          accept='image/jpg, image/jpeg, image/png'
          onChange={handleFileChange}
        />
        {imageBase64 || value ? (
          <Image
            src={imageBase64 || value}
            alt='이미지 미리보기'
            maxH='sm'
            margin='0 auto'
          />
        ) : (
          <Flex
            h='3xs'
            direction='column'
            justify='center'
            align='center'
            gap='4'
            backgroundColor='gray.100'
            borderRadius='base'
            cursor='pointer'>
            <Icon as={MdAddPhotoAlternate} boxSize={8} />
            클릭하여 이미지를 추가하세요.
          </Flex>
        )}
      </Box>
      {(imageBase64 || value) && (
        <Flex justify='flex-end' paddingTop='3'>
          <Button color='warning' onClick={handleFileDelete}>
            삭제
          </Button>
        </Flex>
      )}
    </>
  );
};

export default ImageInput;
