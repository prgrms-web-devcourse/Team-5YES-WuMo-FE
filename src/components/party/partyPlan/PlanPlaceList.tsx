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
          ????????? ??????
        </Heading>
        <Button
          variant='ghost'
          size='md'
          leftIcon={<MdAdd />}
          color='gray.500'
          onClick={() =>
            navigate(ROUTES.PLACE_NEW, { state: { partyId: Number(partyId) } })
          }>
          ????????? ????????????
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
          border={place.routeId ? '2px solid #2b6cb0' : ''}>
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
              <IconButton
                variant='outline'
                borderRadius='50px'
                aria-label='???????????? ????????? ??????'
                icon={<MdClear />}
                onClick={() => {
                  setModal({
                    name: '',
                    visitDate: '',
                    check: '??? ???????????? ???????????? ????????????????',
                    buttonText: { secondary: '??????', primary: '??????' },
                    buttonClickhandler: {
                      primary: () => onDeletePlaceFromRoute(Number(place.id)),
                      secondary: () => onClose(),
                    },
                  });
                  onOpen();
                }}
              />
            ) : (
              <IconButton
                variant='outline'
                borderRadius='50px'
                aria-label='????????? ????????? ??????'
                icon={<MdAdd />}
                onClick={() => {
                  setModal({
                    name: place.name,
                    visitDate: place.visitDate,
                    check: '??? ???????????? ????????? ????????????????',
                    buttonText: { secondary: '??????', primary: '??????' },
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
            )}
          </CardFooter>
          <ConfirmModal
            hasCloseButton
            isOpen={isOpen}
            closeModalHandler={onClose}
            body={
              <Box textAlign='center'>
                {modal.name && <Text>??????: {modal.name}</Text>}
                {modal.visitDate && (
                  <Text>?????????: {formatDateTime(modal.visitDate)}</Text>
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
