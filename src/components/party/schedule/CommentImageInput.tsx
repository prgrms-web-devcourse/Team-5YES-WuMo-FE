import { Button, Flex, Img, Input } from '@chakra-ui/react';
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ImageProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  setCurrentImageUrl?: Dispatch<SetStateAction<string | undefined>>;
  imageURL?: string;
}

const CommentImageInput = <T extends FieldValues>({
  name,
  control,
  imageURL,
  setCurrentImageUrl,
}: ImageProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');
  const [imageBase64, setImageBase64] = useState<string>(imageURL || '');
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
      encodeFileToBase64(file);
    }
    e.target.value = '';
  };

  const onFileDelete = () => {
    setImageBase64('');
    setCurrentImageUrl && setCurrentImageUrl('');
    field.onChange(null);
  };

  return (
    <Flex flexDirection='column' align='center'>
      <Flex
        w='100%'
        align='center'
        justify='space-between'
        pt='18px'
        onClick={() => inputRef.current?.click()}>
        <Button size='md' mr='auto'>
          {!imageBase64 ? `사진 추가+` : `사진 수정`}
        </Button>
      </Flex>
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
      {imageBase64 && (
        <>
          <Flex pos='relative' mt='-39px' justify='center'>
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
        </>
      )}
    </Flex>
  );
};

export default CommentImageInput;
