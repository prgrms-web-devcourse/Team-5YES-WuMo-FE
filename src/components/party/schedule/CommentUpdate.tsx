import { Box } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createImage, deleteImage } from '@/api/image';
import { patchRouteComment } from '@/api/schedules';
import BottomSheet from '@/components/base/BottomSheet';
import BottomSheetButton from '@/components/base/BottomSheetButton';
import CustomTextarea from '@/components/base/CustomTextarea';
import { CommentCreateType, UpdateCommentType } from '@/types/schedule';

import CommentImageInput from './CommentImageInput';

type CommentUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  content: string;
  image?: string;
};

const CommentUpdate = ({
  isOpen,
  onClose,
  id,
  content,
  image,
}: CommentUpdateModalProps) => {
  const queryClient = useQueryClient();
  const [currentImageUrl, setCurrentImageUrl] = useState(image);
  const [previousImage, setPreviousImage] = useState(image);
  const {
    control,
    resetField,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      content: '',
      image: null,
    },
  });
  const watchContent = watch('content');
  const watchImage = watch('image');

  const { mutateAsync: deleteImageUrl } = useMutation(deleteImage);
  const { mutateAsync: createImageUrl, reset: imageReset } = useMutation(createImage);
  const { mutateAsync: updateComment } = useMutation(patchRouteComment, {
    onSuccess: () => {
      onClose();
      return queryClient.invalidateQueries(['commentList']);
    },
  });

  const onSubmitImageFile = async (image: File | null) => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('image', image);
    const imageUrl = await createImageUrl(formData);
    setCurrentImageUrl(imageUrl);
    return imageUrl;
  };

  useEffect(() => {
    reset({
      content: content,
    });
  }, [content]);

  const onDeleteImage = (imageUrl: string) => {
    const nothingImageFile = previousImage && !currentImageUrl;
    const changeImageFile = previousImage && imageUrl && previousImage !== imageUrl;

    if (nothingImageFile || changeImageFile) {
      deleteImageUrl(previousImage);
    }
  };

  const onChangeComment = async ({ content, image }: CommentCreateType) => {
    const imageUrl = await onSubmitImageFile(image);
    onDeleteImage(imageUrl);

    const updateCommentBody: UpdateCommentType = {
      id: id,
      content,
      image: imageUrl || currentImageUrl,
    };

    await updateComment(updateCommentBody);
    setPreviousImage(imageUrl);
    imageReset();
    resetField('content');
  };

  const modalContent = {
    title: '피드 수정',
    content: (
      <Box as='form' mb='4' w='100%' onSubmit={handleSubmit(onChangeComment)}>
        <CustomTextarea name='content' control={control} />
        <CommentImageInput
          name='image'
          control={control}
          imageURL={currentImageUrl}
          setCurrentImageUrl={setCurrentImageUrl}
        />
        <BottomSheetButton
          isSubmitting={isSubmitting}
          isDisabled={!watchContent && !watchImage && !currentImageUrl}
          buttonText='Submit'
        />
      </Box>
    ),
  };
  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetField('content');
          resetField('image');
        }}
        modal={modalContent}
      />
    </>
  );
};

export default CommentUpdate;
