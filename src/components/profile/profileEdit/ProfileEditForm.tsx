import { Button, Container, Stack, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createImage, deleteImage } from '@/api/image';
import { fetchMyProfileInfo, patchMyProfile } from '@/api/user';
import BottomSheet from '@/components/base/BottomSheet';
import NicknameInput from '@/components/base/input/NicknameInput';
import Loading from '@/components/base/Loading';
import SubmitButton from '@/components/base/SubmitButton';
import { ImageData } from '@/types/place';
import { UserEditProps } from '@/types/user';
import { FORM_ERROR_MESSAGES } from '@/utils/constants/messages';
import ROUTES from '@/utils/constants/routes';
import { compressImage } from '@/utils/imageCompressor';
import { userEditSchema } from '@/utils/schema';

import ProfileEditPhoto from './ProfileEditPhoto';

const ProfileEditForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    trigger,
    getValues,
    setError,
    watch,
    formState: { isSubmitting },
  } = useForm<UserEditProps>({
    defaultValues: {
      nickname: '',
      profileImage: '',
    },
    mode: 'all',
    resolver: yupResolver(userEditSchema),
  });

  const {
    data: myProfileInfo,
    isLoading,
    isError,
  } = useQuery<UserEditProps>(['myProfileInfo'], () => fetchMyProfileInfo());

  const [imageValues, setImageValues] = useState<ImageData>({
    imageBase64: null,
    imageFile: null,
  });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const watchNickname = watch('nickname');

  useEffect(() => {
    if (!checkNickname) return;
    setCheckNickname(false);
  }, [watchNickname]);

  useEffect(() => {
    if (!myProfileInfo) return;
    setImageValues({ ...imageValues, imageBase64: myProfileInfo.profileImage });
    setValue('nickname', myProfileInfo.nickname);
  }, [myProfileInfo]);

  if (isError) return <></>;
  if (isLoading || isImageUploading)
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

  const getImage = async () => {
    if (myProfileInfo.profileImage === imageValues.imageBase64)
      return myProfileInfo.profileImage;

    if (myProfileInfo.profileImage === null && imageValues.imageBase64 !== null) {
      const imageUrl = await onSubmitImageFile(imageValues.imageFile);
      return imageUrl;
    }

    if (myProfileInfo.profileImage !== null && imageValues.imageBase64 === null) {
      await deleteImage(myProfileInfo.profileImage);
      return null;
    }

    if (myProfileInfo.profileImage !== null && imageValues.imageBase64 !== null) {
      await deleteImage(myProfileInfo.profileImage);
      const imageUrl = await onSubmitImageFile(imageValues.imageFile);
      return imageUrl;
    }

    return myProfileInfo.profileImage;
  };

  const onSubmit = async (fields: UserEditProps) => {
    if (myProfileInfo.nickname !== getValues('nickname') && !checkNickname)
      return setError('nickname', { message: FORM_ERROR_MESSAGES.DUPLICATE });
    const image = await getImage();
    fields.profileImage = image;
    fields.id = myProfileInfo.id;
    await patchMyProfile(fields);
    navigate(ROUTES.PROFILE, { replace: true });
  };

  const handleFileChoose = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
        setImageValues({ imageFile: fileBlob, imageBase64: result });
        setValue('profileImage', result);
        resolve(Promise);
        onClose();
      };
    });
  };

  const handleDefaultImage = async () => {
    setImageValues({ imageBase64: null, imageFile: null });
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
      <ProfileEditPhoto
        onOpen={onOpen}
        imageBase64={imageValues.imageBase64}
        inputRef={inputRef}
        handleFileChange={handleFileChange}
      />
      <NicknameInput
        name='nickname'
        control={control}
        resetField={resetField}
        trigger={trigger}
        setError={setError}
        checkNicknameState={[checkNickname, setCheckNickname]}
        forEdit={myProfileInfo.nickname}
      />
      <SubmitButton isSubmitting={isSubmitting} mt='24' width='100%' colorScheme='orange'>
        프로필 수정
      </SubmitButton>
      <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
    </Container>
  );
};

export default ProfileEditForm;
