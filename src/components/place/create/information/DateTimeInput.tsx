import 'react-calendar/dist/Calendar.css';

import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/number-input';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import { createPlaceState } from '@/store/recoilPlaceState';
import { Place } from '@/types/place';

const DateTimeInput = () => {
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState<Place>(createPlaceState);
  const [values, setValues] = useState({
    date: new Date(),
    hour: 0,
    min: 0,
  });

  const handleChange = (type: 'date' | 'hour' | 'min', newValue: Date | number) => {
    setValues({ ...values, [type]: newValue });

    const newDate = new Date(values.date);
    newDate.setHours(values.hour);
    newDate.setMinutes(values.min);
    setCreatePlaceBody({
      ...createPlaceBody,
      visitDate: newDate.toString(),
    });
  };

  return (
    <VStack>
      <Calendar
        locale='ko'
        calendarType='US'
        value={values.date}
        formatDay={(_, date) => dayjs(date).format('DD')}
        onChange={(v: Date) => handleChange('date', v)}
      />
      <HStack>
        <NumberInput
          size='sm'
          step={1}
          min={0}
          max={23}
          value={values.hour}
          onChange={(v) => handleChange('hour', Number(v))}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>시</Text>
        <NumberInput
          size='sm'
          step={5}
          min={0}
          max={59}
          value={values.min}
          onChange={(v) => handleChange('min', Number(v))}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>분</Text>
      </HStack>
    </VStack>
  );
};

export default DateTimeInput;
