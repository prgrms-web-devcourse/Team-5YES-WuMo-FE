import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';

import { PlaceListProps } from '@/types/place';

const PlaceList = ({ selectedPlace, places, selectPlaceHandler }: PlaceListProps) => {
  return (
    <TableContainer overflowY='scroll' h={selectedPlace ? 'xs' : 'md'}>
      <Table variant='simple'>
        <Tbody>
          {/* // TODO: 무한스크롤 */}
          {places &&
            places.map((place) => (
              <Tr key={place.id}>
                <Td
                  onClick={() => selectPlaceHandler(place)}
                  cursor='pointer'
                  paddingLeft='0'
                  backgroundColor={selectedPlace === place.id ? 'gray.100' : 'initial'}>
                  <Flex justifyContent='space-between'>
                    <div>
                      <Heading
                        as='h6'
                        size='sm'
                        color={selectedPlace === place.id ? 'primary.red' : 'initial'}>
                        {place.place_name}
                      </Heading>
                      <Text fontSize='sm'>
                        {place.road_address_name || place.address_name}
                      </Text>
                    </div>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlaceList;
