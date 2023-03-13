import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import BestRouteMoreList from '@/components/routeList/BestRouteMoreList';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const BestRouteListPage = () => {
  return (
    <>
      <BackNavigation title='베스트 루트 목록' option={BACKNAVIGATION_OPTIONS.SEARCH} />
      <Box p='10rem 2rem 2rem 2rem'>
        <BestRouteMoreList />
      </Box>
    </>
  );
};

export default BestRouteListPage;
