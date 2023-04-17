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
import { useForm } from 'react-hook-form';
import { MdCreditCard } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { patchChangeAmount } from '@/api/schedules';
import Toast from '@/components/base/toast/Toast';
import { AmountType, ChangeAmountType } from '@/types/schedule';
import { formatPrice } from '@/utils/formatter';

const PlaceAmountField = ({ spending }: { spending: number }) => {
  const { mutate: changeAmount } = useMutation(patchChangeAmount, {
    onSuccess: () => {
      Toast.show({
        message: `변경이 완료되었어요.`,
        type: 'success',
      });
    },
    onError: () => {
      Toast.show({
        message: `사용금액 변경에 실패했어요! 다시 시도해주세요.`,
        type: 'error',
      });
    },
  });
  const { state } = useLocation();
  const { handleSubmit, register, setValue } = useForm<AmountType>({
    defaultValues: {
      amount: formatPrice(spending),
    },
  });

  const onSubmitAmount = ({ amount }: AmountType) => {
    const amountBody: ChangeAmountType = {
      locationId: state.locationId,
      spending: Number(amount),
    };
    changeAmount(amountBody);
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
            borderRadius='0.9375rem'
            placeholder='사용 금액을 입력하세요'
            {...register('amount', {
              onChange: ({ target }) => {
                const value = target.value.replace(/[^0-9]/g, '');
                setValue('amount', formatPrice(Number(value)));
              },
            })}
          />
          <InputRightElement>원</InputRightElement>
        </InputGroup>
        <Button
          type='submit'
          variant='outline'
          size='sm'
          borderRadius='0.9375rem'
          marginLeft='auto'>
          변경
        </Button>
      </Flex>
    </Container>
  );
};

export default PlaceAmountField;
