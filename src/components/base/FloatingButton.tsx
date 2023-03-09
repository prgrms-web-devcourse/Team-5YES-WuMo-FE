import { Box, Button } from '@chakra-ui/react';
import { css } from '@emotion/react';

import { FloatingButtonProps } from '@/types/button';

const FloatingButton = ({ icon, onClick }: FloatingButtonProps) => {
  return (
    <Box
      css={css`
        direction: rtl;
      `}>
      <Button
        p='0'
        pos='fixed'
        bottom='100px'
        mr='0.625rem'
        bg='primary.yellow'
        borderRadius='50%'>
        <Box fontSize='3xl' onClick={onClick}>
          {icon}
        </Box>
      </Button>
    </Box>
  );
};

export default FloatingButton;
