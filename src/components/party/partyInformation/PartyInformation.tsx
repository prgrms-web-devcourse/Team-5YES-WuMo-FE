import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet, useParams } from 'react-router-dom';

import { createPartyInvitation, fetchPartyInformation } from '@/api/party';
import Loading from '@/components/base/Loading';
import Toast from '@/components/base/toast/Toast';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { CalculateStayDurationProps, PartyInformationType } from '@/types/party';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';
import PartyReceipt from './receipt/PartyReceipt';

const CalculateStayDuration = ({ startDate, endDate }: CalculateStayDurationProps) => {
  const stayDate = dayjs(endDate).diff(startDate, 'd');
  if (!stayDate) return '';
  return `(${stayDate}박 ${stayDate + 1}일)`;
};

const PartyInformation = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { scrollActive } = useScrollEvent(300);
  const { partyId } = useParams();

  const {
    data: partyInformation,
    isLoading: partyInformationLoading,
    isError: partyInformationError,
  } = useQuery<PartyInformationType>(
    ['partyInformation', partyId],
    () => fetchPartyInformation(Number(partyId)),
    {
      staleTime: 10000,
    }
  );

  const { mutateAsync: createInvitationCode } = useMutation(createPartyInvitation, {
    onSuccess: () => {
      Toast.show({
        title: '초대링크 복사가 완료되었어요!',
        message: '모임에 초대하고 싶은 친구에게 링크를 전달해보세요!',
        type: 'success',
      });
    },
    onError: () => {
      Toast.show({
        title: '초대링크 복사에 실패했어요.',
        message: '모임 기간이 지나 친구를 초대할 수 없어요. 새 모임을 만들어주세요.',
        type: 'error',
      });
    },
  });

  if (partyInformationLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (partyInformationError) return <></>;

  const copyPartyInvitationCode = async (url: string) => {
    const body = {
      partyId: Number(partyId),
      expiredDate: partyInformation.endDate,
    };
    const invitationCode = await createInvitationCode(body);
    navigator.clipboard.writeText(`${url}/${invitationCode.code}`);
  };

  const stayDurationDate = CalculateStayDuration({
    startDate: partyInformation.startDate,
    endDate: partyInformation.endDate,
  });

  const partyInfo = {
    name: partyInformation.name,
    startDate: partyInformation.startDate,
    endDate: partyInformation.endDate,
    totalMembers: partyInformation.totalMembers,
    stayDurationDate,
  };

  return (
    <Box>
      <BackNavigation
        title={scrollActive ? partyInformation.name : ''}
        option={BACKNAVIGATION_OPTIONS.MENU}
      />
      <Image
        src={partyInformation.coverImage}
        mt='3.75rem'
        h='200px'
        w='100%'
        objectFit='cover'
      />
      <Flex justify='space-between'>
        <Container p='0.625rem' m='0'>
          <Heading size='md' mt='1rem'>
            {partyInformation.name}
          </Heading>
          <Text fontSize='sm'>
            {partyInformation.startDate} ~ {partyInformation.endDate} {stayDurationDate}
          </Text>
        </Container>
        <Flex p='0.625rem' textAlign='right' align='center'>
          <Button colorScheme='teal' size='xs' marginRight='0.625rem' onClick={onOpen}>
            영수증
          </Button>
          <Button
            bg='transparent'
            size='xs'
            onClick={() => copyPartyInvitationCode(`${window.location.host}/invitation`)}>
            <BsFillShareFill />
          </Button>
        </Flex>
      </Flex>
      <PartyUserList />
      <Text mx='0.625rem' my='1rem' whiteSpace='pre-line'>
        {partyInformation.description}
      </Text>
      <PartyMenuTabList />
      <Box>
        <Outlet />
      </Box>
      <PartyReceipt isOpen={isOpen} onClose={onClose} {...partyInfo} />
    </Box>
  );
};

export default PartyInformation;
