import 'react-calendar/dist/Calendar.css';

import { Container, Input, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { Calendar } from 'react-calendar';

const PartyNameModal = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <Container p='0' mb='8'>
        <Text fontSize='0.875rem' mb='2' color='#808080'>
          모임 이름
        </Text>
        <Input
          p='3'
          size='xl'
          border='0.0625rem solid #cfcfcf'
          focusBorderColor='primary.red'
          borderRadius='8'
          placeholder='모임 이름을 입력해주세요.'
        />
      </Container>
      <Container p='0' mb='8'>
        <Text fontSize='0.875rem' mb='2' color='#808080'>
          모임 설명
        </Text>
        <Textarea
          p='3'
          border='0.0625rem solid #cfcfcf'
          borderRadius='8'
          w='100%'
          rows={6}
          resize='none'
          outlineColor='primary.red'
          placeholder='어떤 모임인지 설명해주세요.'
        />
      </Container>
      <Container>
        <Calendar onChange={onChange} value={value} />
      </Container>
    </>
  );
};

export default PartyNameModal;
