import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BackNavigation from '@/components/navigation/BackNavigation';
import CommentForm from '@/components/place/CommentForm';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import PlaceInfoTable from '@/components/place/PlaceInfoTable';
import useMapScript from '@/hooks/useMapScript';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import { getCategoryImageURL, PLACES_DUMMY_DATA } from '@/utils/constants/place';
import { scrollToTop } from '@/utils/scrollToTop';

const moreMenuEvent = {
  onEditEvent: () => alert('수정'),
  onRemoveEvent: () => alert('삭제'),
};

const PlacePage = () => {
  const { id } = useParams();
  const data = PLACES_DUMMY_DATA.filter((place) => place.id === Number(id))[0];
  const { script } = useMapScript();

  useEffect(() => {
    scrollToTop();
    if (!script) return;

    // script.addEventListener('load', () => {
    // kakao.maps.load(() => {}); // FIXME: 동적 로딩
    // });
  }, [script]);

  return (
    <>
      <BackNavigation
        option={BACKNAVIGATION_OPTIONS.MORE}
        moreMenuEvent={moreMenuEvent}
      />
      <Box height='2xs' marginTop='12'>
        <Image src={data.image} height='3xs' width='full' objectFit='cover' />
        <Image
          src={getCategoryImageURL(data.category)}
          position='relative'
          left='5'
          bottom='8'
        />
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
