import { Box, Img, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import { fetchLocationCommentList, fetchScheduleList } from '@/api/schedules';
import BottomSheet from '@/components/base/BottomSheet';
import CustomTextarea from '@/components/base/CustomTextarea';
import FloatingButton from '@/components/base/FloatingButton';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { CommentListType, ScheduleLocationType, ScheduleType } from '@/types/schedule';
import { getGitEmoji } from '@/utils/constants/emoji';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import { scrollToTop } from '@/utils/scrollToTop';

import CommentFeedItem from './CommentFeedItem';
import CommentFeedTitle from './CommentFeedTitle';
import PlaceAmountField from './PlaceAmountField';

const modalContent = {
  title: '새 피드 작성',
  content: <CustomTextarea />,
  buttonText: 'submit',
  onClick: () => {
    alert('제출 성공');
  },
};

const moreMenuEvent = {
  onEditEvent: () => alert('수정'),
  onRemoveEvent: () => alert('삭제'),
};

const RouteCommentFeed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { scrollActive } = useScrollEvent(300);
  const { state } = useLocation();

  const {
    data: commentList,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery<CommentListType>(['commentList'], () =>
    fetchLocationCommentList(0, state.locationId)
  );

  const {
    data: scheduleList,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery<ScheduleType>(['scheduleList'], () => fetchScheduleList(1, false), {
    staleTime: 10000,
  });

  if (commentLoading || scheduleLoading) return <></>;
  if (commentError || scheduleError) return <></>;

  const pickCurrentLocation = (locations: ScheduleLocationType[], locationId: number) => {
    return locations.filter((location) => location.id === locationId);
  };

  const currentLocation = pickCurrentLocation(
    scheduleList.locations,
    state.locationId
  )[0];

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
          <PlaceAmountField />
        </Box>
        <Box pos='relative' top='-6'>
          {commentList.partyRouteComments.map((comment) => (
            <CommentFeedItem key={comment.id} {...comment} />
          ))}
        </Box>
        <FloatingButton icon={<AiOutlinePlus />} onClick={onOpen} />
        <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
      </Box>
    </>
  );
};

export default RouteCommentFeed;
