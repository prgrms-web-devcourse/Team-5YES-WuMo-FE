import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Common } from '@/src/styles/common';

type BackNavigationProps = {
  title?: string;
  option?: ReactNode;
};

const BackNavigation = ({ title, option }: BackNavigationProps) => {
  const navigate = useNavigate();
  return (
    <Nav>
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

export const SpanButton = styled.span`
  cursor: pointer;
`;

export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  max-width: ${Common.wideSize.mobile};
  background-color: ${Common.colors.white};
  padding: 1rem;
  top: 0;
`;

export const Title = styled.h1`
  position: absolute;
  font-size: ${Common.fontSize.xl};
  left: 50%;
  transform: translateX(-50%);
`;

export default BackNavigation;
