import { Container, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { BackNavigationProps } from '@/types/backNavigation';

const BackNavigation = ({ title, option }: BackNavigationProps) => {
  const navigate = useNavigate();
  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20'>
      <Flex justify='space-between'>
        <SpanButton onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </SpanButton>
        <Title>{title}</Title>
        <SpanButton>{option}</SpanButton>
      </Flex>
    </Nav>
  );
};

const SpanButton = styled.span`
  cursor: pointer;
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
