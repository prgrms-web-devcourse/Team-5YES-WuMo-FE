import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  ModalBody,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { Calendar } from 'react-calendar';
import {
  MdAddPhotoAlternate,
  MdCalendarToday,
  MdCreditCard,
  MdImage,
  MdOutlineCategory,
  MdOutlineComment,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { createImage, deleteImage } from '@/api/image';
import { patchPlace } from '@/api/place';
import ModalButton from '@/components/base/ModalButton';
import useImageUpload from '@/hooks/useImageUpload';
import { PlacePatchBody } from '@/types/place';
import { PLACE_ERROR_MESSAGES } from '@/utils/constants/messages';
import { PLACE_DESCRIPTION_MAX_LENGTH } from '@/utils/constants/party';
import { formatPrice } from '@/utils/formatter';

import CategoryGrid from '../create/category/CategoryGrid';

type PlaceEditModalProps = {
  place: PlacePatchBody;
  partyId: number;
};

const PlaceEditModal = ({ place, partyId }: PlaceEditModalProps) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(place.category);
  const [dateTime, setDateTime] = useState({
    date: new Date(place.visitDate),
    hour: new Date(place.visitDate).getHours(),
    min: new Date(place.visitDate).getMinutes(),
  });
  const [cost, setCost] = useState(place.expectedCost);
  const [description, setDescription] = useState(place.description);

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    values: imageValues,
    onFileChange,
    onFileChoose,
    onFileDelete,
  } = useImageUpload({
    initialValues: {
      imageBase64: place.image,
      imageFile: null,
    },
    inputRef,
  });

  const onDateTimeChange = (type: 'date' | 'hour' | 'min', newValue: Date | number) => {
    setDateTime({ ...dateTime, [type]: newValue });
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > PLACE_DESCRIPTION_MAX_LENGTH) return;
    setDescription(e.target.value);
  };

  const onClickButton = async () => {
    if (!imageValues.imageBase64) return PLACE_ERROR_MESSAGES.IMAGE_FILE_REQUIRED;
    await onSubmit();
  };

  const onSubmitImageFile = async () => {
    if (!imageValues.imageFile) return null;
    const formData = new FormData();
    formData.append('image', imageValues.imageFile);
    const imageUrl = await createImage(formData);
    return imageUrl;
  };

  const getDateTime = () => {
    const newDate = new Date(dateTime.date);
    newDate.setHours(dateTime.hour, dateTime.min);
    return newDate.toISOString();
  };

  const onSubmit = async () => {
    const newImageUrl = await onSubmitImageFile();

    const placePatchBody = {
      id: place.id,
      image: newImageUrl || place.image,
      category,
      description,
      visitDate: getDateTime(),
      expectedCost: cost,
      partyId,
    };

    const data = await patchPlace(placePatchBody);
    if (!data) {
      console.error('후보지 수정 실패');
      return;
    }
    if (data.image !== place.image) await deleteImage(place.image);
    navigate(-1);
  };

  return (
    <>
      <ModalBody>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton justifyContent='space-between'>
              <Flex gap='1.5' align='center'>
                <AccordionIcon />
                <MdOutlineCategory />
                카테고리
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <CategoryGrid value={category} setValueHandler={setCategory} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton justifyContent='space-between'>
              <Flex gap='1.5' align='center'>
                <AccordionIcon />
                <MdCalendarToday />
                방문 예정일
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <>
                <Calendar
                  locale='ko'
                  calendarType='US'
                  value={dateTime.date}
                  formatDay={(_, date) => dayjs(date).format('DD')}
                  onChange={(v: Date) => onDateTimeChange('date', v)}
                />
                <Flex gap='5' justify='center' mt='4'>
                  <Flex align='center' gap='1'>
                    <Select
                      variant='outline'
                      value={dateTime.hour}
                      onChange={(e) => onDateTimeChange('hour', Number(e.target.value))}
                      size='md'>
                      {Array.from({ length: 23 }, (_, i) => i).map((v) => (
                        <option key={`hour-${v}`} value={v}>
                          {v}
                        </option>
                      ))}
                    </Select>
                    <Text>시</Text>
                  </Flex>
                  <Flex align='center' gap='1'>
                    <Select
                      variant='outline'
                      value={dateTime.min}
                      onChange={(e) => onDateTimeChange('min', Number(e.target.value))}
                      size='md'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((v) => (
                        <option key={`min-${v}`} value={v}>
                          {v}
                        </option>
                      ))}
                    </Select>
                    <Text>분</Text>
                  </Flex>
                </Flex>
              </>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton justifyContent='space-between'>
              <Flex gap='1.5' align='center'>
                <AccordionIcon />
                <MdCreditCard />
                예상 비용
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <NumberInput
                step={1000}
                value={formatPrice(Number(cost))}
                onChange={(v) => setCost(Number(v))}
                min={0}
                borderColor='gray.300'
                focusBorderColor='primary.red'>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton justifyContent='space-between'>
              <Flex gap='1.5' align='center'>
                <AccordionIcon />
                <MdImage />
                대표 사진
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <>
                <Box onClick={onFileChoose}>
                  <input
                    hidden
                    ref={inputRef}
                    type='file'
                    name='image'
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={onFileChange}
                  />
                  {imageValues.imageBase64 ? (
                    <Image
                      src={imageValues.imageBase64}
                      alt='이미지 미리보기'
                      maxH='sm'
                      margin='0 auto'
                    />
                  ) : (
                    <Flex
                      h='3xs'
                      direction='column'
                      justify='center'
                      align='center'
                      gap='4'
                      backgroundColor='gray.100'
                      borderRadius='base'
                      cursor='pointer'>
                      <Icon as={MdAddPhotoAlternate} boxSize={8} />
                      클릭하여 이미지를 추가하세요.
                    </Flex>
                  )}
                </Box>
                {imageValues.imageBase64 && (
                  <Flex justify='flex-end' paddingTop='3'>
                    <Button color='warning' onClick={onFileDelete}>
                      삭제
                    </Button>
                  </Flex>
                )}
              </>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton justifyContent='space-between'>
              <Flex gap='1.5' align='center'>
                <AccordionIcon />
                <MdOutlineComment />
                메모
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <>
                <Textarea
                  placeholder='메모를 입력하세요.'
                  value={description}
                  onChange={onDescriptionChange}
                  resize='none'
                  border='1px solid lightgrey'
                  focusBorderColor='primary.red'
                  w='full'
                  rows={2}
                  borderRadius='md'
                  outline='none'
                  padding='4'
                  lineHeight='base'
                />
                <Flex justify='flex-end' fontSize='sm' color='gray.600'>
                  {description.length}/{PLACE_DESCRIPTION_MAX_LENGTH}자
                </Flex>
              </>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          text='수정'
          isDisabled={!imageValues.imageBase64}
          clickButtonHandler={onClickButton}
        />
      </ModalFooter>
    </>
  );
};

export default PlaceEditModal;
