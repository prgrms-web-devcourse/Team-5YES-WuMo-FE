import { Flex, HStack, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MdOutlineLinearScale } from 'react-icons/md';

import { RoutePlaceListProps } from '@/types/routeList';

const PlaceList = ({ locations }: RoutePlaceListProps) => {
  return (
    <HStack mb='6' justifyContent='space-between' overflow='scroll' gap='10px'>
      {locations.map(({ id, name, image, address }, index) => {
        return (
          <PlaceItem key={id} gap='10px'>
            <Flex flexDirection='column' alignItems='center' gap='1'>
              <Text fontSize='6px'>{address.split(' ')[0]}</Text>
              <Image src={image} maxW='40px' h='40px' borderRadius='4' />
              <Text fontSize='xs' wordBreak='keep-all' textAlign='center'>
                {name}
              </Text>
            </Flex>
            {index === locations.length - 1 ? (
              ''
            ) : (
              <MdOutlineLinearScale style={{ margin: 0 }} />
            )}
          </PlaceItem>
        );
      })}
    </HStack>
  );
};

const PlaceItem = styled(Flex)`
  margin: 0 !important;
  align-items: center;
`;

export { PlaceList };
