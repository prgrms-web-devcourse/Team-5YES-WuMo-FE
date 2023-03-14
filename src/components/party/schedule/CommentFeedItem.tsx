import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { CommentType } from '@/types/schedule';

import CommentDelete from './CommentDelete';
import CommentUpdate from './CommentUpdate';

const CommentFeedItem = ({
  id,
  nickName,
  profileImage,
  memberRole,
  content,
  image,
  createdAt,
  isEditable,
}: CommentType) => {
  const {
    isOpen: updateIsOpen,
    onClose: updateOnClose,
    onOpen: updateOnOpen,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  return (
    <Container p='1rem' borderBottom='solid 0.125rem' borderColor='blackAlpha.200'>
      <Flex align='center' mb='0.625rem'>
        <Avatar src={profileImage === null ? undefined : profileImage} m='0.3125rem' />
        <Flex align='center'>
          <Box m='0 0.5rem'>
            <Text fontWeight='bold' m='0.125rem 0'>
              {nickName}
            </Text>
            {memberRole && (
              <Tag size='xs' color='blackAlpha.700' p='2px 6px' borderRadius='10px'>
                {memberRole}
              </Tag>
            )}
          </Box>
          <Text mt='auto'>{dayjs(createdAt).format('YY.MM.DD')}</Text>
        </Flex>
        {isEditable && (
          <Box ml='auto'>
            <Button size='xs' mr='0.3125rem' onClick={updateOnOpen}>
              수정
            </Button>
            <Button size='xs' onClick={deleteOnOpen}>
              삭제
            </Button>
          </Box>
        )}
      </Flex>
      <Box>
        <Text p='0.625rem 0'>{content}</Text>
        {image && (
          <Image
            fallbackSrc='./logo.svg'
            src={image}
            w='100%'
            m='0 auto'
            maxH='18.75rem'
            objectFit='cover'
            alt={image}
          />
        )}
      </Box>
      <CommentUpdate
        isOpen={updateIsOpen}
        onClose={updateOnClose}
        id={id}
        content={content}
        image={image}
      />
      <CommentDelete
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        id={id}
        image={image}
      />
    </Container>
  );
};

export default CommentFeedItem;
