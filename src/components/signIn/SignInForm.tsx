import { Container } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import axios from '@/api/api';
import SubmitButton from '@/components/base/SubmitButton';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SignInProps } from '@/types/userSign';
import { signInSchema } from '@/utils/schema';

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
    // 사용 예시
    const response = axios.post('/api/v1/members/login', values);
    console.log(response);

    console.log(token);
    console.log(values);
    setToken(values);
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <SignInInput name='email' control={control} resetField={resetField} />
      <SignInInput name='password' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='64' width='100%' colorScheme='orange'>
        로그인
      </SubmitButton>
    </Container>
  );
};

export default SignInForm;
