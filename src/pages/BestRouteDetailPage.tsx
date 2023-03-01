import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import RouteTimeline from '@/components/party/schedule/RouteTimeline';

const BestRouteDetailPage = () => {
  return (
    <>
      <BackNavigation title='베스트 루트' />
      <Box py='20'>
        <RouteTimeline />
      </Box>
    </>
  );
};

export default BestRouteDetailPage;
