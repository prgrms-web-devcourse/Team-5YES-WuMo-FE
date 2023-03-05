import { Box, Button, ButtonGroup, Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BackNavigation from '@/components/navigation/BackNavigation';
import CommentForm from '@/components/place/CommentForm';
import PlacePreviewMap from '@/components/place/create/search/PlacePreviewMap';
import PlaceInfoTable from '@/components/place/PlaceInfoTable';
import useMapScript from '@/hooks/useMapScript';
import { getCategoryImageURL, PLACES_DUMMY_DATA } from '@/utils/constants/place';
import { scrollToTop } from '@/utils/scrollToTop';

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
      <BackNavigation />
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
        <ButtonGroup gap='1' variant='outline' size='sm' justifyContent='flex-end'>
          <Button borderRadius='2xl'>수정</Button>
          <Button borderRadius='2xl'>삭제</Button>
        </ButtonGroup>
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
