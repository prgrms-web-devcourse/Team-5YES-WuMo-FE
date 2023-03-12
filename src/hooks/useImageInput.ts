import { ChangeEvent, RefObject, useState } from 'react';

import { ImageData } from '@/types/place';

type useImageInputProps = {
  initialValues: ImageData;
  inputRef: RefObject<HTMLInputElement>;
};

const useImageInput = ({ initialValues, inputRef }: useImageInputProps) => {
  const [values, setValues] = useState<ImageData>(initialValues);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValues({ ...values, imageFile: file });
      encodeFileToBase64(file);
      e.target.value = '';
    }
  };

  const onFileDelete = () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      setValues({ ...values, imageBase64: '', imageFile: null });
    }
  };

  const onFileChoose = () => {
    inputRef.current?.click();
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        const result = reader.result;
        if (!result || typeof result !== 'string') return;
        setValues({ ...values, imageBase64: result });
        resolve(Promise);
      };
    });
  };

  return { values, onFileChange, onFileChoose, onFileDelete };
};

export default useImageInput;
