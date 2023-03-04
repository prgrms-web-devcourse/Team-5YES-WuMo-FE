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
import { useRecoilState } from 'recoil';

import { placeSearchState } from '@/store/recoilPlaceState';

const PlaceList = () => {
  const [searchState, setSearchState] = useRecoilState(placeSearchState);

  return (
    <TableContainer overflowY='scroll' h={searchState.selectedPlace.id ? 'xs' : 'md'}>
      <Table variant='simple'>
        <Tbody>
          {/* // TODO: 무한스크롤 */}
          {searchState.result.map(
            ({ id, place_name, address_name, road_address_name, x, y }) => (
              <Tr key={id}>
                <Td
                  onClick={() =>
                    setSearchState({
                      ...searchState,
                      selectedPlace: {
                        id,
                        place_name,
                        address_name,
                        road_address_name,
                        x,
                        y,
                      },
                    })
                  }
                  cursor='pointer'
                  paddingLeft='3'
                  backgroundColor={
                    searchState.selectedPlace.id === id ? 'gray.100' : 'initial'
                  }>
                  <Flex justifyContent='space-between'>
                    <div>
                      <Heading
                        as='h6'
                        size='sm'
                        color={
                          searchState.selectedPlace.id === id ? 'primary.red' : 'initial'
                        }>
                        {place_name}
                      </Heading>
                      <Text fontSize='sm'>{road_address_name || address_name}</Text>
                    </div>
                  </Flex>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlaceList;
