import { List } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { fetchScheduleList } from '@/api/schedules';
import { ScheduleType, TimeLineProps } from '@/types/schedule';

import RouteTimelineItem from './RouteTimelineItem';

const RouteTimeline = ({ onClickHandler, routerButton, isPublic }: TimeLineProps) => {
  const { state } = useLocation();

  const { data: scheduleList, status } = useQuery<ScheduleType>(
    ['scheduleList'],
    () => fetchScheduleList(state.partyId, isPublic),
    {
      staleTime: 10000,
    }
  );

  if (status === 'error') return <></>;
  if (status === 'loading') return <></>;

  return (
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
