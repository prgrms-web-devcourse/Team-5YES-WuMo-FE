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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdAdd, MdClear, MdLocationPin } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { createPlaceToRoute, deletePlaceFromRoute } from '@/api/place';
import ConfirmModal from '@/components/base/ConfirmModal';
import { PlanPlaceListProps } from '@/types/place';
import ROUTES from '@/utils/constants/routes';
import { formatDateTime } from '@/utils/formatter';

const PlanPlaceList = ({ places }: PlanPlaceListProps) => {
  const navigate = useNavigate();
  const { partyId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState({
    name: '',
    visitDate: '',
    check: '',
    buttonText: {},
    buttonClickhandler: {},
  });

  const queryClient = useQueryClient();
  const { mutateAsync: addPlace } = useMutation(createPlaceToRoute);
  const { mutateAsync: removePlace } = useMutation(deletePlaceFromRoute);

  const onAddPlaceToRoute = async (placeId: number) => {
    const placeToRouteBody = {
      locationId: placeId,
      partyId: Number(partyId),
    };

    await addPlace(placeToRouteBody, {
      onSuccess: () => {
        onClose();
        return (
          queryClient.invalidateQueries(['placeList']),
          queryClient.invalidateQueries(['scheduleList'])
        );
      },
    });
  };

  const onDeletePlaceFromRoute = async (placeId: number) => {
    await removePlace(placeId, {
      onSuccess: () => {
        onClose();
        return (
          queryClient.invalidateQueries(['placeList']),
          queryClient.invalidateQueries(['scheduleList'])
        );
      },
    });
  };

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
          onClick={() =>
            navigate(ROUTES.PLACE_NEW, { state: { partyId: Number(partyId) } })
          }>
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
            fallbackSrc='/skeleton.svg'
            src={place.image}
            alt={place.name}
            width='30%'
            objectFit='cover'
            onClick={() =>
              navigate(`/place/${place.id}`, { state: { partyId: Number(partyId) } })
            }
          />
          <CardBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='1rem'
            gap='1.5'
            onClick={() =>
              navigate(`/place/${place.id}`, { state: { partyId: Number(partyId) } })
            }>
            <Heading as='h4' size='sm'>
              {place.name}
            </Heading>
            <Text
              display='block'
              fontSize='sm'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              wordBreak='break-all'>
              {place.address}
            </Text>
            <Text fontSize='xs'>{formatDateTime(place.visitDate)}</Text>
          </CardBody>
          <CardFooter alignItems='center' padding='0' paddingRight='3'>
            {place.routeId ? (
              <Flex flexDirection='column' gap='0.5rem' alignItems='center'>
                <IconButton
                  backgroundColor='#ff9a9a'
                  variant='outline'
                  borderRadius='50px'
                  aria-label='일정에서 후보지 삭제'
                  icon={<MdClear />}
                  onClick={() => {
                    setModal({
                      name: '',
                      visitDate: '',
                      check: '이 후보지를 일정에서 삭제할까요?',
                      buttonText: { secondary: '취소', primary: '삭제' },
                      buttonClickhandler: {
                        primary: () => onDeletePlaceFromRoute(Number(place.id)),
                        secondary: () => onClose(),
                      },
                    });
                    onOpen();
                  }}
                />
                <Text fontSize='12px' color='primary.red' fontWeight='bold'>
                  일정삭제
                </Text>
              </Flex>
            ) : (
              <Flex flexDirection='column' gap='0.5rem' alignItems='center'>
                <IconButton
                  fontSize='1.2rem'
                  backgroundColor='#9fe7a2'
                  variant='outline'
                  borderRadius='50px'
                  aria-label='일정에 후보지 추가'
                  icon={<MdAdd />}
                  onClick={() => {
                    setModal({
                      name: place.name,
                      visitDate: place.visitDate,
                      check: '이 후보지를 일정을 추가할까요?',
                      buttonText: { secondary: '수정', primary: '추가' },
                      buttonClickhandler: {
                        primary: () => onAddPlaceToRoute(Number(place.id)),
                        secondary: () =>
                          navigate(ROUTES.PLACE_EDIT, {
                            state: { place, partyId: Number(partyId) },
                          }),
                      },
                    });
                    onOpen();
                  }}
                />
                <Text fontSize='12px' color='#2bb032 ' fontWeight='bold'>
                  일정추가
                </Text>
              </Flex>
            )}
          </CardFooter>
          <ConfirmModal
            hasCloseButton
            isOpen={isOpen}
            closeModalHandler={onClose}
            body={
              <Box textAlign='center'>
                {modal.name && <Text>장소: {modal.name}</Text>}
                {modal.visitDate && (
                  <Text>방문일: {formatDateTime(modal.visitDate)}</Text>
                )}
                <Text>{modal.check}</Text>
              </Box>
            }
            buttonText={modal.buttonText}
            clickButtonHandler={modal.buttonClickhandler}
          />
        </Card>
      ))}
    </Box>
  );
};

export default PlanPlaceList;
