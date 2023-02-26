import { Button, Center } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type SubmitButtonProps = {
  isSubmitting: boolean;
  [props: string]: unknown;
};

const SubmitButton = ({
  children,
  isSubmitting,
  ...props
}: PropsWithChildren<SubmitButtonProps>) => {
  return (
    <Center>
      <Button isLoading={isSubmitting} {...props} type='submit'>
        {children}
      </Button>
    </Center>
  );
};

export default SubmitButton;
