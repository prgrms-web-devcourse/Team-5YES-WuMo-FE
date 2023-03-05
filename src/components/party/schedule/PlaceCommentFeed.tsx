import { Box, Img, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

import BottomSheet from '@/components/base/BottomSheet';
import CustomTextarea from '@/components/base/CustomTextarea';
import FloatingButton from '@/components/base/FloatingButton';
import BackNavigation from '@/components/navigation/BackNavigation';
import useScrollEvent from '@/hooks/useScrollEvent';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';
import { getCategoryImageURL } from '@/utils/constants/place';
import { scrollToTop } from '@/utils/scrollToTop';

import CommentFeedItem from './CommentFeedItem';
import CommentFeedTitle from './CommentFeedTitle';
import PlaceAmountField from './PlaceAmountField';

const PLACEDUMMYDATA = {
  locations: [
    {
      id: 1,
      name: '다이도코로',
      address: '부산 수영구 남천동로108번길 27 2층 다이도코로',
      latitude: '34.56789',
      longitude: '123.56789',
      image: 'https://ifh.cc/g/k1PnR2.jpg',
      description: '가라아게 존맛',
      visitDate: '2023-02-28T07:11:14.766Z',
      spending: 55000,
      category: 'meal',
    },
  ],
};

const COMMENTDUMMYDATA = [
  {
    id: 0,
    nickName: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    memberRole: '총무',
    content: '웨이팅 3시간 미친짓이었지만 맛있었다^^',
    image: 'https://via.placeholder.com/300',
    createdAt: '2023-02-25T12:00:57.301Z',
  },
  {
    id: 1,
    nickName: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    memberRole: '총무',
    content: '웨이팅 3시간 미친짓이었지만 맛있었다^^',
    createdAt: '2023-02-25T12:00:57.301Z',
  },
  {
    id: 2,
    nickName: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    memberRole: '총무',
    content: '웨이팅 3시간 미친짓이었지만 맛있었다^^',
    image: 'https://via.placeholder.com/300',
    createdAt: '2023-02-25T12:00:57.301Z',
  },
  {
    id: 3,
    nickName: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    memberRole: '총무',
    content: '웨이팅 3시간 미친짓이었지만 맛있었다^^',
    createdAt: '2023-02-25T12:00:57.301Z',
  },
  {
    id: 4,
    nickName: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    memberRole: '총무',
    content: '웨이팅 3시간 미친짓이었지만 맛있었다^^',
    image: 'https://via.placeholder.com/300',
    createdAt: '2023-02-25T12:00:57.301Z',
  },
];

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

const placeData = {
  place: PLACEDUMMYDATA.locations[0].name,
  visitDate: PLACEDUMMYDATA.locations[0].visitDate,
};

const RouteCommentFeed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { scrollActive } = useScrollEvent(300);
  const navigationTitle = (
    <Box onClick={scrollToTop}>{PLACEDUMMYDATA.locations[0].name}</Box>
  );
  return (
    <>
      <BackNavigation
        title={scrollActive ? navigationTitle : ''}
        option={BACKNAVIGATION_OPTIONS.MORE}
        moreMenuEvent={moreMenuEvent}
      />
      <Box>
        <Img
          src={PLACEDUMMYDATA.locations[0].image}
          h='12.5rem'
          w='100%'
          mt='3.75rem'
          objectFit='cover'
        />
        <Img
          src={getCategoryImageURL(PLACEDUMMYDATA.locations[0].category)}
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
          {COMMENTDUMMYDATA.map((comment) => (
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
