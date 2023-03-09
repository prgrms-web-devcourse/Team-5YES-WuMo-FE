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
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Calendar } from 'react-calendar';
import { MdAddPhotoAlternate, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';

import { createImageUrlAPI } from '@/api/image';
import { patchPartyDetailAPI } from '@/api/party';
import { partyDetailState } from '@/store/recoilPartyState';
import { PartyListProps, PartyModalProps } from '@/types/party';

const PartyUpdateModal = ({ isOpen, onClose, partyDetail }: PartyModalProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const setPartyDetail = useSetRecoilState<PartyListProps>(partyDetailState);

  const [name, setName] = useState(partyDetail?.name);
  const [description, setDescription] = useState(partyDetail?.description);
  const [imageUrl, setImageUrl] = useState(partyDetail?.coverImage);

  const [value, setValue] = useState(() => {
    if (!partyDetail) return [new Date(), new Date()];
    else return [new Date(partyDetail.startDate), new Date(partyDetail.endDate)];
  });

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

  const handleUpdateParty = async () => {
    const [startDate, endDate] = value;
    const partyAPIBody = {
      name,
      description,
      coverImage: imageUrl,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    };

    if (partyDetail?.id && partyAPIBody) {
      console.log(partyAPIBody);
      const data = await patchPartyDetailAPI(partyDetail.id, partyAPIBody);
      if (data) {
        setPartyDetail(data);
        alert('모임이 정상적으로 수정되었어요.');
        onClose();
      }
    }
  };

  return (
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
          <Text fontSize='0.875rem' mb='2' color='#808080'>
            모임 일정
          </Text>
          <Flex mb='8' flexDirection='column' justify='center' alignItems='center'>
            <Box mb='10' textAlign='center'>
              <Calendar
                onChange={(value: Date[]) => setValue(value)}
                formatDay={(_, date) => dayjs(date).format('D')}
                allowPartialRange={true}
                selectRange={true}
                calendarType='US'
              />
            </Box>
            <Flex gap={4} alignItems='center'>
              <Box>
                <Text fontSize='sm' color='#3b3b3b' mb='2'>
                  모임 시작 날짜
                </Text>
                <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                  {dayjs(value[0]).format('YYYY년 M월 D일')}
                </Text>
              </Box>
              <Text>~</Text>
              <Box>
                <Text fontSize='sm' color='#3b3b3b' mb='2'>
                  모임 종료 날짜
                </Text>
                <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                  {dayjs(value[1]).format('YYYY년 M월 D일')}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
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
