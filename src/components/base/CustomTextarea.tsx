import { Textarea } from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface UserInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
}

const CustomTextarea = <T extends FieldValues>({ name, control }: UserInputProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Textarea
      id={name}
      resize='none'
      w='99%'
      border='1px solid lightgray'
      p='0.625rem'
      rows={10}
      borderRadius='0.625rem'
      {...field}
    />
  );
};

export default CustomTextarea;
