import { Button, Flex, Img, Input } from '@chakra-ui/react';
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ImageProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
}

const CommentImageInput = <T extends FieldValues>({ name, control }: ImageProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [value, setValue] = useState('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const { field } = useController({
    name,
    control,
  });

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        const result = reader.result;
        if (!result || typeof result !== 'string') return;
        setImageBase64(result);
        resolve(Promise);
      };
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      encodeFileToBase64(file);
    }
    e.target.value = '';
  };

  const onFileDelete = () => {
    setImageBase64('');
    setFileName('');
    field.onChange(null);
  };

  return (
    <Flex flexDirection='column' align='center'>
      <Flex
        w='100%'
        align='center'
        justify='space-between'
        p='10px'
        onClick={() => inputRef.current?.click()}>
        <Input
          placeholder='사진을 추가하세요'
          defaultValue={fileName}
          flex='1'
          mr='1.25rem'
          border='none'
          borderBottom='1px solid gray'
          borderRadius='none'
        />
        <Button size='sm'>사진 추가+</Button>
        <Input
          type='file'
          hidden
          {...field}
          value={value}
          ref={inputRef}
          onChange={(e) => {
            field.onChange(e.target.files?.[0]);
            onFileChange(e);
            setValue(e.target.value);
          }}
        />
      </Flex>
      {imageBase64 && (
        <Flex pos='relative' mt='0.625rem' justify='center'>
          <Button
            onClick={onFileDelete}
            size='sm'
            colorScheme='blackAlpha'
            pos='absolute'
            borderRadius='50%'
            top='-4'
            right='-4'>
            x
          </Button>
          <Img w='7.5rem' h='7.5rem' src={imageBase64} />
        </Flex>
      )}
    </Flex>
  );
};

export default CommentImageInput;
