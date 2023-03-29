import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import BackNavigation from '@/components/navigation/BackNavigation';
import RouteTimeline from '@/components/party/schedule/RouteTimeline';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const RouteDetailPage = () => {
  const { pathname } = useLocation();

  let pageTitle = '';
  if (pathname.includes('like-route')) {
    useDocumentTitle('WuMo | 관심 루트');
    pageTitle = '관심 루트';
  } else if (pathname.includes('best-route')) {
    useDocumentTitle('WuMo | 베스트 루트');
    pageTitle = '베스트 루트';
  }

  return (
    <>
      <BackNavigation title={pageTitle} />
      <Box py='20'>
        <RouteTimeline isPublic={true} />
      </Box>
    </>
  );
};

export default RouteDetailPage;
