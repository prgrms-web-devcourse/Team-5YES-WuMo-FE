import { Button } from '@chakra-ui/react';

type BottomSheetButtonProps = {
  isSubmitting: boolean;
  isDisabled: boolean;
  buttonText: string;
  onClick?: () => void;
};

const BottomSheetButton = ({
  isSubmitting,
  isDisabled,
  buttonText,
  onClick,
  ...props
}: BottomSheetButtonProps) => {
  return (
    <Button
      type='submit'
      isLoading={isSubmitting}
      isDisabled={isDisabled}
      bg='primary.red'
      color='white'
      size='lg'
      w='99%'
      marginTop='40px'
      borderRadius='2xl'
      onClick={onClick}
      _hover={{ backgroundColor: 'none' }}
      {...props}>
      {buttonText}
    </Button>
  );
};

export default BottomSheetButton;
