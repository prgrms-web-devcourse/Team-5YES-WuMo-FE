import { Button, Center, Container, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { signUp } from '@/api/user';
import ControlledInput from '@/components/base/ControlledInput';
import { SignProps } from '@/types/userSign';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';
import ROUTES from '@/utils/constants/routes';
import { signUpSchema } from '@/utils/schema';

import EmailInput from './EmailInput';
import NicknameInput from './NicknameInput';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const [certifyEmail, setCertifyEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    trigger,
    resetField,
    formState: { isSubmitting },
  } = useForm<SignProps>({
    mode: 'all',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (values: SignProps) => {
    if (!checkEmail) return setError('email', { message: FORM_ERROR_MESSAGES.DUPLICATE });
    if (!certifyEmail)
      return setError('email', { message: FORM_ERROR_MESSAGES.EMAIL_CERTIFIED });
    if (!checkNickname)
      return setError('nickname', { message: FORM_ERROR_MESSAGES.DUPLICATE });

    await signUp(values);
    navigate(ROUTES.SIGNIN, { replace: true });
  };

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <EmailInput
          name='email'
          control={control}
          resetField={resetField}
          trigger={trigger}
          setError={setError}
          checkEmailState={[checkEmail, setCheckEmail]}
          certifyEmailState={[certifyEmail, setCertifyEmail]}
        />
        <NicknameInput
          name='nickname'
          control={control}
          resetField={resetField}
          trigger={trigger}
          setError={setError}
          checkNicknameState={[checkNickname, setCheckNickname]}
        />
        <ControlledInput name='password' control={control} resetField={resetField} />
        <ControlledInput
          name='passwordConfirm'
          control={control}
          resetField={resetField}
        />
        <Center>
          <Button
            mt='9'
            width='100%'
            colorScheme='orange'
            isLoading={isSubmitting}
            type='submit'>
            회원가입
          </Button>
        </Center>
      </Stack>
    </Container>
  );
};

export default SignUpForm;
