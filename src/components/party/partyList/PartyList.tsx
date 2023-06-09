import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { fetchMyPartyList } from '@/api/main';
import { MyPartyList } from '@/types/party';

import PartyListCard from './PartyListCard';

const isEmptyText = {
  onGoing: '진행중인',
  completed: '완료된',
  all: '참여중인',
};

const PartyList = ({ partyType }: { partyType: 'onGoing' | 'completed' | 'all' }) => {
  const {
    data: PartyList,
    isLoading,
    isError,
  } = useQuery<MyPartyList>(
    [`${partyType}PartyList`],
    () =>
      fetchMyPartyList({
        partyType: partyType.toUpperCase() as 'ONGOING' | 'COMPLETED' | 'ALL',
        pageSize: 1000,
      }),
    {
      staleTime: 10000,
    }
  );

  if (PartyList?.party.length === 0)
    return (
      <>
        <Center pt='20'>
          <Text fontSize='1rem' fontWeight='bold'>
            아직 {isEmptyText[partyType]} 모임이 없어요. 😥
          </Text>
        </Center>
      </>
    );
  if (isLoading)
    return (
      <Center mt='20'>
        <Spinner speed='0.65s' emptyColor='gray.200' color='primary.red' size='xl' />
      </Center>
    );
  if (isError) return <></>;

  return (
    <>
      {PartyList.party.map((party, idx) => (
        <Box pt={idx === 0 ? '10' : '0'} mt='4' key={party.id}>
          <PartyListCard {...party} />
        </Box>
      ))}
    </>
  );
};

export default PartyList;
