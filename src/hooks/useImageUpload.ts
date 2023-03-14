import { ChangeEvent, RefObject, useState } from 'react';

import { ImageData } from '@/types/place';
import { compressImage } from '@/utils/imageCompressor';

const useImageUpload = (
  initialValues: ImageData,
  inputRef: RefObject<HTMLInputElement>
) => {
  const [values, setValues] = useState<ImageData>(initialValues);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onFileChoose = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      const compressedImageFile = await compressImage(file);
      encodeFileToBase64(compressedImageFile);
      setIsImageUploading(false);
    }
    e.target.value = '';
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        const result = reader.result;
        if (!result || typeof result !== 'string') return;
        setValues({ ...values, imageBase64: result, imageFile: fileBlob });
        resolve(Promise);
      };
    });
  };

  const onFileDelete = () => {
    if (confirm('사진을 삭제하시겠습니까?')) {
      setValues({ ...values, imageBase64: '', imageFile: null });
    }
  };

  return {
    values,
    setValues,
    isImageUploading,
    onFileChange,
    onFileChoose,
    onFileDelete,
  };
};

export default useImageUpload;
