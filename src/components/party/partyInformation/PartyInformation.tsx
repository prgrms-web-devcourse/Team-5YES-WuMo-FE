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
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';

import BackNavigation from '@/components/navigation/BackNavigation';
import { CalculateStayDurationProps } from '@/types/party';

import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';
import PartyReceipt from './receipt/PartyReceipt';

const DUMMYDATA = {
  id: 1,
  name: '오예스 워크샵',
  startDate: '2023-02-21',
  endDate: '2023-02-22',
  description: '팀 설립 기념 워크샵',
  coverImage: 'https://via.placeholder.com/560x200',
};

const PartyInformation = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const CalculateStayDuration = ({ startDate, endDate }: CalculateStayDurationProps) => {
    const stayDate = dayjs(endDate).diff(startDate, 'd');
    if (!stayDate) return '';
    return `(${stayDate}박 ${stayDate + 1}일)`;
  };

  const stayDurationDate = CalculateStayDuration({
    startDate: DUMMYDATA.startDate,
    endDate: DUMMYDATA.endDate,
  });

  const partyInfo = {
    name: DUMMYDATA.name,
    startDate: DUMMYDATA.startDate,
    endDate: DUMMYDATA.endDate,
    stayDurationDate,
  };

  return (
    <Box>
      <BackNavigation />
      <Image src='https://via.placeholder.com/560x200' pt='48px' />
      <Flex justify='space-between'>
        <Container p='0.625rem' m='0'>
          <Heading size='md'>{DUMMYDATA.name}</Heading>
          <Text fontSize='sm'>
            {DUMMYDATA.startDate} ~ {DUMMYDATA.endDate} {stayDurationDate}
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
        {DUMMYDATA.description}
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
