import { useEffect } from 'react';

import PlaceList from '@/components/party/partyPlan/PlanPlaceList';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import useMapScript from '@/hooks/useMapScript';
import { PLACES_DUMMY_DATA } from '@/utils/constants/place';

const PartyPlanPage = () => {
  const { script } = useMapScript();

  useEffect(() => {
    if (!script) return;

    // script.addEventListener('load', () => {
    // kakao.maps.load(() => {}); // FIXME: 동적 로딩
    // });
  }, [script]);

  // TODO: 등록한 후보지가 없을 때 처리
  return (
    <>
      <PlacePreviewMap
        latitude={PLACES_DUMMY_DATA[0].latitude}
        longitude={PLACES_DUMMY_DATA[0].longitude}
        mapMarkers={PLACES_DUMMY_DATA}
        level={8}
        draggable
      />
      <PlaceList places={PLACES_DUMMY_DATA} />
    </>
  );
};

export default PartyPlanPage;
