import 'react-calendar/dist/Calendar.css';

import { Flex, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import { fetchPartyInformation } from '@/api/party';
import Loading from '@/components/base/Loading';
import { createPlaceState } from '@/store/recoilPlaceState';
import { PartyInformationType } from '@/types/party';

type DateTimeInputProps = {
  partyId: number;
};

const DateTimeInput = ({ partyId }: DateTimeInputProps) => {
  const {
    data: partyInformation,
    isLoading: partyInformationLoading,
    isError: partyInformationError,
  } = useQuery<PartyInformationType>(
    ['partyInformation', partyId],
    () => fetchPartyInformation(partyId),
    {
      staleTime: 10000,
    }
  );

  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [values, setValues] = useState(
    createPlaceBody.visitDate
      ? {
          date: new Date(createPlaceBody.visitDate),
          hour: new Date(createPlaceBody.visitDate).getHours(),
          min: new Date(createPlaceBody.visitDate).getMinutes(),
        }
      : {
          date: new Date(),
          hour: 0,
          min: 0,
        }
  );

  const handleChange = (type: 'date' | 'hour' | 'min', newValue: Date | number) => {
    setValues({ ...values, [type]: newValue });
  };

  if (partyInformationLoading) return <Loading />;
  if (partyInformationError) return <></>;

  return (
    <>
      <Text fontSize='sm' pb='1rem'>
        모임 시작일과 종료일 사이로 지정할 수 있어요.
      </Text>
      <Calendar
        locale='ko'
        calendarType='US'
        value={values.date}
        formatDay={(_, date) => dayjs(date).format('DD')}
        onChange={(v: Date) => handleChange('date', v)}
        minDate={new Date(partyInformation.startDate)}
        maxDate={new Date(partyInformation.endDate)}
      />
      <Flex gap='5' justify='center' mt='4'>
        <Flex align='center' gap='1'>
          <Select
            variant='outline'
            value={values.hour}
            onChange={(e) => {
              handleChange('hour', Number(e.target.value));
              const newDate = values.date;
              newDate.setHours(Number(e.target.value));
              setCreatePlaceBody({
                ...createPlaceBody,
                visitDate: values.date.toISOString(),
              });
            }}
            size='md'>
            {Array.from({ length: 24 }, (_, i) => i).map((v) => (
              <option key={`hour-${v}`} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <Text>시</Text>
        </Flex>
        <Flex align='center' gap='1'>
          <Select
            variant='outline'
            value={values.min}
            onChange={(e) => {
              handleChange('min', Number(e.target.value));
              const newDate = values.date;
              newDate.setMinutes(Number(e.target.value));
              setCreatePlaceBody({
                ...createPlaceBody,
                visitDate: values.date.toISOString(),
              });
            }}
            size='md'>
            {Array.from({ length: 12 }, (_, i) => i * 5).map((v) => (
              <option key={`min-${v}`} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <Text>분</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default DateTimeInput;
