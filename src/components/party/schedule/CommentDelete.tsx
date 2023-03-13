import { Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteImage } from '@/api/image';
import { deleteRouteComment } from '@/api/schedules';
import ConfirmModal from '@/components/base/ConfirmModal';
import { CommentDeleteType } from '@/types/schedule';

const CommentDelete = ({ isOpen, onClose, id, image }: CommentDeleteType) => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation(deleteRouteComment, {
    onSuccess: () => {
      onClose();
      return queryClient.invalidateQueries(['commentList']);
    },
  });

  const { mutate: deleteCommentImage } = useMutation(deleteImage);
  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={
          <Text fontSize='xl' textAlign='center'>
            댓글을 삭제하시겠습니까?
          </Text>
        }
        clickButtonHandler={{
          primary: () => {
            image && deleteCommentImage(image);
            deleteComment(id);
          },
          secondary: () => onClose(),
        }}
        buttonText={{
          primary: '삭제',
          secondary: '취소',
        }}
      />
    </>
  );
};

export default CommentDelete;
