import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

import { InputProps } from '@/types/place';
import { formatPrice, parsePrice } from '@/utils/formatter';

const PriceInput = ({ value, setValueHandler }: InputProps) => {
  return (
    <NumberInput
      step={1000}
      value={formatPrice(value)}
      onChange={(valueString) =>
        setValueHandler('expected_cost', parsePrice(valueString))
      }
      min={0}
      borderColor='gray.300'
      focusBorderColor='primary.red'>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default PriceInput;
