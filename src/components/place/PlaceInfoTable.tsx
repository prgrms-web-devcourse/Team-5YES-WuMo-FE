import { Flex, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

import { PlaceInformationTableProps } from '@/types/place';
import { PlaceInfoItems } from '@/utils/constants/place';

const PlaceInfoTable = ({ data }: PlaceInformationTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          {PlaceInfoItems(data).map((item) => (
            <Tr key={item.type}>
              <Td display='flex' justifyContent='space-between' gap='8'>
                <Flex gap='2' align='center'>
                  {item.icon}
                  {item.text}
                </Flex>
                <Text textAlign='end' whiteSpace='normal'>
                  {item.value}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlaceInfoTable;
