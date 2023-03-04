import { Flex, Heading, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { CommentFeedTitleProps } from '@/types/schedule';
import { scrollToTop } from '@/utils/scrollToTop';

const CommentFeedTitle = ({ placeData }: CommentFeedTitleProps) => {
  return (
    <>
      <Flex align='center' mt='8px'>
        <Flex align='baseline' onClick={scrollToTop}>
          <Heading as='span' size='md' mr='0.25rem'>
            {placeData.place}
          </Heading>
          <Text as='span'>{dayjs(placeData.visitDate).format('YY.MM.DD')}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CommentFeedTitle;
