import { Box, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { fetchLikeRouteList } from '@/api/schedules';
import { likeRouteListSortSearchState } from '@/store/recoilRouteListState';
import { BestRouteListParamsType, BestRouteListType } from '@/types/routeList';

import Loading from '../base/Loading';
import PlaceLocationList from './PlaceLocationList';

const LikeRouteList = () => {
  const navigate = useNavigate();
  const likeRouteData = useRecoilValue<BestRouteListParamsType>(
    likeRouteListSortSearchState
  );
  const {
    data: likeList,
    isLoading,
    isError,
  } = useQuery<BestRouteListType>(['likeList'], () => fetchLikeRouteList(likeRouteData));

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;

  return (
    <>
      {likeList?.routes.map(
        ({ routeId, locations, image, name, startDate, endDate, likeCount }) => {
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
              onClick={() => navigate(`/like-route/${routeId}`)}>
              <Image src={image} alt={image} />

              <Box p='6'>
                <PlaceLocationList locations={locations} />
                <Box mb='2' fontWeight='semibold' as='h3' lineHeight='tight'>
                  {name}
                </Box>
                <Text fontSize='xs'>{`${dayjs(startDate).format(
                  'YYYY년 MM월 DD일'
                )} ~ ${dayjs(endDate).format('YYYY년 MM월 DD일')}`}</Text>
                <Box display='flex' justifyContent='right' mt='2' alignItems='center'>
                  <MdFavorite />
                  <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                    {likeCount}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }
      )}
    </>
  );
};

export default LikeRouteList;
