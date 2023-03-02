import { AccordionButton, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { MdOutlinePlace } from 'react-icons/md';

import { CommentFeedTitleProps } from '@/types/schedule';
import { replaceDateSlashWithDot } from '@/utils/dateTransform';
import { scrollToTop } from '@/utils/scrollToTop';

const CommentFeedTitle = ({ isExpanded, placeData }: CommentFeedTitleProps) => {
  const placeVisitDate = replaceDateSlashWithDot(placeData.visitDate);

  return (
    <Flex align='center' p='0.375rem 0' mt='0.5rem'>
      <MdOutlinePlace
        css={css`
          width: 1.875rem;
          height: 100%;
        `}
      />
      <Flex align='baseline' onClick={scrollToTop}>
        <Heading as='span' size='md' mr='0.25rem'>
          {placeData.place}
        </Heading>
        <Text as='span'>{placeVisitDate}</Text>
      </Flex>
      <AccordionButton
        as={Button}
        p='0.625rem 0'
        w='3.125rem'
        h='1.875rem'
        fontSize='sm'
        ml='auto'
        bg={isExpanded ? 'gray.100' : 'primary.yellow !important'}
        borderRadius='0.9375rem'>
        {isExpanded ? '닫기' : '지출'}
      </AccordionButton>
    </Flex>
  );
};

export default CommentFeedTitle;
