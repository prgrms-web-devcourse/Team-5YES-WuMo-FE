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
import { useState } from 'react';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet, useParams } from 'react-router-dom';

import { createPartyInvitation, fetchPartyInformation } from '@/api/party';
import { fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import Toast from '@/components/base/toast/Toast';
import BackNavigation from '@/components/navigation/BackNavigation';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useScrollEvent from '@/hooks/useScrollEvent';
import { CalculateStayDurationProps, PartyInformationType } from '@/types/party';
import { ScheduleType } from '@/types/schedule';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import InvitationCodeModal from './InvitationCodeModal';
import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';
import PartyReceipt from './receipt/PartyReceipt';

const CalculateStayDuration = ({ startDate, endDate }: CalculateStayDurationProps) => {
  const stayDate = dayjs(endDate).diff(startDate, 'd');
  if (!stayDate) return '';
  return `(${stayDate}박 ${stayDate + 1}일)`;
};

const PartyInformation = () => {
  const { scrollActive } = useScrollEvent(300);
  const { partyId } = useParams();
  const [invitationCode, setInvitationCode] = useState('');
  const {
    onOpen: receiptOnOpen,
    isOpen: receiptIsOpen,
    onClose: receiptOnClose,
  } = useDisclosure();
  const {
    onOpen: invitationOnOpen,
    isOpen: invitationIsOpen,
    onClose: invitationOnClose,
  } = useDisclosure();

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

  useDocumentTitle(
    partyInformation ? `WuMo | ${partyInformation.name}` : 'WuMo | 우리들의 모임'
  );

  const { data: scheduleList, refetch } = useQuery<ScheduleType>(
    ['ReceiptScheduleList', partyId],
    () => fetchScheduleList(Number(partyId), false),
    {
      enabled: false,
      onError: () => {
        Toast.show({
          title: '등록된 일정이 없어요',
          message: '일정을 등록하고 사용금액을 설정해주세요.',
          type: 'warning',
        });
      },
    }
  );

  const { mutateAsync: createInvitationCode } = useMutation(createPartyInvitation, {
    onError: () => {
      Toast.show({
        title: '초대링크 생성에 실패했어요.',
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
    setInvitationCode(`${url}/${invitationCode.code}`);
    invitationOnOpen();
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
        partyId={Number(partyId)}
        title={scrollActive ? partyInformation.name : ''}
        option={BACKNAVIGATION_OPTIONS.MENU}
      />
      <Image
        fallbackSrc='/skeleton.svg'
        src={partyInformation.coverImage}
        mt='3.75rem'
        h='200px'
        w='100%'
        objectFit='cover'
        alt={partyInformation.name}
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
          <Button
            colorScheme='teal'
            size='xs'
            marginRight='0.625rem'
            onClick={() => {
              refetch();
              receiptOnOpen();
            }}>
            영수증
          </Button>
          <Button
            bg='transparent'
            size='xs'
            onClick={() =>
              copyPartyInvitationCode(`${window.location.origin}/invitation`)
            }>
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
      {scheduleList && (
        <PartyReceipt
          isOpen={receiptIsOpen}
          onClose={receiptOnClose}
          scheduleList={scheduleList}
          {...partyInfo}
        />
      )}
      <InvitationCodeModal
        invitationCode={invitationCode}
        isOpen={invitationIsOpen}
        onClose={invitationOnClose}
      />
    </Box>
  );
};

export default PartyInformation;
