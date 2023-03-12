import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { createPlaceState } from '@/store/recoilPlaceState';
import { MAX_EXPECTED_COST } from '@/utils/constants/place';
import { formatPrice, parsePrice } from '@/utils/formatter';

const PriceInput = () => {
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [value, setValue] = useState(createPlaceBody.expectedCost);

  const handleChange = (newValue: string) => {
    setValue(Number(newValue));
    setCreatePlaceBody({ ...createPlaceBody, expectedCost: parsePrice(value) });
  };

  return (
    <NumberInput
      step={1000}
      value={formatPrice(Number(value))}
      onChange={handleChange}
      min={0}
      max={MAX_EXPECTED_COST}
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
