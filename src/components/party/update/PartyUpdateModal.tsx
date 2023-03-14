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
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Calendar } from 'react-calendar';
import { MdAddPhotoAlternate, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';

import { createImage, deleteImage } from '@/api/image';
import { patchPartyDetail } from '@/api/party';
import ConfirmModal from '@/components/base/ConfirmModal';
import Toast from '@/components/base/toast/Toast';
import useButtonDisabled from '@/hooks/useButtonDisabled';
import { partyUpdateState } from '@/store/recoilPartyState';
import { PartyListPropsWithMembers, PartyModalProps } from '@/types/party';

const PartyUpdateModal = ({ isOpen, onClose, partyDetail }: PartyModalProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isImageDeleteModalOpen,
    onOpen: onImageDeleteModalOpen,
    onClose: onImageDeleteModalClose,
  } = useDisclosure();

  const setPartyDetail = useSetRecoilState<PartyListPropsWithMembers>(partyUpdateState);

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

  const handleFileDelete = async () => {
    await deleteImage(imageUrl);
    setImageUrl(null);
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

    if (partyDetail?.id && partyAPIBody) {
      const data = await patchPartyDetail(partyDetail.id, partyAPIBody);

      if (data) {
        setPartyDetail(data);
        Toast.show({
          message: '모임이 정상적으로 수정되었어요.',
          type: 'success',
        });
        onClose();
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
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
                outlineColor='primary.red'
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
                    <Button color='red' h='10' onClick={onImageDeleteModalOpen}>
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
      <ConfirmModal
        hasCloseButton
        isOpen={isImageDeleteModalOpen}
        closeModalHandler={onImageDeleteModalClose}
        body={
          <Box textAlign='center'>
            <Text>사진을 삭제하시겠습니까?</Text>
          </Box>
        }
        buttonText={{ primary: '삭제', secondary: '취소' }}
        clickButtonHandler={{
          primary: async () => {
            await handleFileDelete();
            onImageDeleteModalClose();
          },
          secondary: () => onImageDeleteModalClose(),
        }}
      />
    </>
  );
};

export default PartyUpdateModal;
