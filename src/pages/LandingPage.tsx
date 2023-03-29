import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';

import LargeLogo from '@/components/base/LargeLogo';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { LandingPageItem } from '@/utils/constants/landingPageItem';
import ROUTES from '@/utils/constants/routes';

const LandingPage = () => {
  useDocumentTitle('WuMo | 우리들의 모임');
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    touchThreshold: 200,
    adaptiveHeight: false,
  };

  return (
    <Box py='4rem'>
      <LargeLogo src='/logo-lg.svg' />
      <Box bg='#ececec' mx='2rem' borderRadius='1rem'>
        <StyledSlider {...settings}>
          {LandingPageItem.map(({ id, imageUrl, content }) => (
            <VStack key={id} textAlign='center'>
              <Image fallbackSrc='/skeleton.svg' src={imageUrl} w='100%' />
              <Text fontWeight='bold' fontSize='1.2rem' pt='1rem' wordBreak='keep-all'>
                {content}
              </Text>
            </VStack>
          ))}
        </StyledSlider>
      </Box>
      <Flex flexDirection='column' gap='1rem' alignItems='center' mt='4rem'>
        <Button
          w='80%'
          bg='primary.red'
          _hover={{ bg: 'primary.redHover' }}
          color='white'
          onClick={() => navigate(ROUTES.SIGNUP)}>
          시작하기
        </Button>
        <Button w='80%' fontWeight='bold' onClick={() => navigate(ROUTES.SIGNIN)}>
          로그인
        </Button>
      </Flex>
    </Box>
  );
};

export default LandingPage;

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 4rem 0;
    .slick-slide {
      transform: scale(0.9);
      transition: all 500ms ease;
      display: inline-block;
      max-height: 30rem;
      height: 100%;
      padding: 0 1.25rem;
    }
  }
`;
