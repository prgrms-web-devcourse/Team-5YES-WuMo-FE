import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd, MdLocationPin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/base/ConfirmModal';
import { PlanPlaceListProps } from '@/types/place';
import ROUTES from '@/utils/constants/routes';
import { formatDateTime } from '@/utils/formatter';

const PlanPlaceList = ({ places }: PlanPlaceListProps) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding='5'>
      <Flex justify='space-between'>
        <Heading as='h3' size='md' display='flex' alignItems='center' gap='1'>
          <MdLocationPin />
          후보지 목록
        </Heading>
        <Button
          variant='ghost'
          size='md'
          leftIcon={<MdAdd />}
          color='gray.500'
          onClick={() => navigate(ROUTES.PLACE_NEW)}>
          후보지 추가하기
        </Button>
      </Flex>
      {places.map((place) => (
        <Card
          key={place.id}
          direction='row'
          overflow='hidden'
          cursor='pointer'
          marginTop='3'
          marginBottom='3'
          height='7rem'>
          <Image
            src={place.image}
            alt={place.name}
            width='30%'
            objectFit='cover'
            onClick={() => navigate(`/place/${place.id}`)}
          />
          <CardBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            gap='1.5'
            onClick={() => navigate(`/place/${place.id}`)}>
            <Heading as='h4' size='sm'>
              {place.name}
            </Heading>
            <Text fontSize='sm'>{place.address}</Text>
            <Text fontSize='xs'>{formatDateTime(place.visitDate)}</Text>
          </CardBody>
          <CardFooter alignItems='center' padding='0' paddingRight='3'>
            <IconButton
              variant='outline'
              borderRadius='50px'
              aria-label='일정에 후보지 추가'
              icon={<MdAdd />}
              onClick={onOpen}
            />
          </CardFooter>
          <ConfirmModal
            hasCloseButton
            isOpen={isOpen}
            closeModalHandler={onClose}
            body={
              <Box textAlign='center'>
                <Text>장소: {place.name}</Text>
                <Text>방문일: {formatDateTime(place.visitDate)}</Text>
                <Text>이 후보지를 일정을 추가할까요?</Text>
              </Box>
            }
            buttonText={{ secondary: '수정', primary: '추가' }}
            clickButtonHandler={{
              primary: () => {
                alert('추가 완료');
                // TODO: 후보지 목록 업데이트
              },
              secondary: () => console.log('수정 페이지로 이동'), // TODO: 해당 후보지 수정 페이지로 이동
            }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default PlanPlaceList;
