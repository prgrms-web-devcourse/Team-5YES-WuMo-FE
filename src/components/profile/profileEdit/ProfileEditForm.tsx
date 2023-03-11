import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Container,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCameraAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { createImage, deleteImage } from '@/api/image';
import { fetchMyProfileInfo, patchMyProfile } from '@/api/user';
import BottomSheet from '@/components/base/BottomSheet';
import ControlledInput from '@/components/base/ControlledInput';
import Loading from '@/components/base/Loading';
import SubmitButton from '@/components/base/SubmitButton';
import { ImageData } from '@/types/place';
import { UserEditProps } from '@/types/user';
import ROUTES from '@/utils/constants/routes';
import { userEditSchema } from '@/utils/schema';

const ProfileEditForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    data: myProfileInfo,
    isLoading,
    isError,
  } = useQuery<UserEditProps>(['myProfileInfo'], () => fetchMyProfileInfo(), {
    onSuccess(data) {
      setOldImage(data.profileImage);
      setValue('nickname', data.nickname);
    },
  });

  const [oldImage, setOldImage] = useState(
    myProfileInfo ? myProfileInfo.profileImage : null
  );
  const [imageValues, setImageValues] = useState<ImageData>({
    imageBase64: oldImage,
    imageFile: null,
  });

  const {
    control,
    setValue,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<UserEditProps>({
    defaultValues: {
      nickname: '',
      profileImage: '',
    },
    mode: 'all',
    resolver: yupResolver(userEditSchema),
  });

  if (isError) return <></>;
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  const onSubmitImageFile = async (image: File | null) => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('image', image);
    const imageUrl = await createImage(formData);
    return imageUrl;
  };

  const onSubmit = async (fields: UserEditProps) => {
    if (oldImage === null && myProfileInfo.profileImage !== null) {
      await deleteImage(myProfileInfo.profileImage);
    }
    if (oldImage !== null) {
      fields.profileImage = myProfileInfo.profileImage;
    } else {
      const imageUrl = await onSubmitImageFile(imageValues.imageFile);
      fields.profileImage = imageUrl;
    }
    fields.id = myProfileInfo.id;
    await patchMyProfile(fields);
    navigate(ROUTES.PROFILE);
  };

  const handleFileChoose = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      encodeFileToBase64(file);
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
        setImageValues({ imageFile: fileBlob, imageBase64: result });
        resolve(Promise);
        onClose();
      };
    });
  };

  const handleDefaultImage = async () => {
    setOldImage(null);
    setImageValues({ imageBase64: null, imageFile: null });
    onClose();
  };

  const handleUserImage = () => {
    if (imageValues.imageBase64) return imageValues.imageBase64;
    if (oldImage) return oldImage;
    return undefined;
  };

  const userImage = handleUserImage();

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
        <Avatar size='2xl' bg='#D9D9D9' src={userImage} cursor='pointer' onClick={onOpen}>
          <AvatarBadge
            bottom='4'
            right='2'
            boxSize='10'
            bg='white'
            border='2px solid #F5F5F5'>
            <MdCameraAlt fontSize='28' color='gray' />
          </AvatarBadge>
        </Avatar>
        <Input
          hidden
          ref={inputRef}
          type='file'
          name='image'
          accept='image/*'
          onChange={handleFileChange}
        />
      </Center>
      <ControlledInput name='nickname' control={control} resetField={resetField} />
      <SubmitButton isSubmitting={isSubmitting} mt='24' width='100%' colorScheme='orange'>
        프로필 수정
      </SubmitButton>
      <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
    </Container>
  );
};

export default ProfileEditForm;
