import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { createPartyState, stepState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { processStep } from '@/utils/constants/processStep';

const PartyNameModal = () => {
  const { register, watch } = useForm();

  const imageInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // 스탭별로 데이터 저장하기 위한 recoil state
  const [createPartyBody, setCreatePartyBody] =
    useRecoilState<PartyCreateBody>(createPartyState);
  const [step, setStep] = useRecoilState<number>(stepState);

  const onClickImageUpload = () => {
    if (!imageInput.current) return;
    imageInput.current.click();
  };

  const handleImageUpload = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const selectedFiles = URL.createObjectURL(targetFiles[0]);
    setImageSrc(selectedFiles);
  };

  useEffect(() => {
    if (watch('name') === '' || watch('description') === '' || imageSrc === '')
      setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [watch()]);

  const onClickNextStep = () => {
    setCreatePartyBody({
      ...createPartyBody,
      name: name,
      description: description,
      coverImage: imageSrc,
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
            {...register('name')}
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
            {...register('description')}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        {/* 이미지 부분은 나중에 유리가 만든 컴포넌트 재사용 예정 */}
        <Box>
          <Text fontSize='0.875rem' mb='2' color='#808080'>
            모임 커버 이미지
          </Text>
          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/*'
            {...register('imageSrc')}
            onChange={(e) => handleImageUpload(e)}
            ref={imageInput}
          />
          {imageSrc !== '' ? (
            <Flex flexDirection='column' alignItems='center'>
              <Image src={imageSrc} boxSize='200px' />
              <Button w='100%' h='10' onClick={onClickImageUpload}>
                이미지 변경
              </Button>
            </Flex>
          ) : (
            <Button w='100%' h='28' onClick={onClickImageUpload}>
              클릭해서 이미지 가져오기
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
