import { Container } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { signIn } from '@/api/user';
import ControlledInput from '@/components/base/input/ControlledInput';
import SubmitButton from '@/components/base/SubmitButton';
import useLocalStorage from '@/hooks/useLocalStorage';
import { SignInProps } from '@/types/userSign';
import { AT_KEY } from '@/utils/constants/auth';
import ROUTES from '@/utils/constants/routes';
import { signInSchema } from '@/utils/schema';

const SignInForm = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage(AT_KEY, {});
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
      const token = await signIn(values);
      if (token) {
        const { accessToken } = token;
        setToken(accessToken);
        navigate(ROUTES.MAIN, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput name='email' control={control} resetField={resetField} />
      <ControlledInput name='password' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='28' width='100%' colorScheme='orange'>
        로그인
      </SubmitButton>
    </Container>
  );
};

export default SignInForm;
