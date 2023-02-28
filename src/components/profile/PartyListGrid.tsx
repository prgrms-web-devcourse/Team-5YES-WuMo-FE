import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

const party_dummy_data = [
  {
    image: 'https://via.placeholder.com/140x140',
    name: '가보자고',
    id: '1',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '먹부림',
    id: '2',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '겨울바다여행',
    id: '3',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '퇴사기념',
    id: '4',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '취업기념',
    id: '5',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '확인1',
    id: '6',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    name: '확인2',
    id: '7',
  },
];

const PartyListGrid = () => {
  return (
    <Box mt='6' pb='10'>
      <Heading size='md'>내 모임 목록</Heading>
      <SimpleGrid mt='4' columns={3} spacing='10px'>
        {party_dummy_data.map((party) => (
          <Flex direction='column' justify='center' align='center' key={party.id}>
            <Image
              src={party.image}
              h='8.75rem'
              w='8.75rem'
              alignItems='center'
              objectFit='cover'
              borderRadius='1.25rem'
            />
            <Text mt='2' size='xs' wordBreak='break-all' textAlign='center'>
              {party.name}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PartyListGrid;
