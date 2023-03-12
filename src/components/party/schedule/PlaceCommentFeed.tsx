import { Box, Img } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

import { fetchRouteCommentList, fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { CommentListType, ScheduleLocationType, ScheduleType } from '@/types/schedule';
import { getGitEmoji } from '@/utils/constants/emoji';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import { scrollToTop } from '@/utils/scrollToTop';

import CommentCreate from './CommentCreate';
import CommentFeedItem from './CommentFeedItem';
import CommentFeedTitle from './CommentFeedTitle';
import PlaceAmountField from './PlaceAmountField';

const moreMenuEvent = {
  onEditEvent: () => alert('수정'),
  onRemoveEvent: () => alert('삭제'),
};

const RouteCommentFeed = () => {
  const { scrollActive } = useScrollEvent(300);
  const { state } = useLocation();
  const { partyId } = useParams();

  const {
    data: commentList,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery<CommentListType>(['commentList'], () =>
    fetchRouteCommentList(0, state.locationId)
  );

  const {
    data: scheduleList,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery<ScheduleType>(
    ['scheduleList'],
    () => fetchScheduleList(Number(partyId), false),
    {
      staleTime: 10000,
    }
  );

  if (commentLoading || scheduleLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (commentError || scheduleError) return <></>;

  const pickCurrentLocation = (locations: ScheduleLocationType[], locationId: number) => {
    return locations.filter((location) => location.id === locationId);
  };

  const currentLocation = pickCurrentLocation(
    scheduleList.locations,
    state.locationId
  )[0];

  if (!currentLocation) return <></>;

  const placeData = {
    place: currentLocation.name,
    visitDate: currentLocation.visitDate,
  };

  const navigationTitle = <Box onClick={scrollToTop}>{currentLocation.name}</Box>;
  return (
    <>
      <BackNavigation
        title={scrollActive ? navigationTitle : ''}
        option={BACKNAVIGATION_OPTIONS.MORE}
        moreMenuEvent={moreMenuEvent}
      />
      <Box>
        <Img
          src={currentLocation.image}
          h='12.5rem'
          w='100%'
          mt='3.75rem'
          objectFit='cover'
        />
        <Img
          src={getGitEmoji(currentLocation.category)}
          position='relative'
          left='5'
          bottom='8'
        />
        <Box
          borderBottom='2px solid'
          borderBottomColor='gray.300'
          bg='white'
          w='100%'
          px='0.625rem'
          maxW='35rem'
          pos='relative'
          top='-18'>
          <CommentFeedTitle placeData={placeData} />
          <PlaceAmountField spending={currentLocation.spending} />
        </Box>
        <Box pos='relative' top='-6'>
          {commentList.partyRouteComments.map((comment) => (
            <CommentFeedItem key={comment.id} {...comment} />
          ))}
        </Box>
        <CommentCreate />
      </Box>
    </>
  );
};

export default RouteCommentFeed;
