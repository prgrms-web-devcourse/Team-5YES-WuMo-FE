import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdCalendarToday, MdCreditCard, MdImage, MdOutlineComment } from 'react-icons/md';

import { Place, PlaceInfoStepItem } from '@/types/place';
import { PLACE_DUMMY_DATA } from '@/utils/constants/place';

import DateTimeInput from './DateTimeInput';
import ImageInput from './ImageInput';
import PriceInput from './PriceInput';
import TextareaInput from './TextareaInput';

const PlaceInfoStep = () => {
  const [value, setValue] = useState<Place>(PLACE_DUMMY_DATA);

  const handleValue = (key: string, newValue: string | number) => {
    setValue({ ...value, [key]: newValue });
  };

  const PlaceInfoStepItems: PlaceInfoStepItem[] = [
    {
      type: 'visit_date',
      icon: <MdCalendarToday />,
      text: '일정',
      value: value.visit_date,
      content: <DateTimeInput />,
    },
    {
      type: 'expected_cost',
      icon: <MdCreditCard />,
      text: '예산',
      value: value.expected_cost,
      content: <PriceInput />,
    },
    {
      type: 'image_url',
      icon: <MdImage />,
      text: '대표 사진',
      value: value.image_url,
      content: <ImageInput />,
    },
    {
      type: 'description',
      icon: <MdOutlineComment />,
      text: '메모',
      value: value.description,
      content: <TextareaInput initialValue={value.description} />,
    },
  ];

  return (
    <Accordion allowToggle>
      {PlaceInfoStepItems.map(({ type, icon, text, value, content }) => (
        <AccordionItem key={type}>
          <AccordionButton justifyContent='space-between'>
            <Flex gap='1.5' align='center'>
              <AccordionIcon />
              {icon}
              {text}
            </Flex>
            {(type === 'visit_date' || type === 'expected_cost') && <Text>{value}</Text>}
          </AccordionButton>
          <AccordionPanel>{content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PlaceInfoStep;
