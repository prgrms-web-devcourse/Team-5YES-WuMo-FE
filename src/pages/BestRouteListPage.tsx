import { Box } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import BackNavigation from '@/components/navigation/BackNavigation';
import BestRouteMoreList from '@/components/routeList/BestRouteMoreList';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { recoilBestRouteListParams } from '@/store/recoilRouteListState';
import { BestRouteListParamsType } from '@/types/routeList';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const BestRouteListPage = () => {
  useDocumentTitle('WuMoㅤ|ㅤ추천 일정 목록');
  const bestRouteParams = useRecoilValue<BestRouteListParamsType>(
    recoilBestRouteListParams
  );

  return (
    <>
      <BackNavigation
        title={
          bestRouteParams.sortType === 'NEWEST' ? '최신 일정 목록' : '인기 일정 목록'
        }
        option={BACKNAVIGATION_OPTIONS.SEARCH}
      />
      <Box p='10rem 2rem 2rem 2rem'>
        <BestRouteMoreList />
      </Box>
    </>
  );
};

export default BestRouteListPage;
