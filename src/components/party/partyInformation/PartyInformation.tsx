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
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchPartyDetailAPI, fetchPartyMembersAPI } from '@/api/party';
import BackNavigation from '@/components/navigation/BackNavigation';
import {
  isUpdateData,
  partyDetailState,
  partyMemberListState,
} from '@/store/recoilPartyState';
import {
  CalculateStayDurationProps,
  PartyListProps,
  PartyMemberListProps,
} from '@/types/party';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';
import PartyReceipt from './receipt/PartyReceipt';

const PartyInformation = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [partyDetail, setPartyDetail] = useRecoilState<PartyListProps>(partyDetailState);
  const setPartyMembersList =
    useSetRecoilState<PartyMemberListProps>(partyMemberListState);
  const getUpdated = useRecoilValue(isUpdateData);

  const CalculateStayDuration = ({ startDate, endDate }: CalculateStayDurationProps) => {
    const stayDate = dayjs(endDate).diff(startDate, 'd');
    if (!stayDate) return '';
    return `(${stayDate}박 ${stayDate + 1}일)`;
  };

  useEffect(() => {
    const initPartyDetail = async () => {
      const partyData = await fetchPartyDetailAPI();
      const partyMembers = await fetchPartyMembersAPI(14);

      if (partyData && partyMembers) {
        setPartyDetail(partyData);
        setPartyMembersList(partyMembers);
      }
    };
    initPartyDetail();
  }, [getUpdated]);

  const stayDurationDate = CalculateStayDuration({
    startDate: partyDetail && partyDetail.startDate,
    endDate: partyDetail && partyDetail.endDate,
  });

  const partyInfo = {
    name: partyDetail && partyDetail.name,
    startDate: partyDetail && partyDetail.startDate,
    endDate: partyDetail && partyDetail.endDate,
    stayDurationDate,
  };

  return (
    <>
      {partyDetail && (
        <Box>
          <BackNavigation option={BACKNAVIGATION_OPTIONS.MENU} />
          <Image src={partyDetail.coverImage} pt='4.75rem' />
          <Flex justify='space-between'>
            <Container p='0.625rem' m='0'>
              <Heading size='md'>{partyDetail.name}</Heading>
              <Text fontSize='sm'>
                {partyDetail.startDate} ~ {partyDetail.endDate} {stayDurationDate}
              </Text>
            </Container>
            <Flex p='0.625rem' textAlign='right' align='center'>
              <Button
                colorScheme='teal'
                size='xs'
                marginRight='0.625rem'
                onClick={onOpen}>
                영수증
              </Button>
              <Button bg='transparent' size='xs'>
                <BsFillShareFill />
              </Button>
            </Flex>
          </Flex>
          <PartyUserList userList={partyDetail.members} />
          <Text margin='0.625rem' h='3.125rem' whiteSpace='pre-line'>
            {partyDetail.description}
          </Text>
          <PartyMenuTabList />
          <Box>
            <Outlet />
          </Box>
          <PartyReceipt isOpen={isOpen} onClose={onClose} {...partyInfo} />
        </Box>
      )}
    </>
  );
};

export default PartyInformation;
