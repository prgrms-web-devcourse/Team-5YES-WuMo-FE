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
import { Place } from '@/types/place';
import { PLACE_DUMMY_DATA } from '@/utils/constants/place';

const PlaceInfoStep = () => {
  const [value, setValue] = useState<Place>(PLACE_DUMMY_DATA);

  const handleValue = (key: string, newValue: string | number) => {
    setValue({ ...value, [key]: newValue });
  };

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
          <Text>{value.visit_date}</Text>
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
