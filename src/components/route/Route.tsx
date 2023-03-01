import { Box, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MdFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

import { PlaceList } from './PlaceLocationList';

const Route = () => {
  const navigate = useNavigate();
  const DUMMY_DATA = {
    routes: [
      {
        locations: [
          {
            id: '1',
            name: '오예스 식당',
            address: '부산광역시 수영구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '2',
            name: '육예스 식당',
            address: '울산광역시 수성구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '3',
            name: '칠예스 식당',
            address: '포항시 포항구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '4',
            name: '팔예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '5',
            name: '구예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '6',
            name: '십예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
        ],
        image: 'https://bit.ly/2Z4KKcF',
        name: '퇴사 기념 여행',
        startDate: '2023-03-01T05:24:41.646Z',
        endDate: '2023-03-01T05:24:41.646Z',
      },
      {
        locations: [
          {
            id: '1',
            name: '오예스 식당',
            address: '부산광역시 수영구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '2',
            name: '육예스 식당',
            address: '울산광역시 수성구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '3',
            name: '칠예스 식당',
            address: '포항시 포항구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '4',
            name: '팔예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
        ],
        image: 'https://bit.ly/2Z4KKcF',
        name: '퇴사 기념 여행',
        startDate: '2023-03-01T05:24:41.646Z',
        endDate: '2023-03-01T05:24:41.646Z',
      },
      {
        locations: [
          {
            id: '1',
            name: '오예스 식당',
            address: '부산광역시 수영구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '2',
            name: '육예스 식당',
            address: '울산광역시 수성구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '3',
            name: '칠예스 식당',
            address: '포항시 포항구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '4',
            name: '팔예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
        ],
        image: 'https://bit.ly/2Z4KKcF',
        name: '퇴사 기념 여행',
        startDate: '2023-03-01T05:24:41.646Z',
        endDate: '2023-03-01T05:24:41.646Z',
      },
      {
        locations: [
          {
            id: '1',
            name: '오예스 식당',
            address: '부산광역시 수영구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '2',
            name: '육예스 식당',
            address: '울산광역시 수성구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '3',
            name: '칠예스 식당',
            address: '포항시 포항구',
            image: 'https://bit.ly/2Z4KKcF',
          },
          {
            id: '4',
            name: '팔예스 식당',
            address: '마산시 마산구',
            image: 'https://bit.ly/2Z4KKcF',
          },
        ],
        image: 'https://bit.ly/2Z4KKcF',
        name: '퇴사 기념 여행',
        startDate: '2023-03-01T05:24:41.646Z',
        endDate: '2023-03-01T05:24:41.646Z',
      },
    ],
    lastId: 10,
  };

  const { routes } = DUMMY_DATA;

  return (
    <>
      {routes.map(({ locations, image, name, startDate, endDate }, index) => {
        return (
          <Box
            key={index}
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
              <PlaceList locations={locations} />
              <Box mb='2' fontWeight='semibold' as='h3' lineHeight='tight'>
                {name}
              </Box>
              <Text fontSize='xs'>{`${dayjs(startDate).format(
                'YYYY년 MM월 DD일'
              )} ~ ${dayjs(endDate).format('YYYY년 MM월 DD일')}`}</Text>
              <Box display='flex' justifyContent='right' mt='2' alignItems='center'>
                <MdFavorite />
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                  124
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Route;
