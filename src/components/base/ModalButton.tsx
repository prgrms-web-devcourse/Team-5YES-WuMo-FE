import { Button } from '@chakra-ui/react';

import { CreateModalButtonProps } from '@/types/button';

const ModalButton = ({
  text,
  isDisabled = false,
  clickButtonHandler,
}: CreateModalButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled}
      bg='primary.red'
      color='#ffffff'
      _hover={{
        bg: 'primary.redHover',
      }}
      w='full'
      onClick={clickButtonHandler}>
      {text}
    </Button>
  );
};

export default ModalButton;
