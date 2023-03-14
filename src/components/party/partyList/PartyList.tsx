import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { fetchMyPartyList } from '@/api/main';
import { MyPartyList } from '@/types/party';

import PartyListCard from './PartyListCard';

const PartyList = () => {
  const {
    data: onGoingPartyList,
    isLoading: onGoingLoading,
    isError: onGoingError,
  } = useQuery<MyPartyList>(
    ['onGoingPartyList'],
    () => fetchMyPartyList({ partyType: 'ONGOING', pageSize: 1000 }),
    {
      staleTime: 10000,
    }
  );

  const {
    data: completedPartyList,
    isLoading: completedLoading,
    isError: completedError,
  } = useQuery<MyPartyList>(
    ['completedPartyList'],
    () => fetchMyPartyList({ partyType: 'COMPLETED', pageSize: 1000 }),
    {
      staleTime: 10000,
    }
  );

  if (onGoingLoading || completedLoading) return <></>;
  if (onGoingError || completedError) return <></>;

  return (
    <Box pt='14'>
      <Tabs isFitted colorScheme='red'>
        <TabList pos='fixed' maxW='maxWidth.mobile' w='100%' zIndex='10' bg='white'>
          <Tab>진행중인 모임</Tab>
          <Tab>완료된 모임</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p='2'>
            {onGoingPartyList.party.length === 0 ? (
              <Box pt='20' textAlign='center'>
                <Text fontSize='1rem' fontWeight='bold'>
                  아직 진행중인 모임이 없어요. 😥
                </Text>
              </Box>
            ) : (
              <>
                {onGoingPartyList.party.map((party, idx) => (
                  <Box pt={idx === 0 ? '10' : '0'} mt='4' key={party.id}>
                    <PartyListCard {...party} />
                  </Box>
                ))}
              </>
            )}
          </TabPanel>
          <TabPanel p='2'>
            {completedPartyList.party.length === 0 ? (
              <Box pt='20' textAlign='center'>
                <Text fontSize='1rem' fontWeight='bold'>
                  아직 완료된 모임이 없어요. 😥
                </Text>
              </Box>
            ) : (
              <>
                {completedPartyList.party.map((party, idx) => (
                  <Box pt={idx === 0 ? '10' : '0'} mt='4' key={party.id}>
                    <PartyListCard {...party} />
                  </Box>
                ))}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PartyList;
