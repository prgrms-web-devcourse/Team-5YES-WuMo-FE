import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import ROUTES from '@/src/utils/routes';

const DUMMYDATA = [
  {
    image: 'https://via.placeholder.com/700x500',
    name: '가보자고',
    id: '1',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '먹부림',
    id: '2',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '겨울바다여행레츠고',
    id: '3',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '퇴사기념',
    id: '4',
  },
  {
    image: 'https://via.placeholder.com/700x500',
    name: '취업기념',
    id: '5',
  },
];

const UserPartyList = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();

  const onBeforeChange = useCallback(() => {
    setDragging(true);
  }, []);

  const onAfterChange = useCallback(() => {
    setDragging(false);
  }, []);

  const onMovePartyPage = (id: string) => {
    navigate(`/party/${id}`);
  };

  const onMovePartyListPage = () => {
    navigate(ROUTES.PARTY_LIST);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    variableWidth: true,
    touchThreshold: 200,
    beforeChange: onBeforeChange,
    afterChange: onAfterChange,
    adaptiveHeight: false,
  };
  return (
    <>
      <Flex direction='row' justify='space-between' align='center' p='1.25rem 1.875rem'>
        <Heading size='sm'>내 모임목록</Heading>
        <Button size='sm' onClick={onMovePartyListPage}>
          전체보기
        </Button>
      </Flex>
      <StyledSlider {...settings}>
        {DUMMYDATA.map((party) => (
          <Box key={party.id} onClick={() => !dragging && onMovePartyPage(party.id)}>
            <Box p='relative' w='80px' h='80px'>
              <Image
                src={party.image}
                p='absolute'
                top='0'
                left='0'
                h='100%'
                w='100%'
                objectFit='cover'
                borderRadius='1.25rem'
              />
            </Box>
            <Heading size='xs' wordBreak='break-all' textAlign='center'>
              {party.name}
            </Heading>
          </Box>
        ))}
      </StyledSlider>
    </>
  );
};

export default UserPartyList;
const StyledSlider = styled(Slider)`
  .slick-slide {
    margin: 0 1.25rem;
    width: 5rem;
    display: inline-block;
  }
`;
