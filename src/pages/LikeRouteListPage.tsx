import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import LikeRouteList from '@/components/routeList/LikeRouteList';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const LikeRouteListPage = () => {
  useDocumentTitle('WuMoㅤ|ㅤ관심 목록');
  return (
    <>
      <BackNavigation title='관심 목록' />
      <Box padding='5rem 2rem'>
        <LikeRouteList />
      </Box>
    </>
  );
};

export default LikeRouteListPage;
