import 'react-calendar/dist/Calendar.css';

import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/number-input';
import Calendar from 'react-calendar';

import { InputProps } from '@/types/place';

const DateTimeInput = ({ value, setValueHandler }: InputProps) => {
  return (
    <VStack>
      <Calendar
        locale='ko'
        calendarType='US'
        value={new Date(value)}
        onChange={(v: Date) => setValueHandler('visit_date', v)}
      />
      <HStack>
        <NumberInput
          size='sm'
          step={5}
          min={0}
          max={23}
          value={new Date(value).getHours()}
          onChange={(valueString) =>
            setValueHandler('visit_date', new Date(value).setHours(Number(valueString)))
          }>
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
          value={new Date(value).getMinutes()}
          onChange={(valueString) =>
            setValueHandler('visit_date', new Date(value).setMinutes(Number(valueString)))
          }>
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
