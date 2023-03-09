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
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { createImage } from '@/api/image';
import { createPlace } from '@/api/place';
import ModalButton from '@/components/base/ModalButton';
import { createPlaceState } from '@/store/recoilPlaceState';
import { PLACE_SEARCH_MESSAGES } from '@/utils/constants/messages';
import { getSearchAddress, MAX_ADDRESS_LENGTH } from '@/utils/constants/place';
import { PlaceInformationStepItems } from '@/utils/constants/processStep';

const PlaceInformationModal = () => {
  const {
    name,
    address,
    latitude,
    longitude,
    imageFile,
    category,
    description,
    visitDate,
    expectedCost,
  } = useRecoilValue(createPlaceState);
  const navigate = useNavigate();

  const { mutateAsync: createImageUrl, reset: imageReset } = useMutation(createImage);
  const { mutateAsync: createNewPlace } = useMutation(createPlace);

  const onClickButton = async () => {
    if (!visitDate) return PLACE_SEARCH_MESSAGES.VISIT_DATE_REQUIRED;
    if (!expectedCost) return PLACE_SEARCH_MESSAGES.EXPECTED_COST_REQUIRED;
    if (!imageFile) return PLACE_SEARCH_MESSAGES.IMAGE_FILE_REQUIRED;

    await onSubmitNewPlace();
  };

  const onSubmitImageFile = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('image', imageFile);
    const imageUrl = await createImageUrl(formData);
    return imageUrl;
  };

  const onSubmitNewPlace = async () => {
    const imageUrl = await onSubmitImageFile();

    const placeBody = {
      name,
      latitude,
      longitude,
      category,
      description,
      visitDate,
      expectedCost,
      image: imageUrl,
      address: address.slice(0, MAX_ADDRESS_LENGTH),
      searchAddress: getSearchAddress(address),
      partyId: 17, // TODO: PartyId 받아와야 함
    };

    await createNewPlace(placeBody, {
      onSuccess: (data) => {
        if (!data?.id) return;
        navigate(`/place/${data.id}`);
      },
    });

    imageReset();
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
          isDisabled={!visitDate || !expectedCost || !imageFile}
          clickButtonHandler={onClickButton}
        />
      </ModalFooter>
    </>
  );
};

export default PlaceInformationModal;
