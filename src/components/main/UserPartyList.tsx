import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import { fetchMyPartyList } from '@/api/main';
import { MyPartyList, MyPartyListParams } from '@/types/party';
import ROUTES from '@/utils/constants/routes';

import Loading from '../base/Loading';

const UserPartyList = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();

  const parameter: MyPartyListParams = {
    pageSize: 10000,
    partyType: 'ONGOING',
  };
  const {
    data: myPartyList,
    isLoading,
    isError,
  } = useQuery<MyPartyList>(['myPartyList'], () => fetchMyPartyList(parameter), {
    staleTime: 10000,
  });

  if (isError) return <></>;
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  const onMovePartyPage = (id: number) => {
    navigate(ROUTES.SCHEDULE, {
      state: {
        partyId: id,
      },
    });
  };

  const onMovePartyListPage = () => {
    navigate(ROUTES.PARTY_LIST);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    variableWidth: true,
    touchThreshold: 200,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
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
        {myPartyList.party.map(({ id, coverImage, name }) => (
          <Box key={id} onClick={() => !dragging && onMovePartyPage(id)}>
            <Box p='relative' w='5rem' h='5rem'>
              <Image
                src={coverImage ? '/logo-lg.svg' : coverImage}
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
              {name}
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
