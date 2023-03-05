import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { TriangleProps } from '@/types/receiptModal';

const ReceiptTriangle = ({ y }: TriangleProps) => {
  return (
    <TriangleContainer y={y}>
      {new Array(20).fill('').map((_, i) => (
        <Box
          key={i}
          pos='relative'
          w='0.6875rem'
          h='0.6875rem'
          mr='0.3rem'
          transform='rotate(45deg)'
          bg='white'
        />
      ))}
    </TriangleContainer>
  );
};

export default ReceiptTriangle;

const TriangleContainer = styled(Flex)<TriangleProps>`
  transform: ${({ y }) => `translateX(2.1px) translateY(${y}px)`};
  width: 312px;
`;
