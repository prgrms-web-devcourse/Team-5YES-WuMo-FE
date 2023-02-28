import {
  AccordionPanel,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { MdCreditCard } from 'react-icons/md';

import { AmountType } from '@/types/schedule';

const PlaceAmountField = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<AmountType>({
    defaultValues: {
      amount: '', //서버에 저장된 값이 있을 경우 불러오도록 설정해야 함.
    },
  });

  const onSubmitAmount = ({ amount }: AmountType) => {
    if (!isDirty) return;
    //서버 통신
    alert(`${amount}원`);
  };

  return (
    <div>
      <AccordionPanel as='form' onSubmit={handleSubmit(onSubmitAmount)} p='0.5rem 0'>
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
      </AccordionPanel>
    </div>
  );
};

export default PlaceAmountField;
