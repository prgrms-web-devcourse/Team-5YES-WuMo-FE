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

import { InputValueType, Place, PlaceInfoStepItem, PlaceInfoType } from '@/types/place';
import { formatDate, getPriceText } from '@/utils/formatter';

import DateTimeInput from './DateTimeInput';
import ImageInput from './ImageInput';
import PriceInput from './PriceInput';
import TextareaInput from './TextareaInput';

const PlaceInfoStep = () => {
  const [values, setValues] = useState<Place>({
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    image: '',
    category: '',
    description: '',
    visitDate: String(new Date(2023, 2, 1, 12, 30)),
    expectedCost: 0,
  });

  const handleValue = (key: PlaceInfoType, newValue: InputValueType) => {
    setValues({ ...values, [key]: newValue });
  };

  const PlaceInfoStepItems: PlaceInfoStepItem[] = [
    {
      type: 'visitDate',
      icon: <MdCalendarToday />,
      text: '일정',
      content: <DateTimeInput value={values.visitDate} setValueHandler={handleValue} />,
    },
    {
      type: 'expectedCost',
      icon: <MdCreditCard />,
      text: '예상 비용',
      content: (
        <PriceInput value={String(values.expectedCost)} setValueHandler={handleValue} />
      ),
    },
    {
      type: 'image',
      icon: <MdImage />,
      text: '대표 사진',
      content: <ImageInput value={values.image} setValueHandler={handleValue} />,
    },
    {
      type: 'description',
      icon: <MdOutlineComment />,
      text: '메모',
      content: <TextareaInput value={values.description} setValueHandler={handleValue} />,
    },
  ];

  return (
    <Accordion allowToggle>
      {PlaceInfoStepItems.map(({ type, icon, text, content }) => (
        <AccordionItem key={type}>
          <AccordionButton justifyContent='space-between'>
            <Flex gap='1.5' align='center'>
              <AccordionIcon />
              {icon}
              {text}
            </Flex>
            {type === 'expectedCost' && (
              <Text>{getPriceText(values['expectedCost'])}</Text>
            )}
            {type === 'visitDate' && <Text>{formatDate(values['visitDate'])}</Text>}
          </AccordionButton>
          <AccordionPanel>{content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PlaceInfoStep;
