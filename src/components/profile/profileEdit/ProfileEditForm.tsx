import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Container,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCameraAlt } from 'react-icons/md';

import axiosInstance from '@/api/api';
import BottomSheet from '@/components/base/BottomSheet';
import ControlledInput from '@/components/base/ControlledInput';
import SubmitButton from '@/components/base/SubmitButton';
import { ImageData } from '@/types/place';
import { UserEditProps } from '@/types/user';
import { userEditSchema } from '@/utils/schema';

const member_dummy_data = {
  id: 1,
  email: '5yes@gmail.com',
  nickname: '오예스',
  profileImage: null,
};

const ProfileEditForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState<ImageData>({
    imageBase64: member_dummy_data.profileImage,
    imageFile: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<UserEditProps>({
    defaultValues: {
      id: member_dummy_data.id,
      nickname: member_dummy_data.nickname,
      password: '',
      profileImage: member_dummy_data.profileImage,
    },
    mode: 'all',
    resolver: yupResolver(userEditSchema),
  });

  const onSubmit = (fields: UserEditProps) => {
    fields.id = member_dummy_data.id;
    // 이미지 등록 후 url만 저장하여 전송
    console.log(fields);
    const response = axiosInstance.patch('/api/v1/members', values);
    console.log(response);
  };

  const handleFileChoose = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValues({ ...values, imageFile: file });
      encodeFileToBase64(file);
    }
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
        onClose();
      };
    });
  };

  const handleDefaultImage = () => {
    setValues({ imageBase64: '', imageFile: null });
    onClose();
  };

  const modalContent = {
    content: (
      <Stack w='100%' spacing='4' mb='20'>
        <Button onClick={handleFileChoose}>이미지 가져오기</Button>
        <Button onClick={handleDefaultImage}>기본이미지로 변경</Button>
      </Stack>
    ),
  };

  return (
    <Container p='7rem 2rem' as='form' onSubmit={handleSubmit(onSubmit)}>
      <Center mb='12'>
        <Avatar
          size='2xl'
          bg='#D9D9D9'
          src={values.imageBase64 === null ? undefined : values.imageBase64}
          cursor='pointer'
          onClick={onOpen}>
          <AvatarBadge
            bottom='4'
            right='2'
            boxSize='10'
            bg='white'
            border='2px solid #F5F5F5'>
            <MdCameraAlt fontSize='28' color='gray' />
          </AvatarBadge>
        </Avatar>
        <input
          hidden
          ref={inputRef}
          type='file'
          name='image'
          accept='image/*'
          onChange={handleFileChange}
        />
      </Center>
      <ControlledInput name='nickname' control={control} resetField={resetField} />
      <ControlledInput name='password' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='24' width='100%' colorScheme='orange'>
        프로필 수정
      </SubmitButton>
      <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
    </Container>
  );
};

export default ProfileEditForm;
