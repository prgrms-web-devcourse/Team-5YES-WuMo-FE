import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { ToastItemType } from '@/types/toast';
import ROUTES from '@/utils/constants/routes';
import { toastType } from '@/utils/constants/toast';

const ToastItem = ({
  message,
  duration,
  onDone,
  type,
  backgroundColor,
  icon,
  iconColor,
  fontColor,
  title,
  titleColor,
  authError,
}: ToastItemType) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      onDone();
      if (authError) {
        location.replace(ROUTES.LANDING);
      }
    }, duration);
  }, []);

  return (
    <Container
      style={{
        opacity: show ? 1 : 0,
        backgroundColor: type ? toastType[type].backgroundColor : backgroundColor,
        color: fontColor,
      }}>
      <Box fontSize='26px' pr='10px' color={type ? toastType[type].iconColor : iconColor}>
        {type ? toastType[type].icon : icon}
      </Box>
      <Flex direction='column'>
        <Heading
          fontSize='1.125rem'
          fontWeight='600'
          color={type ? toastType[type].titleColor : titleColor}>
          {title}
        </Heading>
        <Text color={type ? toastType[type].fontColor : fontColor}>{message}</Text>
      </Flex>
    </Container>
  );
};

export default ToastItem;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 21.875rem;
  height: 100%;
  padding: 1.25rem;
  align-items: center;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }

  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @keyframes move {
    0% {
      margin-top: 80px;
    }

    100% {
      margin-top: 0;
    }
  }
`;
