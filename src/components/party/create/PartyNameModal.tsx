import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import { createImageUrlAPI } from '@/api/image';
import { createPartyState, stepState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { processStep } from '@/utils/constants/processStep';

const PartyNameModal = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 스탭별로 데이터 저장하기 위한 recoil state
  const [createPartyBody, setCreatePartyBody] =
    useRecoilState<PartyCreateBody>(createPartyState);
  const [step, setStep] = useRecoilState<number>(stepState);

  const [name, setName] = useState(createPartyBody.name || '');
  const [description, setDescription] = useState(createPartyBody.description || '');
  const [imageUrl, setImageUrl] = useState(createPartyBody.coverImage || '');

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onClickImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileDelete = () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      setImageUrl('');
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const formData = new FormData();
    formData.append('image', targetFiles[0]);

    const data = await createImageUrlAPI(formData);
    if (data) {
      setImageUrl(data.imageUrl);
    }
  };

  useEffect(() => {
    if (name === '' || description === '') setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [name, description]);

  const onClickNextStep = () => {
    setCreatePartyBody({
      ...createPartyBody,
      name: name,
      description: description,
      coverImage: imageUrl,
    });
  };

  return (
    <>
      <ModalBody>
        <Box mb='8'>
          <Text fontSize='0.875rem' mb='2' color='#808080'>
            모임 이름
          </Text>
          <Input
            p='3'
            size='xl'
            border='0.0625rem solid #cfcfcf'
            focusBorderColor='primary.red'
            borderRadius='8'
            placeholder='모임 이름을 입력해주세요.'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mb='8'>
          <Text fontSize='0.875rem' mb='2' color='#808080'>
            모임 설명
          </Text>
          <Textarea
            p='3'
            border='0.0625rem solid #cfcfcf'
            borderRadius='8'
            w='100%'
            rows={6}
            resize='none'
            outlineColor='primary.red'
            placeholder='어떤 모임인지 설명해주세요.'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Text fontSize='0.875rem' mb='2' color='#808080'>
          모임 커버 이미지
        </Text>
        <Box>
          <input
            type='file'
            hidden
            accept='image/jpg, image/jpeg, image/png'
            onChange={(e) => handleImageUpload(e)}
            ref={imageInputRef}
          />
          {imageUrl !== '' ? (
            <Flex flexDirection='column' alignItems='center'>
              <Image src={imageUrl} boxSize='200px' />
              <HStack pt='1rem'>
                <Button h='10' onClick={onClickImageUpload}>
                  이미지 변경
                </Button>
                <Button color='red' h='10' onClick={handleFileDelete}>
                  이미지 삭제
                </Button>
              </HStack>
            </Flex>
          ) : (
            <Button w='100%' h='28' onClick={onClickImageUpload}>
              <Icon as={MdAddPhotoAlternate} boxSize={8} />
              클릭하여 이미지를 추가하세요.
            </Button>
          )}
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={buttonDisabled}
          bg='primary.red'
          color='#ffffff'
          _hover={{
            bg: 'primary.redHover',
          }}
          w='full'
          onClick={() => {
            if (step !== processStep.partyCreateMax) {
              onClickNextStep();
              setStep(step + 1);
            }
          }}>
          다음
        </Button>
      </ModalFooter>
    </>
  );
};

export default PartyNameModal;
