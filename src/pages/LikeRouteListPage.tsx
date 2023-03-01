import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import Route from '@/components/route/Route';

const LikeRouteListPage = () => {
  return (
    <>
      <BackNavigation title='관심 목록' />
      <Box padding='5rem 2rem'>
        <Route />
      </Box>
    </>
  );
};

export default LikeRouteListPage;
