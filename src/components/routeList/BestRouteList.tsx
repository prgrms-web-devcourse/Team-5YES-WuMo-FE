import { Box, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { fetchBestRouteList } from '@/api/schedules';
import {
  bestRouteListSortSearchState,
  searchResultList,
} from '@/store/recoilRouteListState';
import { BestRouteListSortSearchProps } from '@/types/routeList';
import ROUTES from '@/utils/constants/routes';

import PlaceLocationList from './PlaceLocationList';

const BestRouteList = () => {
  const navigate = useNavigate();

  const bestRouteData = useRecoilValue<BestRouteListSortSearchProps>(
    bestRouteListSortSearchState
  );
  const [bestRouteList, setBestRouteList] = useRecoilState(searchResultList);

  useEffect(() => {
    const getBestRouteList = async () => {
      const data = await fetchBestRouteList(bestRouteData);
      setBestRouteList(data);
    };
    getBestRouteList();
  }, [bestRouteData.sortType]);

  return (
    <>
      {bestRouteList?.routes.map(
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
              onClick={() => navigate(ROUTES.BEST_ROUTE_DETAIL)}>
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

export default BestRouteList;
