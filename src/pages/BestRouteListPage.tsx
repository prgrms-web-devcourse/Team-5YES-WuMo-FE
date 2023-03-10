import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import BestRouteList from '@/components/routeList/BestRouteList';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const BestRouteListPage = () => {
  return (
    <>
      <BackNavigation title='베스트 루트 목록' option={BACKNAVIGATION_OPTIONS.SEARCH} />
      <Box padding='8rem 2rem'>
        <BestRouteList />
      </Box>
    </>
  );
};

export default BestRouteListPage;
