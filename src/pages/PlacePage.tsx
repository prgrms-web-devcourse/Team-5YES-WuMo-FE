import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { deleteImage } from '@/api/image';
import { deletePlace, fetchPlace } from '@/api/place';
import BackNavigation from '@/components/navigation/BackNavigation';
import CommentForm from '@/components/place/CommentForm';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import PlaceInfoTable from '@/components/place/PlaceInfoTable';
import useMapScript from '@/hooks/useMapScript';
import { PlaceInformation } from '@/types/place';
import { getGitEmoji } from '@/utils/constants/emoji';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import ROUTES from '@/utils/constants/routes';

const PlacePage = () => {
  useMapScript();

  const { placeId } = useParams();
  const { state } = useLocation();

  const { data, isLoading, isError } = useQuery<PlaceInformation>(
    ['placeInformation', placeId],
    () => fetchPlace(Number(placeId))
  );

  const { mutateAsync: removePlace } = useMutation(deletePlace);
  const navigate = useNavigate();

  const moreMenuEvent = {
    onEditEvent: () =>
      navigate(ROUTES.PLACE_EDIT, {
        state: { place: data, partyId: Number(state.partyId) },
      }),
    onRemoveEvent: async () => {
      const canRemove = confirm('후보지를 삭제할까요?');
      if (!canRemove) return;
      await onRemovePlace(Number(placeId));
    },
  };

  const onRemovePlace = async (placeId: number) => {
    if (!data) return;
    await removePlace(placeId, {
      onSuccess: async () => {
        await deleteImage(data.image);
        navigate(`/party/${state.partyId}/plan`, { replace: true });
      },
    });
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <>
      {data.isEditable ? (
        <BackNavigation
          option={BACKNAVIGATION_OPTIONS.MORE}
          moreMenuEvent={moreMenuEvent}
        />
      ) : (
        <BackNavigation />
      )}
      <Box height='2xs' marginTop='14'>
        <Image src={data.image} height='3xs' width='full' objectFit='cover' />
        <Image src={getGitEmoji(data.category)} position='relative' left='5' bottom='8' />
      </Box>
      <Flex direction='column' padding='5' paddingTop='0' gap='2'>
        <Heading as='h2' size='lg' paddingTop='3' paddingBottom='3'>
          {data.name}
        </Heading>
        <PlacePreviewMap latitude={data.latitude} longitude={data.longitude} draggable />
        <PlaceInfoTable data={data} />
        <CommentForm />
      </Flex>
    </>
  );
};

export default PlacePage;
