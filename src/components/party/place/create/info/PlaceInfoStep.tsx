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
import { PLACE_DUMMY_DATA } from '@/utils/constants/place';
import { formatPrice } from '@/utils/formatter';

import DateTimeInput from './DateTimeInput';
import ImageInput from './ImageInput';
import PriceInput from './PriceInput';
import TextareaInput from './TextareaInput';

const PlaceInfoStep = () => {
  const [values, setValues] = useState<Place>(PLACE_DUMMY_DATA);

  const handleValue = (key: PlaceInfoType, newValue: InputValueType) => {
    setValues({ ...values, [key]: newValue });
  };

  const PlaceInfoStepItems: PlaceInfoStepItem[] = [
    {
      type: 'visit_date',
      icon: <MdCalendarToday />,
      text: '일정',
      content: <DateTimeInput value={values.visit_date} setValueHandler={handleValue} />,
    },
    {
      type: 'expected_cost',
      icon: <MdCreditCard />,
      text: '예산',
      content: (
        <PriceInput value={String(values.expected_cost)} setValueHandler={handleValue} />
      ),
    },
    {
      type: 'image_url',
      icon: <MdImage />,
      text: '대표 사진',
      content: <ImageInput value={values.image_url} setValueHandler={handleValue} />,
    },
    {
      type: 'description',
      icon: <MdOutlineComment />,
      text: '메모',
      content: <TextareaInput value={values.description} setValueHandler={handleValue} />,
    },
  ];

  const getPriceText = (price: number) => `${formatPrice(String(price))}원`;
  const getDateTimeText = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

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
            {type === 'expected_cost' && (
              <Text>{getPriceText(values['expected_cost'])}</Text>
            )}
            {type === 'visit_date' && (
              <Text>{getDateTimeText(values['visit_date'])}</Text>
            )}
          </AccordionButton>
          <AccordionPanel>{content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PlaceInfoStep;
