import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import ModalButton from '@/components/base/ModalButton';
import { createPlaceState } from '@/store/recoilPlaceState';
import { PlaceInformationStepItems } from '@/utils/constants/processStep';

const PlaceInformationModal = () => {
  const createPlaceBody = useRecoilValue(createPlaceState);

  const handleClick = () => {
    if (!createPlaceBody.visitDate) return '방문 예정일을 입력해 주세요.';
    if (!createPlaceBody.expectedCost) return '예상 비용을 입력해 주세요.';
    if (!createPlaceBody.image) return '대표 이미지를 선택해 주세요.';
    console.log(createPlaceBody); // TODO: API 연동
  };

  return (
    <>
      <ModalBody>
        <Accordion allowToggle>
          {PlaceInformationStepItems.map(({ type, icon, text, content }) => (
            <AccordionItem key={type}>
              <AccordionButton justifyContent='space-between'>
                <Flex gap='1.5' align='center'>
                  <AccordionIcon />
                  {icon}
                  {text}
                </Flex>
              </AccordionButton>
              <AccordionPanel>{content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          text='후보지 추가'
          // isDisabled={
          //   !createPlaceBody.visitDate ||
          //   !createPlaceBody.expectedCost ||
          //   !createPlaceBody.image
          // }
          clickButtonHandler={handleClick}
        />
      </ModalFooter>
    </>
  );
};

export default PlaceInformationModal;
