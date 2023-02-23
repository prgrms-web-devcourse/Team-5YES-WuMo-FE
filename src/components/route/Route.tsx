import { Box, Image } from '@chakra-ui/react';
import { MdFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/src/utils/routes';

const Route = () => {
  const navigate = useNavigate();
  const DUMMYDATA = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: '부산광역시',
    place: '부산광역시',
    title: '퇴사기념 부산 즉흥여행',
  };

  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      border='1px solid #cfcfcf'
      cursor='pointer'
      margin='0 auto 2rem auto'
      onClick={() => navigate(ROUTES.BEST_ROUTE_DETAIL)}>
      <Image src={DUMMYDATA.imageUrl} alt={DUMMYDATA.imageAlt} />

      <Box p='6'>
        <Box mb='2' fontWeight='semibold' as='h4' lineHeight='tight'>
          {DUMMYDATA.title}
        </Box>
        <Box as='span' color='gray.600' fontSize='sm'>
          {DUMMYDATA.place}
        </Box>
        <Box display='flex' justifyContent='right' mt='2' alignItems='center'>
          <MdFavorite />
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            124
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Route;
