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
import { useEffect, useState } from 'react';
import { MdAdd, MdClear, MdLocationPin } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { createPlaceToRoute, deletePlaceFromRoute } from '@/api/place';
import ConfirmModal from '@/components/base/ConfirmModal';
import { PlanPlaceListProps } from '@/types/place';
import { formatDateTime } from '@/utils/formatter';

const PlanPlaceList = ({ places }: PlanPlaceListProps) => {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [routeId, setRouteId] = useState<number | null>(null);

  useEffect(() => {
    if (routeId) return;
    for (const place of places) {
      if (place.routeId) {
        setRouteId(place.routeId);
        return;
      }
    }
  }, []);

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
      routeId,
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
          onClick={() => navigate(`/place/new`, { state: { partyId: Number(partyId) } })}>
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
          height='7rem'
          border={routeId && place.routeId === routeId ? '2px solid #2b6cb0' : ''}>
          <Image
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
            gap='1.5'
            onClick={() =>
              navigate(`/place/${place.id}`, { state: { partyId: Number(partyId) } })
            }>
            <Heading as='h4' size='sm'>
              {place.name}
            </Heading>
            <Text
              display='block'
              width='10.5rem'
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
            {routeId && place.routeId === routeId ? (
              <IconButton
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
                      secondary: () => console.log('수정 페이지로 이동'), // TODO: 해당 후보지 수정 페이지로 이동
                    },
                  });
                  onOpen();
                }}
              />
            ) : (
              <IconButton
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
                      secondary: () => onClose(),
                    },
                  });
                  onOpen();
                }}
              />
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
