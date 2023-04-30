import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseFormResetField,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { MdCancel, MdCheckCircleOutline } from 'react-icons/md';

import {
  checkEmailCertificaitonCode,
  fetchCheckEmail,
  sendEmailCertificationCode,
} from '@/api/user';
import Timer from '@/components/userSign/signUp/Timer';
import useDebounce from '@/hooks/useDebounce';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';

interface UserInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  resetField: UseFormResetField<T>;
  trigger: UseFormTrigger<T>;
  setError: UseFormSetError<T>;
  checkEmailState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  certifyEmailState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const EmailInput = <T extends FieldValues>({
  name,
  control,
  resetField,
  trigger,
  setError,
  checkEmailState,
  certifyEmailState,
}: UserInputProps<T>) => {
  const ref = useRef<HTMLInputElement>(null);
  const { field, fieldState } = useController({ name, control });

  const [checkEmail, setCheckEmail] = checkEmailState;
  const [certifyEmail, setCertifyEmail] = certifyEmailState;

  const [pinShow, setPinShow] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const debouncePinCode = useDebounce<string>(pinCode, 500);

  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [pinCheckLoading, setPinCheckLoading] = useState(false);

  const handleCheckEmail = async () => {
    const checkBefore = await trigger(name);
    const target = field.value;
    if (!checkBefore) return;

    try {
      await fetchCheckEmail(target);
      setCheckEmail(true);
    } catch (error) {
      setCheckEmail(false);
      setError(name, { message: FORM_ERROR_MESSAGES.EMAIL_DUPLICATED });
      console.error(error);
    }
  };

  const handleSendCertificationCode = async () => {
    const target = field.value;
    if (!checkEmail) return;
    try {
      setSendCodeLoading(true);
      setPinShow(false);
      await sendEmailCertificationCode(target);
      setPinShow(true);
      setSendCodeLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePinCodeChange = (e: string) => {
    if (e.length === 6) {
      setPinCheckLoading(true);
      ref.current?.focus();
    } else {
      setPinCheckLoading(false);
    }
    setPinCode(e);
  };

  const handleCertifyEmail = async () => {
    const email = field.value;
    try {
      const checkCertificationCode = await checkEmailCertificaitonCode(email, pinCode);
      if (checkCertificationCode) {
        setCertifyEmail(true);
      }
    } catch (error) {
      console.error(error);
    }
    setPinCheckLoading(false);
  };

  useEffect(() => {
    if (!checkEmail) return;
    setCheckEmail(false);
    setPinShow(false);
    setCertifyEmail(false);
  }, [field.value]);

  useEffect(() => {
    if (debouncePinCode.length === 6) {
      handleCertifyEmail();
    }
  }, [debouncePinCode]);

  return (
    <>
      <FormControl isInvalid={!!fieldState.error?.message}>
        <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
          이메일
        </FormLabel>
        <Flex align='center' gap='3'>
          <InputGroup size='md'>
            <Input id={name} placeholder='이메일' type='text' {...field} />
            <InputRightElement>
              {field.value && (
                <MdCancel cursor='pointer' onClick={() => resetField(name)} />
              )}
            </InputRightElement>
          </InputGroup>
          <Button
            size='sm'
            onClick={handleCheckEmail}
            isDisabled={checkEmail}
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
              {fieldState.error?.message}
            </FormErrorMessage>
          </Box>
          <Spacer />
          <Button
            mt='2'
            isLoading={sendCodeLoading}
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
          {!certifyEmail && <Timer certifyEmail={certifyEmail} setPinShow={setPinShow} />}
          <HStack>
            <PinInput onChange={handlePinCodeChange} isDisabled={certifyEmail} size='sm'>
              {[...Array(6)].map((_, i) => (
                <PinInputField key={i} ref={i === 5 ? ref : null} />
              ))}
            </PinInput>
            {pinCheckLoading ? (
              <Spinner
                speed='0.65s'
                emptyColor='gray.200'
                color='primary.red'
                size='sm'
              />
            ) : (
              <Icon color={certifyEmail ? 'green' : 'red'} as={MdCheckCircleOutline} />
            )}
          </HStack>
        </Flex>
      )}
    </>
  );
};

export default EmailInput;
