import { Box, Flex, Heading, Image, SimpleGrid } from '@chakra-ui/react';
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
    <Box mt='6' pb='10'>
      <Heading size='md'>내 모임 목록</Heading>
      <SimpleGrid mt='4' columns={3} spacing='10px'>
        {myPartyList.party.map(({ id, coverImage, name }) => (
          <Flex
            cursor='pointer'
            onClick={() => onMovePartyPage(id)}
            direction='column'
            justify='center'
            align='center'
            key={id}>
            <Image
              src={coverImage ? coverImage : '/logo-lg.svg'}
              h='100%'
              maxH='8.75rem'
              alignItems='center'
              objectFit='cover'
              borderRadius='1.25rem'
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PartyListGrid;
