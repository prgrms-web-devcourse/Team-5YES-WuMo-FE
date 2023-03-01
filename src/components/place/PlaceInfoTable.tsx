import { Flex, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';

import { PlaceInfoTableProps } from '@/types/place';
import { PlaceInfoItems } from '@/utils/constants/place';
import { formatPrice, getDateTimeText } from '@/utils/formatter';

const PlaceInfoTable = ({ data }: PlaceInfoTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          {PlaceInfoItems.map((item) => (
            <Tr key={item.type}>
              <Td display='flex' justifyContent='space-between' gap='8'>
                <Flex gap='2' align='center'>
                  {item.icon}
                  {item.text}
                </Flex>
                <Text textAlign='end' whiteSpace='normal'>
                  {item.type === 'expectedCost'
                    ? `${formatPrice(String(data[item.type]))}원`
                    : item.type === 'visitDate'
                    ? getDateTimeText(data[item.type])
                    : data[item.type]}
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
