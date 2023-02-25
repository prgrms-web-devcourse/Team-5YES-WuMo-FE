import { Container } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import useLocalStorage from '@/src/hooks/useLocalStorage';
import { SignInProps } from '@/src/types/userSign';
import { signInSchema } from '@/src/utils/schema';

import SubmitButton from '../base/SubmitButton';
import SignInInput from './SignInInput';

const SignInForm = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<SignInProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (values: SignInProps) => {
    console.log(token);
    console.log(values);
    setToken(values);
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <SignInInput name='email' control={control} resetField={resetField} />
      <SignInInput name='password' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='48' width='100%' colorScheme='orange'>
        로그인
      </SubmitButton>
    </Container>
  );
};

export default SignInForm;
