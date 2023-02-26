import { Box } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import BackNavigation from '@/components/navigation/BackNavigation';
import Route from '@/components/route/Route';

const BestRouteListPage = () => {
  return (
    <>
      <BackNavigation title='베스트 루트 목록' option={<MdSearch />} />
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
