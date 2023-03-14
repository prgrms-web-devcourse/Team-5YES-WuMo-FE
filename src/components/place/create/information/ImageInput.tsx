import { Box, Button, Flex, Icon, Image } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import Loading from '@/components/base/Loading';
import { createPlaceState } from '@/store/recoilPlaceState';
import { ImageData } from '@/types/place';
import { compressImage } from '@/utils/imageCompressor';

const ImageInput = () => {
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [values, setValues] = useState<ImageData>({
    imageBase64: createPlaceBody?.imageURL || null,
    imageFile: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      const compressedImageFile = await compressImage(file);
      setValues({ ...values, imageFile: compressedImageFile });
      setCreatePlaceBody({ ...createPlaceBody, imageFile: compressedImageFile });
      encodeFileToBase64(compressedImageFile);
      setIsImageUploading(false);
    }
    e.target.value = '';
  };

  const handleFileDelete = () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      setValues({ ...values, imageBase64: '', imageFile: null });
      setCreatePlaceBody({ ...createPlaceBody, imageURL: '', imageFile: null });
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
        const result = reader.result;
        if (!result || typeof result !== 'string') return;
        setValues({ ...values, imageBase64: result });
        resolve(Promise);
      };
    });
  };

  if (isImageUploading) return <Loading />;

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
        {values.imageBase64 ? (
          <Image
            src={values.imageBase64}
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
      {(values.imageBase64 || values.imageFile) && (
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
