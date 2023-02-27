import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdCalendarToday, MdCreditCard, MdImage, MdOutlineComment } from 'react-icons/md';

import CustomTextarea from '@/components/base/CustomTextarea';

type Info = {
  visit_date: string;
  expected_cost: string;
  image_url: string;
  description: string;
};

const PlaceInfoStep = () => {
  const [info] = useState<Info>({
    visit_date: '2023년 2월 27일(월) 14:00 - 18:00',
    expected_cost: '15000',
    image_url:
      'https://user-images.githubusercontent.com/63575891/221435458-5d5724c6-65cb-46e8-9c2a-c52d43bea9c5.jpg',
    description: '사이드도 같이 시켜 먹으면 좋을 것 같음!',
  });

  const [cost, setCost] = useState('15000');

  const format = (val: string) => val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const parse = (val: string) => val.replace(/^\$/, '');

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton justifyContent='space-between'>
          <Flex gap='1.5' align='center'>
            <AccordionIcon />
            <MdCalendarToday />
            일정
          </Flex>
          <Text>{info.visit_date}</Text>
        </AccordionButton>
        <AccordionPanel>
          <Stack direction='row'>
            <NumberInput size='md' defaultValue={0} min={0} max={23}>
              <NumberInputField />
            </NumberInput>
            시
            <NumberInput size='md' defaultValue={0} min={0} max={59}>
              <NumberInputField />
            </NumberInput>
            분
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton justifyContent='space-between'>
          <Flex gap='1.5' align='center'>
            <AccordionIcon />
            <MdCreditCard />
            예산
          </Flex>
          <Text>{format(cost)}원</Text>
        </AccordionButton>
        <AccordionPanel>
          <NumberInput
            onChange={(valueString) => setCost(parse(valueString))}
            inputMode='decimal'
            value={format(cost)}
            borderColor='gray.300'
            focusBorderColor='primary.red'>
            <NumberInputField value={cost} />
          </NumberInput>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Flex gap='1.5' align='center'>
            <AccordionIcon />
            <MdImage />
            대표 사진
          </Flex>
        </AccordionButton>
        <AccordionPanel>장소를 대표하는 사진을 넣어주세요. 사진 입력 인풋</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Flex gap='1.5' align='center'>
            <AccordionIcon />
            <MdOutlineComment />
            메모
          </Flex>
        </AccordionButton>
        <AccordionPanel>
          0/50
          <CustomTextarea />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default PlaceInfoStep;
