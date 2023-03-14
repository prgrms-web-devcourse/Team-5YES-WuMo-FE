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

  return (
    <FormControl isInvalid={!!fieldState.error?.message}>
      <FormLabel fontSize='xs' fontWeight='bold' color='gray'>
        {name === 'email' ? '이메일 ' : '비밀번호'}
      </FormLabel>
      <InputGroup size='md'>
        <Input
          id={name}
          placeholder={name === 'email' ? '이메일 ' : '비밀번호'}
          type={name === 'password' ? 'password' : 'text'}
          {...field}
        />
        <InputRightElement>
          {fieldState.isDirty && (
            <MdCancel cursor='pointer' onClick={() => resetField(name)} />
          )}
        </InputRightElement>
      </InputGroup>
      <Box height={7}>
        <FormErrorMessage pl={2} fontSize='sm' color='red' pt={2}>
          {fieldState.error?.message}
        </FormErrorMessage>
      </Box>
    </FormControl>
  );
};

export default ControlledInput;
