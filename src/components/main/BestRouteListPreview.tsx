import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { fetchBestRouteList } from '@/api/schedules';
import { BestRouteListType } from '@/types/routeList';
import ROUTES from '@/utils/constants/routes';

import Loading from '../base/Loading';

const BestRouteListPreview = () => {
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
    pageSize: 5,
    sortType: 'LIKES',
  };

  const onMoveRoutePage = (id: string | number) => {
    navigate(`/best-route/${id}`);
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
    centerPadding: '100px',
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
            <Box
              key={route.routeId}
              onClick={() => !dragging && onMoveRoutePage(route.routeId)}
              outline='none'
              h='180px'>
              <Image src={route.image} pos='relative' w='100%' maxH='12.5rem' h='100%' />
              <Box
                pos='absolute'
                top='calc(50% - 1.125rem)'
                left='calc(50% - 6.25rem)'
                w='12.5rem'
                textAlign='center'>
                <Heading size='md'>{route.name}</Heading>
              </Box>
            </Box>
          ))}
        </StyledSlider>
      </>
    </>
  );
};

export default BestRouteListPreview;

const StyledSlider = styled(Slider)`
  .slick-slide {
    opacity: 0.8;
    transform: scale(0.9);
    transition: all 500ms ease;
    display: inline-block;
    max-height: 12.5rem;
    padding: 0 1.25rem;
  }

  .slick-center {
    transform: scale(1.06);
  }
`;
