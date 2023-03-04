import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { LocationsTypes, PartyMemberProps } from '@/types/party';
import { ReceiptProps } from '@/types/receiptModal';
import { getPriceText } from '@/utils/formatter';

import PartyReceiptItem from './PartyReceiptItem';
import ReceiptTriangle from './ReceiptTriangle';

const DUMMYDATA = {
  likeCount: 10,
  locations: [
    {
      id: 1,
      name: '다이도코로',
      address: '부산 수영구 남천동로108번길 27 2층 다이도코로',
      latitude: 34.56789,
      longitude: 123.56789,
      image: 'https://ifh.cc/g/k1PnR2.jpg',
      description: '가라아게 존맛',
      visitDate: '2023-02-28T07:11:14.766Z',
      expectedCost: 55000,
      spending: 55000,
      category: 'meal',
    },
    {
      id: 2,
      name: '룸즈에이 서면점',
      address: '부산 부산진구 중앙대로680번가길 9 3층',
      latitude: 34.56789,
      longitude: 123.56789,
      image: 'https://ifh.cc/g/pQ78VB.jpg',
      description: '방탈출 가보자고',
      visitDate: '2023-02-28T07:11:14.766Z',
      expectedCost: 55000,
      spending: 80000,
      category: 'culture',
    },
    {
      id: 3,
      name: '럭키상회',
      address: '부산 부산진구 중앙대로680번가길 75-1',
      latitude: 34.56789,
      longitude: 123.56789,
      image: 'https://ifh.cc/g/2GSGcZ.jpg',
      description: '부산하면 회지',
      visitDate: '2023-02-28T07:11:14.766Z',
      expectedCost: 55000,
      spending: 50000,
      category: 'drinking',
    },
    {
      id: 4,
      name: '해운대 스카이캡슐',
      address: '부산 해운대구 달맞이길62번길 13',
      latitude: 34.56789,
      longitude: 123.56789,
      image: 'https://ifh.cc/g/ZzdCmH.jpg',
      description: '해운대에서 스카이캡슐 타기!',
      visitDate: '2023-02-28T07:11:14.766Z',
      expectedCost: 55000,
      spending: 30000,
      category: 'sightseeing',
    },
  ],
  image: 'https://via.placeholder.com/300',
  name: '퇴사 기념 여행',
};

const USERDOMMYDATA = {
  members: [
    {
      memberId: 1,
      nickname: '오예스',
      profileImage: 'https://via.placeholder.com/50',
      role: '방장',
    },
    {
      memberId: 2,
      nickname: '육예스',
      profileImage: 'https://via.placeholder.com/50',
      role: '총무',
    },
    {
      memberId: 3,
      nickname: '칠예스',
      profileImage: 'https://via.placeholder.com/50',
      role: '김기사',
    },
  ],
};

const countPartyMember = (members: PartyMemberProps[]) => {
  return members.length;
};

const PartyReceipt = ({
  isOpen,
  onClose,
  name,
  startDate,
  endDate,
  stayDurationDate,
}: ReceiptProps) => {
  const getExpensesArray = (locations: LocationsTypes[]) => {
    return locations.map(({ spending }) => spending);
  };

  const CalculateTotalExpenses = (locations: LocationsTypes[]) => {
    const TotalExpenses = getExpensesArray(locations);

    return TotalExpenses.reduce((acc, cur) => acc + cur, 0);
  };

  const divideTotalExpenseByMembers = (
    totalExpenses: number,
    members: PartyMemberProps[]
  ) => {
    const totalMember = countPartyMember(members);

    return Math.floor(totalExpenses / totalMember);
  };

  const totalExpenses = CalculateTotalExpenses(DUMMYDATA.locations);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay
          h='100vh'
          maxW='maxWidth.mobile'
          left='0'
          right='0'
          margin='0 auto'
        />
        <ModalContent w='19.5rem' borderRadius='0' minH='500px'>
          <ReceiptTriangle y={-5.5} />
          <ModalHeader textAlign='center'>모임 영수증</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{name}</Text>
            <Text fontSize='sm'>
              {startDate} ~ {endDate} {stayDurationDate}
            </Text>
            <Flex borderBottom='1px solid' borderStyle='dashed' pb='0.625rem'>
              {USERDOMMYDATA.members.map(({ memberId, nickname }) => (
                <Text key={memberId} pr='0.375rem' fontSize='sm'>
                  {nickname}
                </Text>
              ))}
            </Flex>
            <Box
              minH='15.625rem'
              borderBottom='1px solid'
              borderStyle='dashed'
              mb='0.625rem'>
              <PartyReceiptItem locations={DUMMYDATA.locations} />
            </Box>
            <Flex justify='space-between'>
              <Flex>ToTal:</Flex>
              {getPriceText(totalExpenses)}
            </Flex>
            <Flex justify='space-between'>
              <Flex>1/{countPartyMember(USERDOMMYDATA.members)}:</Flex>
              {getPriceText(
                divideTotalExpenseByMembers(totalExpenses, USERDOMMYDATA.members)
              )}
            </Flex>
          </ModalBody>
          <ReceiptTriangle y={6} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PartyReceipt;
