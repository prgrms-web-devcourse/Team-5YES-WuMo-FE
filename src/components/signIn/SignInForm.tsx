import { Container } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from '@/api/api';
import SubmitButton from '@/components/base/SubmitButton';
import useLocalStorage from '@/hooks/useLocalStorage';
import { TokenProps } from '@/types/tokens';
import { SignInProps } from '@/types/userSign';
import ROUTES from '@/utils/constants/routes';
import { signInSchema } from '@/utils/schema';

import SignInInput from './SignInInput';

const SignInForm = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage('accessToken', '');
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

  const onSubmit = async (values: SignInProps) => {
    try {
      const response = await axios.post('/api/v1/members/login', values);
      const { accessToken, refreshToken }: TokenProps = response.data;
      document.cookie = `refreshToken=${refreshToken};`;
      setToken(accessToken);
      navigate(ROUTES.MAIN);
    } catch (error) {
      console.error(error);
    }
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
