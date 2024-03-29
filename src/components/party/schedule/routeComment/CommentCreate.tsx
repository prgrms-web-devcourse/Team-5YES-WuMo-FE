import { Box, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';

import { createImage } from '@/api/image';
import { createRouteComment } from '@/api/schedules';
import BottomSheet from '@/components/base/BottomSheet';
import BottomSheetButton from '@/components/base/BottomSheetButton';
import CustomTextarea from '@/components/base/CustomTextarea';
import FloatingButton from '@/components/base/FloatingButton';
import { ModalType } from '@/types/bottomSheet';
import { CommentCreateType, CreateCommentBody } from '@/types/schedule';
import { compressImage } from '@/utils/imageCompressor';

import CommentImageInput from './CommentImageInput';

const CommentCreate = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { partyId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isSubmitting, isDirty },
  } = useForm<CommentCreateType>({
    defaultValues: {
      content: '',
      image: null,
    },
  });
  const [isImageUploading, setIsImageUploading] = useState(false);

  const { mutateAsync: createImageUrl, reset: imageReset } = useMutation(createImage);
  const { mutateAsync: createComment } = useMutation(createRouteComment);

  const onSubmitImageFile = async (image: File | null) => {
    if (!image) return null;

    setIsImageUploading(true);
    const compressedImageFile = await compressImage(image);
    setIsImageUploading(false);

    const formData = new FormData();
    formData.append('image', compressedImageFile);
    const imageUrl = await createImageUrl(formData);
    return imageUrl;
  };

  const onSubmitNewComment = async ({ content, image }: CommentCreateType) => {
    const imageUrl = await onSubmitImageFile(image);

    const commentBody: CreateCommentBody = {
      content,
      image: imageUrl,
      partyId: Number(partyId),
      locationId: state.locationId,
    };

    await createComment(commentBody, {
      onSuccess: () => {
        onClose();
        return queryClient.invalidateQueries(['commentList']);
      },
    });

    imageReset();
    resetField('content');
    resetField('image');
  };

  const modalContent: ModalType = {
    title: '새 피드 작성',
    content: (
      <Box as='form' mb='4' w='100%' onSubmit={handleSubmit(onSubmitNewComment)}>
        <CustomTextarea name='content' control={control} />
        <CommentImageInput name='image' control={control} />
        <BottomSheetButton
          isSubmitting={isSubmitting || isImageUploading}
          isDisabled={!isDirty}
          buttonText='Submit'
        />
      </Box>
    ),
  };

  return (
    <div>
      <FloatingButton icon={<AiOutlinePlus />} onClick={onOpen} />
      <BottomSheet isOpen={isOpen} onClose={onClose} modal={modalContent} />
    </div>
  );
};

export default CommentCreate;
