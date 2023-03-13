import 'react-calendar/dist/Calendar.css';

import { Box, Button, Flex, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState, useRecoilValue } from 'recoil';

import useButtonDisabled from '@/hooks/useButtonDisabled';
import { createPartyState, stepState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { processStep } from '@/utils/constants/processStep';

const PartyPeriodModal = () => {
  const prevDate = useRecoilValue(createPartyState);
  const [period, setPeriodValue] = useState(() => {
    if (!prevDate.startDate) return ['', ''];
    else return [new Date(prevDate.startDate), new Date(prevDate.endDate)];
  });

  const buttonDisabled = useButtonDisabled([String(period[0]), String(period[1])]);

  const [createPartyBody, setCreatePartyBody] =
    useRecoilState<PartyCreateBody>(createPartyState);
  const [step, setStep] = useRecoilState<number>(stepState);

  const onClickNextStep = () => {
    const [startDate, endDate] = period;

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
              onChange={(period: Date[]) => setPeriodValue(period)}
              formatDay={(_, date) => dayjs(date).format('D')}
              allowPartialRange={true}
              selectRange={true}
              calendarType='US'
            />
          </Box>
          <Box px='1rem' py='0.5rem' mb='10' borderRadius='10px' bg='#ffe6e6'>
            <strong>시작 날짜</strong>와 <strong>종료 날짜</strong>를 한번씩 선택해주세요.
          </Box>
          <Flex
            gap='1.5rem'
            alignItems='flex-start'
            flexDirection='column'
            w='100%'
            px='4'>
            <Box>
              <Text fontSize='sm' color='#3b3b3b' mb='2'>
                모임 시작 날짜
              </Text>
              <Text fontWeight='bold' fontSize='lg' color='#0000000' wordBreak='keep-all'>
                {period[0]
                  ? dayjs(period[0]).format('YYYY년 M월 D일')
                  : '날짜를 선택해주세요.'}
              </Text>
            </Box>
            <Box>
              <Text fontSize='sm' color='#3b3b3b' mb='2'>
                모임 종료 날짜
              </Text>
              <Text fontWeight='bold' fontSize='lg' color='#0000000'>
                {period[1]
                  ? dayjs(period[1]).format('YYYY년 M월 D일')
                  : '날짜를 선택해주세요.'}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={buttonDisabled}
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
