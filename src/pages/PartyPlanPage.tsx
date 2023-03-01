import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

import PlaceList from '@/components/party/partyPlan/PlanPlaceList';
import PlaceCreateModal from '@/components/placeCreate/PlaceCreateModal';
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
      <PlaceList places={PLACES_DUMMY_DATA} openModalHandler={onOpen} />
      <PlaceCreateModal isOpen={isOpen} closeModalHandler={onClose} />
    </>
  );
};

export default PartyPlanPage;
