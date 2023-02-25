import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

import { SignProps } from '@/types/userSign';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';
import { signUpSchema } from '@/utils/schema';

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
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<SignProps>({
    mode: 'all',
    resolver: yupResolver(signUpSchema),
  });
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const [watchEmail, watchNickname, watchPassword, watchPasswordConfirm] = watch([
    'email',
    'nickname',
    'password',
    'passwordConfirm',
  ]);

  const onSubmit = (values: SignProps) => {
    if (!checkEmail) return setError('email', { message: FORM_ERROR_MESSAGES.DUPLICATE });
    if (!checkNickname)
      return setError('nickname', { message: FORM_ERROR_MESSAGES.DUPLICATE });

    console.log(values);
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
    if (!checkEmail) return;
    setCheckEmail(false);
  }, [watchEmail]);

  useEffect(() => {
    if (!checkNickname) return;
    setCheckNickname(false);
  }, [watchNickname]);

  return (
    <Container as='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
            Email
          </FormLabel>
          <InputGroup size='md'>
            <Input id='email' placeholder='Email' {...register('email')} />
            <InputRightElement>
              {watchEmail && (
                <MdCancel cursor='pointer' onClick={() => resetField('email')} />
              )}
            </InputRightElement>
          </InputGroup>
          <Flex>
            {checkEmail && (
              <Text mt={4} pl={2} fontSize='sm' color='green'>
                사용 가능한 이메일입니다.
              </Text>
            )}
            <FormErrorMessage pl={2} fontSize='sm' color='red' mt={2}>
              {errors.email?.message}
            </FormErrorMessage>
            <Spacer />
            <Button
              mt={2}
              size='sm'
              onClick={handleCheckEmail}
              colorScheme={checkEmail ? 'green' : 'red'}>
              중복 확인
            </Button>
          </Flex>
        </FormControl>

        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
            닉네임
          </FormLabel>
          <InputGroup size='md'>
            <Input id='nickname' placeholder='닉네임' {...register('nickname')} />
            <InputRightElement>
              {watchNickname && (
                <MdCancel cursor='pointer' onClick={() => resetField('nickname')} />
              )}
            </InputRightElement>
          </InputGroup>
          <Flex>
            {checkNickname && (
              <Text mt={4} pl={2} fontSize='sm' color='green'>
                사용 가능한 닉네임입니다.
              </Text>
            )}
            <FormErrorMessage pl={2} fontSize='sm' color='red' mt={2}>
              {errors.nickname?.message}
            </FormErrorMessage>
            <Spacer />
            <Button
              mt={2}
              size='sm'
              onClick={handleCheckNickname}
              colorScheme={checkNickname ? 'green' : 'red'}>
              중복 확인
            </Button>
          </Flex>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
            비밀번호
          </FormLabel>
          <InputGroup size='md'>
            <Input
              id='password'
              placeholder='비밀번호'
              type='password'
              {...register('password')}
            />
            <InputRightElement>
              {watchPassword && (
                <MdCancel cursor='pointer' onClick={() => resetField('password')} />
              )}
            </InputRightElement>
          </InputGroup>
          <Box height={4}>
            <FormErrorMessage pl={2} fontSize='sm' color='red' pt={2}>
              {errors.password?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <FormControl isInvalid={!!errors.passwordConfirm}>
          <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
            비밀번호 확인
          </FormLabel>
          <InputGroup size='md'>
            <Input
              id='passwordConfirm'
              placeholder='비밀번호 확인'
              type='password'
              {...register('passwordConfirm')}
            />
            <InputRightElement>
              {watchPasswordConfirm && (
                <MdCancel
                  cursor='pointer'
                  onClick={() => resetField('passwordConfirm')}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Box height={4}>
            <FormErrorMessage pl={2} fontSize='sm' color='red' pt={2}>
              {errors.passwordConfirm?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <Center>
          <Button
            mt={4}
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
