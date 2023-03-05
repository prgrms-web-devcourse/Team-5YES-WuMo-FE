import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { ReceiptItemProps } from '@/types/receiptModal';
import { getPriceText } from '@/utils/formatter';

const PartyReceiptItem = ({ locations }: ReceiptItemProps) => {
  return (
    <List p='0.625rem 0 '>
      {locations.map(({ id, name, visitDate, spending }) => (
        <ListItem as={Flex} key={id} alignItems='flex-end' pb='0.625rem'>
          <Flex direction='column'>
            <Text fontSize='xs'>{dayjs(visitDate).format('YY.MM.DD')}</Text>
            <Text fontSize='md' pr='0.5rem'>
              {name}
            </Text>
          </Flex>
          <Text ml='auto' fontSize='sm'>
            {getPriceText(spending)}
          </Text>
        </ListItem>
      ))}
    </List>
  );
};

export default PartyReceiptItem;
