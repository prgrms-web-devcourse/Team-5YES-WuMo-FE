import 'react-calendar/dist/Calendar.css';

import { Box, Button, Flex, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState, useRecoilValue } from 'recoil';

import { createPartyState, stepState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { processStep } from '@/utils/constants/processStep';

const PartyPeriodModal = () => {
  const prevDate = useRecoilValue(createPartyState);
  const [value, setValue] = useState(() => {
    if (!prevDate) return [new Date(), new Date()];
    else return [new Date(prevDate.startDate), new Date(prevDate.endDate)];
  });

  const [createPartyBody, setCreatePartyBody] =
    useRecoilState<PartyCreateBody>(createPartyState);
  const [step, setStep] = useRecoilState<number>(stepState);

  const onClickNextStep = () => {
    const [startDate, endDate] = value;

    setCreatePartyBody({
      ...createPartyBody,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    });
  };

  return (
    <>
      <ModalBody>
        <Flex flexDirection='column' justify='center' alignItems='center'>
          <Box mb='10' textAlign='center'>
            <Calendar
              onChange={(value: Date[]) => setValue(value)}
              formatDay={(_, date) => dayjs(date).format('D')}
              allowPartialRange={true}
              selectRange={true}
              calendarType='US'
            />
          </Box>
          <Flex gap={4} flexDirection='column' alignItems='center'>
            <Box>
              <Text fontSize='sm' color='#3b3b3b' mb='2'>
                모임 시작 날짜
              </Text>
              <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                {dayjs(value[0]).format('YYYY년 M월 D일')}
              </Text>
            </Box>
            <Text>~</Text>
            <Box>
              <Text fontSize='sm' color='#3b3b3b' mb='2'>
                모임 종료 날짜
              </Text>
              <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                {dayjs(value[1]).format('YYYY년 M월 D일')}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button
          bg='primary.red'
          color='#ffffff'
          _hover={{
            bg: 'primary.redHover',
          }}
          w='full'
          onClick={() => {
            if (step !== processStep.partyCreateMax) {
              onClickNextStep();
              setStep(step + 1);
            }
          }}>
          다음
        </Button>
      </ModalFooter>
    </>
  );
};

export default PartyPeriodModal;
