import { Button, Container, Flex, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { BackNavigationProps } from '@/types/backNavigation';

const BackNavigation = ({ title, option }: BackNavigationProps) => {
  const [isShowSearch, setIsShowSearch] = useState(false);

  const navigate = useNavigate();
  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20'>
      <Flex justify='space-between'>
        <SpanButton onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </SpanButton>
        <Title>{title}</Title>
        <SpanButton onClick={() => setIsShowSearch(!isShowSearch)}>{option}</SpanButton>
      </Flex>
      {option && isShowSearch ? (
        <Flex
          px='1rem'
          justifyContent='space-between'
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}>
          <Input
            placeholder='검색어를 입력하세요.'
            w='80%'
            fontSize='0.75rem'
            padding='8px'
          />
          <Button fontSize='0.875rem'>검색</Button>
        </Flex>
      ) : (
        ''
      )}
    </Nav>
  );
};

const SpanButton = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  padding-top: 4px;
`;

const Nav = styled(Container)`
  position: fixed;
  width: 100%;
  padding: 1rem;
  top: 0;
`;

const Title = styled.h1`
  position: absolute;
  font-size: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
`;

export default BackNavigation;
