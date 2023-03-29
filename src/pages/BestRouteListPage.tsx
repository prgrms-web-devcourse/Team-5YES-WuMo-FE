import { Box } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import BestRouteMoreList from '@/components/routeList/BestRouteMoreList';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const BestRouteListPage = () => {
  useDocumentTitle('WuMo | 베스트 모임 루트');
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
