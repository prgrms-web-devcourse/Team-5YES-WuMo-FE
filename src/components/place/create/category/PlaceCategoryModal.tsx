import { ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import ModalButton from '@/components/base/ModalButton';
import Toast from '@/components/base/toast/Toast';
import { createPlaceState, createPlaceStepState } from '@/store/recoilPlaceState';

import CategoryGrid from './CategoryGrid';

const PlaceCategoryModal = () => {
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);
  const [value, setValue] = useState(createPlaceBody.category);

  const handleClick = () => {
    if (!value) {
      Toast.show({
        message: '카테고리를 선택해 주세요.',
        type: 'warning',
      });
      return;
    }
    setCreatePlaceBody({ ...createPlaceBody, category: value });
    setStep(step + 1);
  };

  return (
    <>
      <ModalBody>
        <CategoryGrid value={value} setValueHandler={setValue} />
      </ModalBody>
      <ModalFooter>
        <ModalButton text='다음' isDisabled={!value} clickButtonHandler={handleClick} />
      </ModalFooter>
    </>
  );
};

export default PlaceCategoryModal;
