import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { fetchPartyInformation } from '@/api/party';
import { patchChangRouteReleased } from '@/api/route';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import { PartyInformationType } from '@/types/party';
import { ScheduleType } from '@/types/schedule';

const RouteReleaseChange = ({
  scheduleList,
  routeId,
}: {
  scheduleList: ScheduleType;
  routeId: number;
}) => {
  const { state } = useLocation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const { mutate: changeReleased } = useMutation(patchChangRouteReleased);

  const {
    data: partyInformation,
    isLoading,
    isError,
  } = useQuery<PartyInformationType>(
    ['partyInformation'],
    () => fetchPartyInformation(state.partyId),
    {
      staleTime: 5000,
    }
  );

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;

  const { register, getValues } = useForm({
    defaultValues: {
      routeName: partyInformation?.name,
    },
  });

  const onRouteReleased = () => {
    if (scheduleList.isPublic) {
      changeReleased(
        { routeId, isPublic: false, name: partyInformation.name },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries(['scheduleList']);
          },
        }
      );
    } else {
      onOpen();
    }
  };

  return (
    <Box pos='absolute' right='2' zIndex='20'>
      <FormControl>
        <Flex align='center' justify='flex-end' px='16px' pt='8px'>
          <FormLabel htmlFor='release' m='0' mr='0.625rem'>
            루트 공개
          </FormLabel>
          <Switch
            id='release'
            size='md'
            isChecked={scheduleList.isPublic}
            onChange={onRouteReleased}
          />
        </Flex>
      </FormControl>
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={
          <Flex direction='column' align='center' pt='0'>
            <Heading size='md' mb='24px'>
              루트 공개
            </Heading>
            <Text fontSize='sm'>
              모임 루트를 공개할 경우 모든 사람이 내 루트를 구경할 수 있어요!
            </Text>
            <Text fontSize='sm' mb='2.25rem'>
              (댓글은 공개되지 않으며 루트만 공개됩니다.)
            </Text>

            <Text mb='2'>공개할 루트의 이름을 정해주세요.</Text>
            <Input {...register('routeName')} />
          </Flex>
        }
        clickButtonHandler={{
          primary: () => {
            changeReleased(
              { routeId, isPublic: true, name: getValues('routeName') },
              {
                onSuccess: () => {
                  onClose();
                  return queryClient.invalidateQueries(['scheduleList']);
                },
              }
            );
          },
        }}
        buttonText={{
          secondary: '취소',
          primary: '확인',
        }}
      />
    </Box>
  );
};

export default RouteReleaseChange;
