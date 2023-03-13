import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { fetchLikeRouteList } from '@/api/schedules';
import { likeRouteListSortSearchState } from '@/store/recoilRouteListState';
import { BestRouteListParamsType, BestRouteListType } from '@/types/routeList';
import ROUTES from '@/utils/constants/routes';

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
      {likeList.routes.length === 0 ? (
        <Box pt='20' textAlign='center'>
          <Text fontSize='1.5rem' fontWeight='bold'>
            관심목록이 비어있어요.
          </Text>
          <Text mt='6'>
            베스트 루트 목록에서 <br /> 마음에 드는 루트를 추가해보세요.
          </Text>
          <Link to={ROUTES.BEST_ROUTE_LIST}>
            <Button bg='primary.red' color='white' fontWeight='normal' px='2rem' mt='6'>
              베스트 루트 보러가기
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          {likeList.routes.map(
            ({
              routeId,
              partyId,
              locations,
              image,
              name,
              startDate,
              endDate,
              likeCount,
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
                  onClick={() => navigate(`/like-route/${partyId}`)}>
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
      )}
    </>
  );
};

export default LikeRouteList;
