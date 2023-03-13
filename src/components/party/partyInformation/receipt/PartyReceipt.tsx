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
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import { ReceiptProps } from '@/types/receiptModal';
import { ScheduleLocationType, ScheduleType } from '@/types/schedule';
import { getPriceText } from '@/utils/formatter';

import PartyReceiptItem from './PartyReceiptItem';
import ReceiptTriangle from './ReceiptTriangle';

const PartyReceipt = ({
  isOpen,
  onClose,
  name,
  startDate,
  endDate,
  totalMembers,
  stayDurationDate,
}: ReceiptProps) => {
  const { partyId } = useParams();

  const {
    data: scheduleList,
    isLoading,
    isError,
  } = useQuery<ScheduleType>(['scheduleList', partyId], () =>
    fetchScheduleList(Number(partyId), false)
  );

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;

  const getExpensesArray = (locations: ScheduleLocationType[]) => {
    return locations.map(({ spending }) => spending);
  };

  const CalculateTotalExpenses = (locations: ScheduleLocationType[]) => {
    const TotalExpenses = getExpensesArray(locations);

    return TotalExpenses.reduce((acc, cur) => acc + cur, 0);
  };

  const divideTotalExpenseByMembers = (totalExpenses: number, totalMembers: number) => {
    return Math.floor(totalExpenses / totalMembers);
  };

  const totalExpenses = CalculateTotalExpenses(scheduleList.locations);
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
            <Text
              fontSize='sm'
              borderBottom='1px solid'
              borderStyle='dashed'
              pb='0.625rem'>
              {startDate} ~ {endDate} {stayDurationDate}
            </Text>
            <Box
              minH='15.625rem'
              borderBottom='1px solid'
              borderStyle='dashed'
              mb='0.625rem'>
              <PartyReceiptItem locations={scheduleList.locations} />
            </Box>
            <Flex justify='space-between'>
              <Flex>ToTal:</Flex>
              {getPriceText(totalExpenses)}
            </Flex>
            <Flex justify='space-between'>
              <Flex>1/{totalMembers}:</Flex>
              {getPriceText(divideTotalExpenseByMembers(totalExpenses, totalMembers))}
            </Flex>
          </ModalBody>
          <ReceiptTriangle y={6} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PartyReceipt;
