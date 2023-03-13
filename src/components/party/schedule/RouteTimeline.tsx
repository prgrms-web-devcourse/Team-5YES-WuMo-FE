import { Box, List } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import { ScheduleType, TimeLineProps } from '@/types/schedule';

import RouteReleaseChange from './RouteReleaseChange';
import RouteTimelineItem from './RouteTimelineItem';

const RouteTimeline = ({ onClickHandler, routerButton, isPublic }: TimeLineProps) => {
  // 상세조회를 partyId로 할지 routeId로 할지
  // 둘 다 할지 백엔드에서 아직 결정이 안남
  const { partyId } = useParams();

  const {
    data: scheduleList,
    isLoading,
    isFetching,
    isError,
  } = useQuery<ScheduleType>(
    ['scheduleList', partyId],
    () => fetchScheduleList(Number(partyId), isPublic),
    {
      staleTime: 10000,
    }
  );
  if (isLoading || isFetching)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;

  return (
    <Box pos='relative'>
      <RouteReleaseChange scheduleList={scheduleList} routeId={scheduleList.id} />
      <StyleList>
        {scheduleList.locations.map((route) => (
          <RouteTimelineItem
            key={route.id}
            {...route}
            routeId={scheduleList.id}
            onClickHandler={onClickHandler}
            routerButton={routerButton}
          />
        ))}
      </StyleList>
    </Box>
  );
};

export default RouteTimeline;

const StyleList = styled(List)`
  position: relative;

  &::before {
    content: '';
    height: 100%;
    border: 1px solid #e0e0e0;
    position: absolute;
    left: 13.5%;
  }
`;
