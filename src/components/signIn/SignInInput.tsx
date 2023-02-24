import {
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

interface UserInputPrpos<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  resetField: UseFormResetField<T>;
}

const SignInInput = <T extends FieldValues>({
  name,
  control,
  resetField,
}: UserInputPrpos<T>) => {
  const { field, fieldState } = useController({ name, control });
  const upperName = name.replace(/^[a-z]/, (char: string) => char.toUpperCase());

  return (
    <FormControl isInvalid={!!fieldState.error?.message}>
      <FormLabel>{upperName}</FormLabel>
      <InputGroup size='md'>
        <Input
          id={name}
          placeholder={upperName}
          type={name === 'password' ? 'password' : 'text'}
          {...field}
        />
        <InputRightElement>
          {fieldState.isDirty && (
            <MdCancel cursor='pointer' onClick={() => resetField(name)} />
          )}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SignInInput;
