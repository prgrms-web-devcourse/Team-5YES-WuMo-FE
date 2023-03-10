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
import { AmountType, ChangeAmountType } from '@/types/schedule';

const PlaceAmountField = ({ spending }: { spending: number }) => {
  const { mutate: changeAmount } = useMutation(patchChangeAmount);
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<AmountType>({
    defaultValues: {
      amount: spending,
    },
  });

  const onSubmitAmount = ({ amount }: AmountType) => {
    if (!isDirty) return;
    const amountBody: ChangeAmountType = {
      locationId: state.locationId,
      spending: Number(amount),
    };
    changeAmount(amountBody);
    alert(`${amount}원으로 변경되었습니다.`);
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
            type='number'
            borderRadius='0.9375rem'
            placeholder='사용 금액을 입력하세요'
            {...register('amount')}
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
