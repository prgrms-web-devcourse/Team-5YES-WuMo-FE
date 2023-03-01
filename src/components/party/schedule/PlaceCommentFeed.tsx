import { Accordion, AccordionItem, Box, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

import BottomSheet from '../../base/BottomSheet';
import CustomTextarea from '../../base/CustomTextarea';
import FloatingButton from '../../base/FloatingButton';
import CommentFeedItem from './CommentFeedItem';
import CommentFeedTitle from './CommentFeedTitle';
import PlaceAmountField from './PlaceAmountField';

const PLACEDUMMYDATA = {
  locations: [
    {
      name: '갈치구이집',
      visitDate: '2023-02-27T06:51:55.604Z',
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

const placeData = {
  place: PLACEDUMMYDATA.locations[0].name,
  visitDate: PLACEDUMMYDATA.locations[0].visitDate,
};

const RouteCommentFeed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem
          p='0.625rem'
          borderBottom='2px solid'
          borderBottomColor='gray.100'
          pos='fixed'
          top='10'
          bg='white'
          w='100%'
          maxW='35rem'
          zIndex='10'>
          {({ isExpanded }) => (
            <>
              <CommentFeedTitle isExpanded={isExpanded} placeData={placeData} />
              <PlaceAmountField />
            </>
          )}
        </AccordionItem>
      </Accordion>
      <Box mt='6.25rem'>
        {COMMENTDUMMYDATA.map((comment) => (
          <CommentFeedItem key={comment.id} {...comment} />
        ))}
      </Box>
      <FloatingButton icon={<AiOutlinePlus />} onClick={onOpen} />
      <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
    </>
  );
};

export default RouteCommentFeed;
