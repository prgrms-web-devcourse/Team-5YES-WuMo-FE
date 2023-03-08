import { List } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import { ScheduleType, TimeLineProps } from '@/types/schedule';

import RouteTimelineItem from './RouteTimelineItem';

const RouteTimeline = ({ onClickHandler, routerButton, isPublic }: TimeLineProps) => {
  const {
    data: scheduleList,
    isLoading,
    isError,
  } = useQuery<ScheduleType>(['scheduleList'], () => fetchScheduleList(11, isPublic), {
    staleTime: 10000,
  });

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;
  return (
    <StyleList>
      {scheduleList.locations.map((route) => (
        <RouteTimelineItem
          key={route.id}
          {...route}
          onClickHandler={onClickHandler}
          routerButton={routerButton}
        />
      ))}
    </StyleList>
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
