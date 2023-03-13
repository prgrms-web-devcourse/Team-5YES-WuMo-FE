import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
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
    <Box>
      <Flex justify='flex-end' mt='2'>
        <Button
          variant='ghost'
          size='md'
          leftIcon={<MdAdd />}
          color='gray.500'
          onClick={() =>
            navigate(ROUTES.PLACE_NEW, { state: { partyId: Number(partyId) } })
          }>
          후보지 추가하기
        </Button>
      </Flex>
      <Flex direction='column' align='center' justify='center'>
        <Heading as='h3' fontSize='2xl'>
          후보지를 추가해 주세요.
        </Heading>
        <Image src='/landing-3.svg' alt='후보지를 추가해 주세요.' />
      </Flex>
    </Box>
  );
};

export default PartyPlanPage;
