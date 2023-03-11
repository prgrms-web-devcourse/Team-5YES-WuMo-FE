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
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { fetchPartyInformation, fetchPartyMembersMeInfo } from '@/api/party';
import Loading from '@/components/base/Loading';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { partyDetailState, partyMeRoleState } from '@/store/recoilPartyState';
import {
  CalculateStayDurationProps,
  PartyInformationType,
  PartyMemberProps,
} from '@/types/party';
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

  const setPartyDetail = useSetRecoilState(partyDetailState);
  const setPartyMeRole = useSetRecoilState(partyMeRoleState);

  const {
    data: partyInformation,
    isLoading: partyInformationLoading,
    isError: partyInformationError,
  } = useQuery<PartyInformationType>(['partyInformation'], () =>
    fetchPartyInformation(Number(partyId))
  );

  const {
    data: partyMemberMeInfo,
    isLoading: partyMemberMeInfoLoading,
    isError: partyMemberMeInfoError,
  } = useQuery<PartyMemberProps>(['partyMemberMeInfo'], () =>
    fetchPartyMembersMeInfo(Number(partyId))
  );

  if (partyInformation && partyMemberMeInfo) {
    setPartyDetail(partyInformation);
    setPartyMeRole(partyMemberMeInfo);
  }

  if (partyInformationLoading || partyMemberMeInfoLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (partyInformationError || partyMemberMeInfoError) return <></>;

  const stayDurationDate = CalculateStayDuration({
    startDate: partyInformation.startDate,
    endDate: partyInformation.endDate,
  });

  const partyInfo = {
    name: partyInformation.name,
    startDate: partyInformation.startDate,
    endDate: partyInformation.endDate,
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
        objectFit='none'
      />
      <Flex justify='space-between'>
        <Container p='0.625rem' m='0'>
          <Heading size='md'>{partyInformation.name}</Heading>
          <Text fontSize='sm'>
            {partyInformation.startDate} ~ {partyInformation.endDate} {stayDurationDate}
          </Text>
        </Container>
        <Flex p='0.625rem' textAlign='right' align='center'>
          <Button colorScheme='teal' size='xs' marginRight='0.625rem' onClick={onOpen}>
            영수증
          </Button>
          <Button bg='transparent' size='xs'>
            <BsFillShareFill />
          </Button>
        </Flex>
      </Flex>
      <PartyUserList />
      <Text margin='0.625rem' h='3.125rem'>
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
