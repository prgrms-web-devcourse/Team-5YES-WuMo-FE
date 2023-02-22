import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import ROUTES from '@/src/utils/routes';

const DUMMYDATA = [
  {
    image: 'https://via.placeholder.com/700x500',
    name: '졸업 기념 여행',
    place: '부산',
    id: '1',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '덕질 여행 가보자고',
    place: '일본',
    id: '2',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '갈 땐 4명이지만 올 땐 2명',
    place: '서울',
    id: '3',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '뉴진스 하입보이요',
    place: '강릉',
    id: '4',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '회사원도 여행갈 수 있어요',
    place: '서울',
    id: '5',
  },
];

const BestLouteList = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();

  const onBeforeChange = useCallback(() => {
    setDragging(true);
  }, []);

  const onAfterChange = useCallback(() => {
    setDragging(false);
  }, []);

  const onMoveRoutePage = (id: string) => {
    navigate(`/route/${id}`);
  };

  const onMoveBestRoutePage = () => {
    navigate(ROUTES.BEST_ROUTE);
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
    beforeChange: onBeforeChange,
    afterChange: onAfterChange,
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

  return (
    <>
      <Flex direction='row' justify='space-between' align='center' p='1.25rem 1.875rem'>
        <Heading size='sm'>베스트 여행루트</Heading>
        <Button size='sm' onClick={onMoveBestRoutePage}>
          더보기
        </Button>
      </Flex>
      <>
        <StyledSlider {...settings}>
          {DUMMYDATA.map((route) => (
            <Box
              key={route.id}
              onClick={() => !dragging && onMoveRoutePage(route.id)}
              outline='none'>
              <Image src={route.image} pos='relative' w='100%' maxH='12.5rem' />
              <Box
                pos='absolute'
                top='calc(50% - 1.5625rem)'
                left='calc(50% - 6.25rem)'
                w='12.5rem'
                textAlign='center'>
                <Heading size='md'>{route.name}</Heading>
                <Text>{route.place}</Text>
              </Box>
            </Box>
          ))}
        </StyledSlider>
      </>
    </>
  );
};

export default BestLouteList;

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
