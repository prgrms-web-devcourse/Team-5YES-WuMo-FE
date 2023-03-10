import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchPlace } from '@/api/place';
import BackNavigation from '@/components/navigation/BackNavigation';
import CommentForm from '@/components/place/CommentForm';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import PlaceInfoTable from '@/components/place/PlaceInfoTable';
import useMapScript from '@/hooks/useMapScript';
import { PlaceInformation } from '@/types/place';
import { getGitEmoji } from '@/utils/constants/emoji';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const moreMenuEvent = {
  onEditEvent: () => alert('수정'),
  onRemoveEvent: () => alert('삭제'),
};

const PlacePage = () => {
  const { placeId } = useParams();
  useMapScript();
  const { data, isLoading, isError } = useQuery<PlaceInformation>(
    ['placeInformation'],
    () => fetchPlace(Number(placeId))
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <>
      <BackNavigation
        option={BACKNAVIGATION_OPTIONS.MORE}
        moreMenuEvent={moreMenuEvent}
      />
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
