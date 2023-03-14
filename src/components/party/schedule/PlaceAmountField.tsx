import {
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCreditCard } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { patchChangeAmount } from '@/api/schedules';
import Toast from '@/components/base/toast/Toast';
import { AmountType, ChangeAmountType } from '@/types/schedule';
import { formatPrice } from '@/utils/formatter';

const PlaceAmountField = ({ spending }: { spending: number }) => {
  const { mutate: changeAmount } = useMutation(patchChangeAmount);
  const [numberValue, setNumberValue] = useState(String(formatPrice(spending)));
  const { state } = useLocation();
  const { handleSubmit } = useForm<AmountType>();

  const onSubmitAmount = ({ amount }: AmountType) => {
    amount = Number(numberValue.replaceAll(',', ''));
    const amountBody: ChangeAmountType = {
      locationId: state.locationId,
      spending: Number(amount),
    };
    changeAmount(amountBody);
    Toast.show({
      message: `${numberValue}원으로 변경되었습니다.`,
      type: 'success',
    });
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmitAmount)} p='0.5rem 0'>
      <Flex align='center' mt='0.5rem'>
        <Text pr='0.625rem'>사용금액</Text>
        <InputGroup size='sm' maxW='12.5rem'>
          <InputLeftElement
            pointerEvents='none'
            color='gray'
            fontSize='1.5625rem'
            ml='0.25rem'>
            <MdCreditCard />
          </InputLeftElement>
          <Input
            type='text'
            value={numberValue}
            borderRadius='0.9375rem'
            placeholder='사용 금액을 입력하세요'
            onChange={(e) => {
              const prev = e.target.value.replaceAll(',', '');
              setNumberValue(formatPrice(Number(prev)));
            }}
          />
          <InputRightElement>원</InputRightElement>
        </InputGroup>
        <Button
          type='submit'
          variant='outline'
          size='sm'
          borderRadius='0.9375rem'
          marginLeft='auto'>
          수정
        </Button>
      </Flex>
    </Container>
  );
};

export default PlaceAmountField;
