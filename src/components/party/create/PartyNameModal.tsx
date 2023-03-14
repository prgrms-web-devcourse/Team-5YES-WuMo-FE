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
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import { createImage, deleteImage } from '@/api/image';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import ModalButton from '@/components/base/ModalButton';
import useButtonDisabled from '@/hooks/useButtonDisabled';
import { createPartyState, stepState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { processStep } from '@/utils/constants/processStep';
import { compressImage } from '@/utils/imageCompressor';

const PartyNameModal = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 스탭별로 데이터 저장하기 위한 recoil state
  const [createPartyBody, setCreatePartyBody] =
    useRecoilState<PartyCreateBody>(createPartyState);
  const [step, setStep] = useRecoilState<number>(stepState);

  const [name, setName] = useState(createPartyBody.name || '');
  const [description, setDescription] = useState(createPartyBody.description || '');
  const [imageUrl, setImageUrl] = useState(createPartyBody.coverImage || '');
  const [isImageUploading, setIsImageUploading] = useState(false);

  const buttonDisabled = useButtonDisabled([name, description, imageUrl]);

  const onClickImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileDelete = async () => {
    setImageUrl('');
    await deleteImage(imageUrl);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const formData = new FormData();
    setIsImageUploading(true);
    const compressedImageFile = await compressImage(targetFiles[0]);
    formData.append('image', compressedImageFile);
    setIsImageUploading(false);

    const data = await createImage(formData);
    if (data) {
      setImageUrl(data);
    }
  };

  const onClickNextStep = () => {
    setCreatePartyBody({
      ...createPartyBody,
      name: name,
      description: description,
      coverImage: imageUrl,
    });
  };

  if (isImageUploading) return <Loading />;

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
            focusBorderColor='primary.red'
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
              <Image fallbackSrc='./logo.svg' src={imageUrl} boxSize='200px' alt={name} />
              <HStack pt='1rem'>
                <Button h='10' onClick={onClickImageUpload}>
                  이미지 변경
                </Button>
                <Button color='red' h='10' onClick={onOpen}>
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
        <ModalButton
          text='다음'
          isDisabled={buttonDisabled}
          clickButtonHandler={() => {
            if (step !== processStep.partyCreateMax) {
              onClickNextStep();
              setStep(step + 1);
            }
          }}
        />
      </ModalFooter>
      <ConfirmModal
        isOpen={isOpen}
        hasCloseButton
        closeModalHandler={onClose}
        body={
          <Box textAlign='center'>
            <Text>사진을 삭제하시겠습니까?</Text>
          </Box>
        }
        buttonText={{ primary: '삭제', secondary: '취소' }}
        clickButtonHandler={{
          primary: async () => {
            await handleFileDelete();
            onClose();
          },
          secondary: () => onClose(),
        }}
      />
    </>
  );
};

export default PartyNameModal;
