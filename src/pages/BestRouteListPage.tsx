import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import Route from '@/components/route/Route';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const BestRouteListPage = () => {
  return (
    <>
      <BackNavigation title='베스트 루트 목록' option={BACKNAVIGATION_OPTIONS.SEARCH} />
      <Box padding='5rem 2rem'>
        <Route />
        <Route />
        <Route />
        <Route />
      </Box>
    </>
  );
};

export default BestRouteListPage;
