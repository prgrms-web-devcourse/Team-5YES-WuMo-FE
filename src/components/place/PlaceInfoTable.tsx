import { Flex, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import {
  MdCalendarToday,
  MdCreditCard,
  MdLocationPin,
  MdOutlineComment,
} from 'react-icons/md';

import { Place, PlaceInfoStepItem } from '@/types/place';
import { formatPrice, getDateTimeText } from '@/utils/formatter';

const PlaceInfoItems: PlaceInfoStepItem[] = [
  {
    type: 'address',
    icon: <MdLocationPin />,
    text: '주소',
  },
  {
    type: 'visitDate',
    icon: <MdCalendarToday />,
    text: '일정',
  },
  {
    type: 'expectedCost',
    icon: <MdCreditCard />,
    text: '예상 비용',
  },
  {
    type: 'description',
    icon: <MdOutlineComment />,
    text: '메모',
  },
];

type PlaceInfoTableProps = {
  data: Place;
};

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
