import { Flex, Heading, Text } from '@chakra-ui/react';

import { CommentFeedTitleProps } from '@/types/schedule';
import { replaceDateSlashWithDot } from '@/utils/dateTransform';
import { scrollToTop } from '@/utils/scrollToTop';

const CommentFeedTitle = ({ placeData }: CommentFeedTitleProps) => {
  const placeVisitDate = replaceDateSlashWithDot(placeData.visitDate);

  return (
    <>
      <Flex align='center' mt='8px'>
        <Flex align='baseline' onClick={scrollToTop}>
          <Heading as='span' size='md' mr='0.25rem'>
            {placeData.place}
          </Heading>
          <Text as='span'>{placeVisitDate}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CommentFeedTitle;
