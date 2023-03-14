import { Box, Heading, Img, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { deletePlaceFromRoute } from '@/api/place';
import { fetchRouteCommentList, fetchScheduleList } from '@/api/schedules';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { CommentListType, ScheduleLocationType, ScheduleType } from '@/types/schedule';
import { getGitEmoji } from '@/utils/constants/emoji';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import ROUTES from '@/utils/constants/routes';
import { scrollToTop } from '@/utils/scrollToTop';

import CommentCreate from './CommentCreate';
import CommentFeedItem from './CommentFeedItem';
import CommentFeedTitle from './CommentFeedTitle';
import PlaceAmountField from './PlaceAmountField';

const RouteCommentFeed = () => {
  const { scrollActive } = useScrollEvent(300);
  const { state } = useLocation();
  const { partyId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: deleteRoute } = useMutation(deletePlaceFromRoute, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['scheduleList']);
    },
  });
  const {
    data: commentList,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery<CommentListType>(['commentList', state.locationId], () =>
    fetchRouteCommentList(0, state.locationId)
  );

  const {
    data: scheduleList,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery<ScheduleType>(['scheduleList', partyId], () =>
    fetchScheduleList(Number(partyId), false)
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

  const moreMenuEvent = {
    onEditEvent: () =>
      navigate(ROUTES.PLACE_EDIT, {
        state: {
          partyId: scheduleList.partyId,
          place: currentLocation,
        },
      }),
    onRemoveEvent: () => onOpen(),
  };

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
        {commentList.partyRouteComments.length > 0 ? (
          <Box pos='relative' top='-6'>
            {commentList.partyRouteComments.map((comment) => (
              <CommentFeedItem key={comment.id} {...comment} />
            ))}
          </Box>
        ) : (
          <Box textAlign='center' p='1rem'>
            <Heading size='md'>생성된 댓글이 없어요.</Heading>
            <Text> + 버튼을 눌러서 댓글을 추가해주세요!</Text>
          </Box>
        )}
        <CommentCreate />
      </Box>
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={<Text> &quot;{currentLocation.name}&quot; 일정을 취소 하시겠습니까?</Text>}
        clickButtonHandler={{
          primary: async () => {
            await deleteRoute(state.locationId);
            navigate(`/party/${partyId}`);
          },
        }}
        buttonText={{
          secondary: '취소',
          primary: '삭제',
        }}
      />
    </>
  );
};

export default RouteCommentFeed;
