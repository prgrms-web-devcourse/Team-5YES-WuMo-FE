import { Avatar, Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';

import { CommentType } from '@/types/schedule';
import { replaceDateSlashWithDot } from '@/utils/dateTransform';

const CommentFeedItem = ({
  nickName,
  profileImage,
  memberRole,
  content,
  image,
  createdAt,
}: CommentType) => {
  const customDate = replaceDateSlashWithDot(createdAt);
  return (
    <Container p='1rem' borderBottom='solid 0.125rem' borderColor='blackAlpha.200'>
      <Flex align='center' mb='0.625rem'>
        <Avatar src={profileImage} m='0.3125rem' />
        <Box m='0 0.5rem'>
          <Text fontWeight='bold' m='0.125rem 0'>
            {nickName}
          </Text>
          <Text size='xs' color='blackAlpha.500'>
            {memberRole}
          </Text>
        </Box>
        <Text mt='auto' mb='0.5rem'>
          {customDate}
        </Text>
        <Box ml='auto'>
          <Button size='xs' mr='0.3125rem'>
            수정
          </Button>
          <Button size='xs'>삭제</Button>
        </Box>
      </Flex>
      <Box>
        <Text p='0.625rem 0'>{content}</Text>
        {image && <Image src={image} w='100%' m='0 auto' maxH='18.75rem' />}
      </Box>
    </Container>
  );
};

export default CommentFeedItem;
