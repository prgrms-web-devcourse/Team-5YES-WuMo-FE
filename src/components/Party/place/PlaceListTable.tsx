import { Heading, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { MouseEvent } from 'react';

type Props = {
  places: kakao.maps.services.PlacesSearchResult;
};

const PlaceListTable = ({ places }: Props) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const { x, y } = e.currentTarget.dataset;
    console.log(x, y);
  };

  return (
    <TableContainer>
      <Table variant='simple'>
        <Tbody>
          {/* // TODO: 페이지네이션 or 무한스크롤 */}
          {places &&
            places.map((place) => (
              <Tr key={place.id}>
                <Td
                  data-x={place.x}
                  data-y={place.y}
                  onClick={handleClick}
                  cursor='pointer'
                  _hover={{ backgroundColor: 'lightgrey' }}>
                  <Heading as='h5' size='sm'>
                    {place.place_name}
                  </Heading>
                  <Text fontSize='sm'>
                    {place.road_address_name || place.address_name}
                  </Text>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlaceListTable;
