import { Container } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/api';
import SubmitButton from '@/components/base/SubmitButton';
import useLocalStorage from '@/hooks/useLocalStorage';
import { TokenProps } from '@/types/tokens';
import { SignInProps } from '@/types/userSign';
import ROUTES from '@/utils/constants/routes';
import { signInSchema } from '@/utils/schema';

import ControlledInput from '../base/ControlledInput';

const SignInForm = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage('tokens', {});
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
      const response = await axiosInstance.post('/members/login', values);
      const { accessToken, refreshToken }: TokenProps = response.data;
      setToken({
        accessToken,
        refreshToken,
      });
      navigate(ROUTES.MAIN);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput name='email' control={control} resetField={resetField} />
      <ControlledInput name='password' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='64' width='100%' colorScheme='orange'>
        로그인
      </SubmitButton>
    </Container>
  );
};

export default SignInForm;
