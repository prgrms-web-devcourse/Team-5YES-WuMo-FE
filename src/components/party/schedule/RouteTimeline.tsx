import { List } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { TimeLineProps } from '@/types/schedule';

import RouteTimelineItem from './RouteTimelineItem';

const DUMMYDATA = {
  likeCount: 10,
  locations: [
    {
      id: 1,
      name: '다이도코로',
      address: '부산 수영구 남천동로108번길 27 2층 다이도코로',
      latitude: '34.56789',
      longitude: '123.56789',
      image: 'https://ifh.cc/g/k1PnR2.jpg',
      description: '가라아게 존맛',
      visitDate: '2023-02-28T07:11:14.766Z',
      spending: 55000,
      category: 'meal',
    },
    {
      id: 2,
      name: '룸즈에이 서면점',
      address: '부산 부산진구 중앙대로680번가길 9 3층',
      latitude: '34.56789',
      longitude: '123.56789',
      image: 'https://ifh.cc/g/pQ78VB.jpg',
      description: '방탈출 가보자고',
      visitDate: '2023-02-28T07:11:14.766Z',
      spending: 80000,
      category: 'culture',
    },
    {
      id: 3,
      name: '럭키상회',
      address: '부산 부산진구 중앙대로680번가길 75-1',
      latitude: '34.56789',
      longitude: '123.56789',
      image: 'https://ifh.cc/g/2GSGcZ.jpg',
      description: '부산하면 회지',
      visitDate: '2023-02-28T07:11:14.766Z',
      spending: 50000,
      category: 'beer',
    },
    {
      id: 4,
      name: '해운대 스카이캡슐',
      address: '부산 해운대구 달맞이길62번길 13',
      latitude: '34.56789',
      longitude: '123.56789',
      image: 'https://ifh.cc/g/ZzdCmH.jpg',
      description: '해운대에서 스카이캡슐 타기!',
      visitDate: '2023-02-28T07:11:14.766Z',
      spending: 30000,
      category: 'sightseeing',
    },
  ],
  image: 'https://via.placeholder.com/300',
  name: '퇴사 기념 여행',
};

const RouteTimeline = ({ onClickhandler, routerButton }: TimeLineProps) => {
  return (
    <>
      <StyleList>
        {DUMMYDATA.locations.map((route) => (
          <RouteTimelineItem
            key={route.id}
            {...route}
            onClickhandler={onClickhandler}
            routerButton={routerButton}
          />
        ))}
      </StyleList>
    </>
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
