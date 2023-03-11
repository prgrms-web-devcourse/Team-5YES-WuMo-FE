import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchMyPartyList } from '@/api/main';
import Loading from '@/components/base/Loading';
import { MyPartyList, MyPartyListParams } from '@/types/party';
import ROUTES from '@/utils/constants/routes';

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

  const onMovePartyPage = (id: number) => {
    navigate(ROUTES.SCHEDULE, {
      state: {
        partyId: id,
      },
    });
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
              src={coverImage ? '/logo-lg.svg' : coverImage}
              h='8.75rem'
              w='8.75rem'
              alignItems='center'
              objectFit='cover'
              borderRadius='1.25rem'
            />
            <Text mt='2' size='xs' wordBreak='break-all' textAlign='center'>
              {name}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PartyListGrid;
