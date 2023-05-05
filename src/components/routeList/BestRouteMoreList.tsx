import { Box, Icon, Image, Text } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { fetchBestRouteList } from '@/api/schedules';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { recoilBestRouteListParams } from '@/store/recoilRouteListState';
import { BestRouteListParamsType, BestRouteListType } from '@/types/routeList';

import Loading from '../base/Loading';
import PlaceLocationList from './PlaceLocationList';

const BestRouteMoreList = () => {
  const navigate = useNavigate();

  const bestRouteParam = useRecoilValue<BestRouteListParamsType>(
    recoilBestRouteListParams
  );

  const {
    data: routeList,
    refetch: bestRouteListRefetch,
    isLoading: bestRouteListLoading,
    isError: bestRouteListError,
    fetchNextPage,
  } = useInfiniteQuery<BestRouteListType>({
    queryKey: ['bestRouteList'],
    queryFn: ({ pageParam = '' }) =>
      fetchBestRouteList({ ...bestRouteParam, cursorId: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.lastId === -1) return;
      return lastPage.lastId;
    },
  });

  const { setTarget } = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    bestRouteListRefetch();
  }, [bestRouteParam.searchWord, bestRouteParam.sortType]);

  if (bestRouteListLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (bestRouteListError) return <></>;

  return (
    <>
      {routeList.pages.map(({ routes }, index) => (
        <React.Fragment key={index}>
          {routes.map(
            ({
              routeId,
              partyId,
              locations,
              image,
              name,
              startDate,
              endDate,
              likeCount,
              isLiking,
            }) => {
              return (
                <Box
                  key={routeId}
                  maxW='sm'
                  borderWidth='0.0625rem'
                  borderRadius='lg'
                  overflow='hidden'
                  border='0.0625rem solid #cfcfcf'
                  cursor='pointer'
                  margin='0 auto 2rem auto'
                  onClick={() => {
                    navigate(`/best-route/${partyId}`);
                  }}>
                  <Image
                    w='sm'
                    h='3xs'
                    objectFit='cover'
                    fallbackSrc='/skeleton.svg'
                    src={image ? image : '/logo.svg'}
                    alt='커버 이미지'
                  />
                  <Box p='6'>
                    <PlaceLocationList locations={locations} />
                    <Box mb='2' fontWeight='semibold' as='h1' lineHeight='tight'>
                      {name}
                    </Box>
                    <Text fontSize='xs'>{`${dayjs(startDate).format(
                      'YYYY년 MM월 DD일'
                    )} ~ ${dayjs(endDate).format('YYYY년 MM월 DD일')}`}</Text>
                    <Box display='flex' justifyContent='right' mt='2' alignItems='center'>
                      <Icon
                        as={isLiking ? MdFavorite : MdFavoriteBorder}
                        color='primary.red'
                        boxSize={4}
                        cursor='pointer'
                      />
                      <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        {likeCount}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            }
          )}
          <div ref={setTarget}></div>
        </React.Fragment>
      ))}
    </>
  );
};

export default BestRouteMoreList;
