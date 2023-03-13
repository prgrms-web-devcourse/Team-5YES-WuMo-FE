import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button, Flex, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { fetchBestRouteList } from '@/api/main';
import { BestRouteListType } from '@/types/routeList';
import ROUTES from '@/utils/constants/routes';

import Loading from '../base/Loading';
import BestRouteListItem from './BestRouteListItem';

const BestRouteList = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    data: BestRouteList,
    isLoading,
    isError,
  } = useQuery<BestRouteListType>(
    ['BestRouteList'],
    () => fetchBestRouteList(parameter),
    {
      staleTime: 10000,
    }
  );

  const parameter = {
    pageSize: 10000,
    sortType: 'LIKES',
  };

  const onMoveBestRoutePage = () => {
    navigate(ROUTES.BEST_ROUTE_LIST);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '120px',
    touchThreshold: 200,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 447,
        settings: {
          centerPadding: '50px',
        },
      },
    ],
  };
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError) return <></>;

  return (
    <>
      <Flex direction='row' justify='space-between' align='center' p='1.25rem 1.875rem'>
        <Heading size='sm'>베스트 모임루트</Heading>
        <Button size='sm' onClick={onMoveBestRoutePage}>
          더보기
        </Button>
      </Flex>
      <>
        <StyledSlider {...settings}>
          {BestRouteList.routes.map((route) => (
            <BestRouteListItem key={route.routeId} dragging={dragging} {...route} />
          ))}
        </StyledSlider>
      </>
    </>
  );
};

export default BestRouteList;

const StyledSlider = styled(Slider)`
  .slick-slide {
    transform: scale(0.9);
    transition: all 500ms ease;
    display: inline-block;
    max-height: 13.75rem;
    padding: 0 1.25rem;
    height: 220px;
  }

  .slick-center {
    transform: scale(1.06);
  }
`;
