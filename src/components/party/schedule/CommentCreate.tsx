import { Box, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';

import { createImage } from '@/api/image';
import { createLocationComment } from '@/api/schedules';
import BottomSheet from '@/components/base/BottomSheet';
import BottomSheetButton from '@/components/base/BottomSheetButton';
import CustomTextarea from '@/components/base/CustomTextarea';
import FloatingButton from '@/components/base/FloatingButton';
import { ModalType } from '@/types/bottomSheet';
import { CommentCreateType, CreateCommentBody } from '@/types/schedule';

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

  const { mutateAsync: createImageUrl, reset: imageReset } = useMutation(createImage);
  const { mutateAsync: createComment } = useMutation(createLocationComment);

  const onSubmitImageFile = async (image: File | null) => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('image', image);
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
  };

  const modalContent: ModalType = {
    title: '새 피드 작성',
    content: (
      <Box as='form' mb='4' w='100%' onSubmit={handleSubmit(onSubmitNewComment)}>
        <CustomTextarea name='content' control={control} />
        <CommentImageInput name='image' control={control} />
        <BottomSheetButton
          isSubmitting={isSubmitting}
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
