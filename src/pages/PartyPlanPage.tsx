import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchPlaces } from '@/api/place';
import PlanPlaceList from '@/components/party/partyPlan/PlanPlaceList';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import useMapScript from '@/hooks/useMapScript';
import { Places } from '@/types/place';

const PartyPlanPage = () => {
  useMapScript();
  const { partyId } = useParams();

  const { data, isLoading, isError } = useQuery<Places>(
    ['placeList'],
    () => fetchPlaces({ cursorId: 0, pageSize: 10000, partyId: Number(partyId) }),
    {
      staleTime: 10000,
    }
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return data ? (
    <>
      <PlacePreviewMap
        latitude={data.locations[0].latitude}
        longitude={data.locations[0].longitude}
        mapMarkers={data.locations}
        level={8}
        draggable
      />
      <PlanPlaceList places={data.locations} />
    </>
  ) : (
    <Box>후보지를 추가해 주세요.</Box>
  );
};

export default PartyPlanPage;
