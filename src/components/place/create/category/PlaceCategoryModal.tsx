import { Flex, Grid, GridItem, Image, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import ModalButton from '@/components/base/ModalButton';
import { createPlaceState, createPlaceStepState } from '@/store/recoilPlaceState';
import {
  categoryInfo,
  getCategoryImageURL,
  selectedCategoryStyle,
} from '@/utils/constants/place';

const PlaceCategoryModal = () => {
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [value, setValue] = useState(createPlaceBody.category);

  const handleClick = () => {
    if (!value) {
      alert('카테고리를 선택해 주세요.');
      return;
    }
    setCreatePlaceBody({ ...createPlaceBody, category: value });
    setStep(step + 1);
  };

  return (
    <>
      <ModalBody>
        <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
          {Object.entries(categoryInfo).map(
            ([name, information]) =>
              'text' in information &&
              'imageID' in information && (
                <GridItem
                  key={information.imageID}
                  cursor='pointer'
                  borderRadius='2xl'
                  paddingTop='3.5'
                  paddingBottom='3.5'
                  backgroundColor='gray.50'
                  _hover={{ backgroundColor: 'gray.100', fontWeight: 'bold' }}
                  onClick={() => setValue(name)}
                  {...(value === name && selectedCategoryStyle)}>
                  <Flex direction='column' align='center' justify='center' gap='4'>
                    <Image
                      src={getCategoryImageURL(information.imageID)}
                      alt={information.text}
                      width='2rem'
                    />
                    {information.text}
                  </Flex>
                </GridItem>
              )
          )}
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalButton text='다음' isDisabled={!value} clickButtonHandler={handleClick} />
      </ModalFooter>
    </>
  );
};

export default PlaceCategoryModal;
