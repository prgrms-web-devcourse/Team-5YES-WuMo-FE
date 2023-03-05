import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

import ConfirmModal from '@/components/base/ConfirmModal';
import PlacePreviewMap from '@/components/placeCreate/search/PlacePreviewMap';
import useMapScript from '@/hooks/useMapScript';
import { PLACES_DUMMY_DATA } from '@/utils/constants/place';

const PartyPlanPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { script } = useMapScript();

  useEffect(() => {
    if (!script) return;

    // script.addEventListener('load', () => {
    // kakao.maps.load(() => {}); // FIXME: 동적 로딩
    // });
  }, [script]);

  return (
    <>
      <PlacePreviewMap
        latitude={PLACES_DUMMY_DATA[0].latitude}
        longitude={PLACES_DUMMY_DATA[0].longitude}
        mapMarkers={PLACES_DUMMY_DATA}
        draggable
      />
      <Button onClick={onOpen}>모달 테스트</Button>
      {/* <PlaceList places={PLACES_DUMMY_DATA} openModalHandler={onOpen} />
      <PlaceCreateModal isOpen={isOpen} closeModalHandler={onClose} /> */}
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={
          <Box textAlign='center'>
            <Text>장소: 정통집</Text>
            <Text>날짜: 2023년 3월 5일 오후 6시</Text>
            <Text>이 후보지를 일정을 추가할까요?</Text>
          </Box>
        }
        buttonText={{ secondary: '수정', primary: '추가' }}
        clickButtonHandler={{ primary: () => console.log('추가 완료') }}
      />
    </>
  );
};

export default PartyPlanPage;
