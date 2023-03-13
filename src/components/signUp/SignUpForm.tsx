import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  checkEmailCertificaitonCode,
  fetchCheckEmail,
  fetchCheckNickname,
  sendEmailCertificationCode,
  signUp,
} from '@/api/user';
import { SignProps } from '@/types/userSign';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';
import ROUTES from '@/utils/constants/routes';
import { signUpSchema } from '@/utils/schema';

import Timer from './Timer';

const SignUpForm = () => {
  const navigate = useNavigate();
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
  const [pinShow, setPinShow] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certifyEmail, setCertifyEmail] = useState(false);
  const [watchEmail, watchNickname, watchPassword, watchPasswordConfirm] = watch([
    'email',
    'nickname',
    'password',
    'passwordConfirm',
  ]);

  const onSubmit = async (values: SignProps) => {
    if (!checkEmail) return setError('email', { message: FORM_ERROR_MESSAGES.DUPLICATE });
    if (!certifyEmail)
      return setError('email', { message: FORM_ERROR_MESSAGES.EMAIL_CERTIFIED });
    if (!checkNickname)
      return setError('nickname', { message: FORM_ERROR_MESSAGES.DUPLICATE });

    await signUp(values);
    navigate(ROUTES.SIGNIN, { replace: true });
  };

  const handleCheckEmail = async () => {
    const checkBefore = await trigger('email');
    const target = getValues('email');
    if (!checkBefore) return;

    try {
      await fetchCheckEmail(target);
      setCheckEmail(true);
    } catch (error) {
      setCheckEmail(false);
      setError('email', { message: FORM_ERROR_MESSAGES.EMAIL_DUPLICATED });
      console.error(error);
    }
  };

  const handleCheckNickname = async () => {
    const checkBefore = await trigger('nickname');
    const target = getValues('nickname');
    if (!checkBefore) return;

    try {
      await fetchCheckNickname(target);
      setCheckNickname(true);
    } catch (error) {
      setCheckNickname(false);
      setError('nickname', { message: FORM_ERROR_MESSAGES.NICKNAME_DUPLICATED });
    }
  };

  const handleSendCertificationCode = async () => {
    const target = getValues('email');
    if (!checkEmail) return;
    try {
      setIsLoading(true);
      setPinShow(false);
      await sendEmailCertificationCode(target);
      setPinShow(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePinCodeChange = (e: string) => {
    setPinCode(e);
  };

  const handleCertifyEmail = async () => {
    const email = getValues('email');
    try {
      const checkCertificationCode = await checkEmailCertificaitonCode(email, pinCode);
      if (checkCertificationCode) {
        setCertifyEmail(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!checkEmail) return;
    setCheckEmail(false);
    setPinShow(false);
    setCertifyEmail(false);
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
          <Flex align='center' gap='3'>
            <InputGroup size='md'>
              <Input id='email' placeholder='Email' {...register('email')} />
              <InputRightElement>
                {watchEmail && (
                  <MdCancel cursor='pointer' onClick={() => resetField('email')} />
                )}
              </InputRightElement>
            </InputGroup>
            <Button
              size='sm'
              onClick={handleCheckEmail}
              colorScheme={checkEmail ? 'green' : 'red'}>
              중복 확인
            </Button>
          </Flex>
          <Flex>
            <Box>
              {checkEmail && (
                <Text pt='2' pl='2' fontSize='sm' color='green'>
                  {certifyEmail
                    ? '이메일 인증이 완료되었습니다.'
                    : '사용 가능한 이메일입니다.'}
                </Text>
              )}
              <FormErrorMessage pl='2' pt='2' fontSize='sm' color='red'>
                {errors.email?.message}
              </FormErrorMessage>
            </Box>
            <Spacer />
            <Button
              mt='2'
              isLoading={isLoading}
              isDisabled={!checkEmail || certifyEmail}
              size='xs'
              onClick={handleSendCertificationCode}>
              {pinShow ? '이메일 인증 코드 재발급' : '이메일 인증 코드 받기'}
            </Button>
          </Flex>
        </FormControl>

        {pinShow && (
          <Flex align='center'>
            <Spacer />
            {!certifyEmail && (
              <Timer certifyEmail={certifyEmail} setPinShow={setPinShow} />
            )}
            <HStack>
              <PinInput
                onChange={handlePinCodeChange}
                isDisabled={certifyEmail}
                size='sm'>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
              <Button
                mt='2'
                size='xs'
                onClick={handleCertifyEmail}
                isDisabled={certifyEmail}
                colorScheme={certifyEmail ? 'green' : 'red'}>
                인증
              </Button>
            </HStack>
          </Flex>
        )}

        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel mt='-3' fontSize='xs' fontWeight='bold' color='gray'>
            닉네임
          </FormLabel>
          <Flex align='center' gap='3'>
            <InputGroup size='md'>
              <Input id='nickname' placeholder='닉네임' {...register('nickname')} />
              <InputRightElement>
                {watchNickname && (
                  <MdCancel cursor='pointer' onClick={() => resetField('nickname')} />
                )}
              </InputRightElement>
            </InputGroup>
            <Button
              size='sm'
              onClick={handleCheckNickname}
              colorScheme={checkNickname ? 'green' : 'red'}>
              중복 확인
            </Button>
          </Flex>
          <Box height='4'>
            {checkNickname && (
              <Text pt='2' pl='2' fontSize='sm' color='green'>
                사용 가능한 닉네임입니다.
              </Text>
            )}
            <FormErrorMessage pl={2} fontSize='sm' color='red' pt='2'>
              {errors.nickname?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
            비밀번호
          </FormLabel>
          <InputGroup size='md'>
            <Input
              id='password'
              placeholder='비밀번호'
              maxLength={12}
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
            <FormErrorMessage pl={2} fontSize='sm' color='red' pt='2'>
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
              maxLength={12}
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
