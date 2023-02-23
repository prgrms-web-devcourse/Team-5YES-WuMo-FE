import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SignUpInputs } from '@/src/types/signup';
import { FORM_ERROR_MESSAGES } from '@/src/utils/constants/messages';
import { signUpSchema } from '@/src/utils/schema';

const DUMMY = {
  email: ['test@test.com', 'minjae@test.com'],
  nickname: ['minjae', 'test'],
};

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
  });
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const watchEmail = watch('email');
  const watchNickName = watch('nickname');

  const onSubmit = (values: SignUpInputs) => {
    const defaultImage = { profileImage: null };
    const { passwordConfirm, ...data } = values;
    const finalData = { ...data, ...defaultImage };

    if (!checkEmail) return setError('email', { message: FORM_ERROR_MESSAGES.DUPLICATE });
    if (!checkNickname)
      return setError('nickname', { message: FORM_ERROR_MESSAGES.DUPLICATE });

    console.log('비밀번호 확인:' + passwordConfirm);
    console.log(finalData);
  };

  const handleCheckEmail = async () => {
    const checkBefore = await trigger('email');
    const target = getValues('email');
    //나중에 server error로 수정
    if (!checkBefore) return;
    if (DUMMY.email.includes(target)) {
      setCheckEmail(false);
      setError('email', { message: FORM_ERROR_MESSAGES.EMAIL_DUPLICATED });
    } else {
      setCheckEmail(true);
    }
  };

  const handleCheckNickname = async () => {
    const checkBefore = await trigger('nickname');
    const target = getValues('nickname');
    //나중에 server error로 수정
    if (!checkBefore) return;
    if (DUMMY.nickname.includes(target)) {
      setCheckNickname(false);
      setError('nickname', { message: FORM_ERROR_MESSAGES.NICKNAME_DUPLICATED });
    } else {
      setCheckNickname(true);
    }
  };

  useEffect(() => {
    setCheckEmail(false);
  }, [watchEmail]);

  useEffect(() => {
    setCheckNickname(false);
  }, [watchNickName]);

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Flex>
          <Input id='email' placeholder='Email' {...register('email')} />
          <Button onClick={handleCheckEmail} colorScheme={checkEmail ? 'green' : 'red'}>
            중복 확인
          </Button>
        </Flex>
        <FormErrorMessage color='red'>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.nickname}>
        <FormLabel>Nickname</FormLabel>
        <Flex>
          <Input id='nickname' placeholder='Nickname' {...register('nickname')} />
          <Button
            onClick={handleCheckNickname}
            colorScheme={checkNickname ? 'green' : 'red'}>
            중복 확인
          </Button>
        </Flex>
        <FormErrorMessage color='red'>{errors.nickname?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          id='password'
          placeholder='Password'
          type='password'
          {...register('password')}
        />
        <FormErrorMessage color='red'>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.passwordConfirm}>
        <FormLabel>Password Confirm</FormLabel>
        <Input
          id='passwordConfirm'
          placeholder='Password Confirm'
          type='password'
          {...register('passwordConfirm')}
        />
        <FormErrorMessage color='red'>{errors.passwordConfirm?.message}</FormErrorMessage>
      </FormControl>

      <Center>
        <Button mt={4} colorScheme='orange' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </Center>
    </Container>
  );
};

export default SignUpForm;
