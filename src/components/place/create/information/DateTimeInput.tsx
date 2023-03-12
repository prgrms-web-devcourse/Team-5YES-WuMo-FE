import 'react-calendar/dist/Calendar.css';

import { Flex, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import { createPlaceState } from '@/store/recoilPlaceState';

const DateTimeInput = () => {
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

    const newDate = new Date(values.date);
    newDate.setHours(values.hour, values.min);
    setCreatePlaceBody({
      ...createPlaceBody,
      visitDate: newDate.toISOString(),
    });
  };

  return (
    <>
      <Calendar
        locale='ko'
        calendarType='US'
        value={values.date}
        formatDay={(_, date) => dayjs(date).format('DD')}
        onChange={(v: Date) => handleChange('date', v)}
      />
      <Flex gap='5' justify='center' mt='4'>
        <Flex align='center' gap='1'>
          <Select
            variant='outline'
            value={values.hour}
            onChange={(e) => handleChange('hour', Number(e.target.value))}
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
            onChange={(e) => handleChange('min', Number(e.target.value))}
            size='md'>
            {Array.from({ length: 12 }, (_, i) => i * 5).map((v) => (
              <option key={`hour-${v}`} value={v}>
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
