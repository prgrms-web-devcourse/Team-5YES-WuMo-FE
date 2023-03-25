import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseFormResetField,
} from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

interface UserInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  resetField: UseFormResetField<T>;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  resetField,
}: UserInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });
  const toKorean = () => {
    if (name === 'email') return '이메일';
    if (name === 'password') return '비밀번호';
    if (name === 'passwordConfirm') return '비밀번호 확인';
  };
  const nameKorean = toKorean();

  return (
    <FormControl w='100%' isInvalid={!!fieldState.error?.message}>
      <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
        {nameKorean}
      </FormLabel>
      <InputGroup size='md'>
        <Input
          id={name}
          placeholder={nameKorean}
          type={name.startsWith('password') ? 'password' : 'text'}
          {...field}
        />
        <InputRightElement>
          {field.value && <MdCancel cursor='pointer' onClick={() => resetField(name)} />}
        </InputRightElement>
      </InputGroup>
      <Box height={5}>
        <FormErrorMessage pl={2} fontSize='sm' color='red' pt={2}>
          {fieldState.error?.message}
        </FormErrorMessage>
      </Box>
    </FormControl>
  );
};

export default ControlledInput;
