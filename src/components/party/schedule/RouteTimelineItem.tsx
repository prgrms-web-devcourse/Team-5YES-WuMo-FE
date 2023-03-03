import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { MdOutlinePlace } from 'react-icons/md';

import { routeListProps } from '@/types/schedule';
import { getCategoryImageURL } from '@/utils/constants/place';

const RouteTimelineItem = ({
  name,
  address,
  image,
  visitDate,
  spending,
  category,
  onClickHandler,
  routerButton,
}: routeListProps) => {
  return (
    <ListItem pt='1.875rem'>
      <Flex justify='center'>
        <Flex direction='column' align='center' zIndex='10'>
          <Text fontSize='xs' bg='white'>
            {dayjs(visitDate).format('YY.MM.DD')}
          </Text>
          <Text fontSize='xs' bg='white'>
            {dayjs(visitDate).format('HH:mm')}
          </Text>
          <ListIcon
            as={Image}
            src={getCategoryImageURL(category)}
            bg='gray.100'
            w='3.125rem'
            h='3.125rem'
            p='0.625rem'
            m='0.375rem 0'
            borderRadius='0.625rem'
          />
          <Text fontSize='xs' bg='white'>
            {spending} 원
          </Text>
        </Flex>
        <Box onClick={onClickHandler} w='70%' pos='relative' ml='1rem'>
          <Flex align='center' justify='space-between' mb='18px'>
            <Heading size='sm'>{name}</Heading>
            {routerButton && (
              <Button variant='ghost' size='xs'>
                {routerButton}
              </Button>
            )}
          </Flex>
          <Card>
            <Image src={image} w='100%' maxH='12.5rem' borderTopRadius='0.625rem' />
            <Flex h='3.125rem' align='center' p='10px'>
              <MdOutlinePlace
                css={css`
                  font-size: 1.625rem;
                `}
              />
              <Text fontSize='xs'>{address}</Text>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default RouteTimelineItem;
