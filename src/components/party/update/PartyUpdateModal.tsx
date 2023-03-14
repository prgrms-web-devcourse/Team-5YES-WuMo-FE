import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Calendar } from 'react-calendar';
import { MdAddPhotoAlternate, MdKeyboardArrowLeft } from 'react-icons/md';

import { createImage, deleteImage } from '@/api/image';
import { patchPartyDetail } from '@/api/party';
import Toast from '@/components/base/toast/Toast';
import useButtonDisabled from '@/hooks/useButtonDisabled';
import { PartyModalProps } from '@/types/party';
import { TOAST_MESSAGE } from '@/utils/constants/messages';

const PartyUpdateModal = ({ partyId, isOpen, onClose, partyDetail }: PartyModalProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync: updateParty } = useMutation(patchPartyDetail);

  const [name, setName] = useState(partyDetail?.name);
  const [description, setDescription] = useState(partyDetail?.description);
  const [imageUrl, setImageUrl] = useState(partyDetail?.coverImage);

  const [period, setPeriod] = useState(() => {
    if (!partyDetail) return ['', ''];
    else return [new Date(partyDetail.startDate), new Date(partyDetail.endDate)];
  });

  const buttonDisabled = useButtonDisabled([name, description, period[0], period[1]]);

  const onClickImageUpload = () => {
    imageInputRef.current?.click();
  };

  const onCloseUpdateModal = () => {
    onClose();
  };

  const handleFileDelete = async () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      await deleteImage(imageUrl);
      setImageUrl(null);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const formData = new FormData();
    formData.append('image', targetFiles[0]);

    const data = await createImage(formData);
    if (data) {
      setImageUrl(data);
    }
  };

  const handleUpdateParty = async () => {
    const [startDate, endDate] = period;
    const partyAPIBody = {
      name,
      description,
      coverImage: imageUrl,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    };

    await updateParty(
      { partyId, partyAPIBody },
      {
        onSuccess: () => {
          Toast.show({
            message: TOAST_MESSAGE.SUCCESS_PARTY_UPDATE,
            type: 'success',
          });
          onClose();
          return queryClient.invalidateQueries(['partyInformation']);
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseUpdateModal} size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='lg'>
          <MdKeyboardArrowLeft />
        </ModalCloseButton>

        <ModalHeader>모임 설정</ModalHeader>
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
          <Box mb='8'>
            <input
              type='file'
              hidden
              accept='image/jpg, image/jpeg, image/png'
              onChange={(e) => handleImageUpload(e)}
              ref={imageInputRef}
            />
            {imageUrl !== null ? (
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
          <Text fontSize='0.875rem' mb='2' color='#808080'>
            모임 일정
          </Text>
          <Flex flexDirection='column' justify='center' alignItems='center'>
            <Box mb='10' textAlign='center'>
              <Calendar
                onChange={(period: Date[]) => setPeriod(period)}
                formatDay={(_, date) => dayjs(date).format('D')}
                allowPartialRange={true}
                selectRange={true}
                calendarType='US'
              />
            </Box>
            <Box px='1rem' py='0.5rem' mb='10' borderRadius='10px' bg='#ffe6e6'>
              <strong>시작 날짜</strong>와 <strong>종료 날짜</strong>를 한번씩
              선택해주세요.
            </Box>
            <Flex
              gap='1.5rem'
              alignItems='flex-start'
              flexDirection='column'
              w='100%'
              px='4'>
              <Box>
                <Text fontSize='sm' color='#3b3b3b' mb='2'>
                  모임 시작 날짜
                </Text>
                <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                  {period[0]
                    ? dayjs(period[0]).format('YYYY년 M월 D일')
                    : '날짜를 선택해주세요.'}
                </Text>
              </Box>
              <Box>
                <Text fontSize='sm' color='#3b3b3b' mb='2'>
                  모임 종료 날짜
                </Text>
                <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                  {period[1]
                    ? dayjs(period[1]).format('YYYY년 M월 D일')
                    : '날짜를 선택해주세요.'}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter mt='10'>
          <Button
            isDisabled={buttonDisabled}
            bg='primary.red'
            color='#ffffff'
            _hover={{
              bg: 'primary.redHover',
            }}
            w='full'
            onClick={handleUpdateParty}>
            모임 수정하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PartyUpdateModal;
