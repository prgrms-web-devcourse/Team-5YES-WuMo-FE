import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { MdAdd } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchPlaces } from '@/api/place';
import PlanPlaceList from '@/components/party/partyPlan/PlanPlaceList';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import { Places } from '@/types/place';
import ROUTES from '@/utils/constants/routes';

const PartyPlanPage = () => {
  const navigate = useNavigate();
  const { partyId } = useParams();

  const { data, isLoading, isError } = useQuery<Places>(['placeList', partyId], () =>
    fetchPlaces(0, 10000, Number(partyId))
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return data.locations?.length ? (
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
    <Flex direction='column' align='center' justify='center'>
      <Heading size='md' textAlign='center' pt='2.25rem' pb='1rem'>
        방문하고자 하는 장소를 추가해보세요
      </Heading>
      <Button
        size='md'
        backgroundColor='primary.red'
        leftIcon={<MdAdd />}
        color='white'
        onClick={() =>
          navigate(ROUTES.PLACE_NEW, { state: { partyId: Number(partyId) } })
        }>
        후보지 추가하러 가기
      </Button>
      <Image boxSize='13rem' src='/landing-3.svg' alt='후보지를 추가해 주세요.' />
    </Flex>
  );
};

export default PartyPlanPage;
