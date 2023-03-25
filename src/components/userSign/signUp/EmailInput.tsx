import {
  Box,
  Button,
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
  Text,
} from '@chakra-ui/react';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseFormResetField,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

import {
  checkEmailCertificaitonCode,
  fetchCheckEmail,
  sendEmailCertificationCode,
} from '@/api/user';
import { SignProps } from '@/types/userSign';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';

import Timer from './Timer';

interface UserInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  resetField: UseFormResetField<T>;
  trigger: UseFormTrigger<SignProps>;
  setError: UseFormSetError<SignProps>;
  checkEmail: boolean;
  setCheckEmail: React.Dispatch<React.SetStateAction<boolean>>;
  certifyEmail: boolean;
  setCertifyEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailInput = <T extends FieldValues>({
  name,
  control,
  resetField,
  trigger,
  setError,
  checkEmail,
  setCheckEmail,
  certifyEmail,
  setCertifyEmail,
}: UserInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });
  const [pinShow, setPinShow] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = async () => {
    console.log('loaded');
    const checkBefore = await trigger('email');
    const target = field.value;
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

  const handleSendCertificationCode = async () => {
    const target = field.value;
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
    const email = field.value;
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
  }, [field.value]);

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
          {!certifyEmail && <Timer certifyEmail={certifyEmail} setPinShow={setPinShow} />}
          <HStack>
            <PinInput onChange={handlePinCodeChange} isDisabled={certifyEmail} size='sm'>
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
    </>
  );
};

export default EmailInput;
