import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchMyPartyList } from '@/api/main';
import Loading from '@/components/base/Loading';
import { MyPartyList, MyPartyListParams } from '@/types/party';

const PartyListGrid = () => {
  const navigate = useNavigate();
  const parameter: MyPartyListParams = {
    pageSize: 10000,
    partyType: 'ONGOING',
  };
  const {
    data: myPartyList,
    isLoading,
    isError,
  } = useQuery<MyPartyList>(['myPartyList'], () => fetchMyPartyList(parameter), {
    staleTime: 10000,
  });

  const onMovePartyPage = (partyId: number) => {
    navigate(`/party/${partyId}`);
  };

  if (isError) return <></>;
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <Box mt='6'>
      <Heading size='md'>내 모임 목록</Heading>
      {myPartyList.party.length ? (
        myPartyList.party.map(({ id, coverImage, name }) => (
          <SimpleGrid key={id} mt='4' columns={3} spacing='10px'>
            <Flex
              cursor='pointer'
              onClick={() => onMovePartyPage(id)}
              direction='column'
              justify='center'
              align='center'>
              <Image
                fallbackSrc='./logo.svg'
                src={coverImage ? coverImage : '/logo.svg'}
                boxSize='80px'
                objectFit='cover'
                borderRadius='1.25rem'
                alt={name}
              />
              <Heading
                mt='2'
                size='xs'
                wordBreak='break-all'
                textAlign='center'
                noOfLines={1}>
                {name}
              </Heading>
            </Flex>
          </SimpleGrid>
        ))
      ) : (
        <Text textAlign='center' p='2rem'>
          참여 중인 모임이 없어요!
        </Text>
      )}
    </Box>
  );
};

export default PartyListGrid;
