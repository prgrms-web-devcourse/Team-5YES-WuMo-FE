import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { InputHTMLAttributes, useEffect } from 'react';
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

import { fetchCheckNickname } from '@/api/user';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';

interface UserInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  resetField: UseFormResetField<T>;
  trigger: UseFormTrigger<T>;
  setError: UseFormSetError<T>;
  checkNicknameState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  prevNickname?: string;
}

const NicknameInput = <T extends FieldValues>({
  name,
  control,
  resetField,
  trigger,
  setError,
  checkNicknameState,
  prevNickname,
}: UserInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });
  const [checkNickname, setCheckNickname] = checkNicknameState;

  const handleCheckNickname = async () => {
    const checkBefore = await trigger(name);
    const target = field.value;
    if (!checkBefore) return;
    if (target === prevNickname) return setCheckNickname(true);

    try {
      await fetchCheckNickname(target);
      setCheckNickname(true);
    } catch (error) {
      setCheckNickname(false);
      setError(name, { message: FORM_ERROR_MESSAGES.NICKNAME_DUPLICATED });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!checkNickname) return;
    setCheckNickname(false);
  }, [field.value]);

  return (
    <FormControl isInvalid={!!fieldState.error?.message}>
      <FormLabel mt='-3' fontSize='xs' fontWeight='bold' color='gray'>
        닉네임
      </FormLabel>
      <Flex align='center' gap='3'>
        <InputGroup size='md'>
          <Input id={name} placeholder='닉네임' type='text' {...field} />
          <InputRightElement>
            {field.value && (
              <MdCancel cursor='pointer' onClick={() => resetField(name)} />
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
          {fieldState.error?.message}
        </FormErrorMessage>
      </Box>
    </FormControl>
  );
};

export default NicknameInput;
