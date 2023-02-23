import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';

type Props = {
  selectedPlace: string | null;
  places: kakao.maps.services.PlacesSearchResultItem[];
  placeHandler: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

const PlaceListTable = ({ selectedPlace, places, placeHandler }: Props) => {
  const handleClick = (place: kakao.maps.services.PlacesSearchResultItem) => {
    placeHandler(place);
  };

  return (
    <TableContainer>
      <Table variant='simple'>
        <Tbody>
          {/* // TODO: 페이지네이션 or 무한스크롤 */}
          {places &&
            places.map((place) => (
              <Tr key={place.id}>
                <Td onClick={() => handleClick(place)} cursor='pointer'>
                  <Flex justifyContent='space-between'>
                    <div>
                      <Heading
                        as='h5'
                        size='sm'
                        color={selectedPlace === place.id ? 'green.500' : 'initial'}>
                        {place.place_name}
                      </Heading>
                      <Text fontSize='sm'>
                        {place.road_address_name || place.address_name}
                      </Text>
                    </div>
                    {selectedPlace === place.id && <Button>선택</Button>}
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlaceListTable;
