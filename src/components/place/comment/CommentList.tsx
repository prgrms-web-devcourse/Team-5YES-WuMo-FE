import {
  Avatar,
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { deletePlaceComment, fetchPlaceComment } from '@/api/place';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import MoreMenu from '@/components/base/MoreMenu';
import { CommentListProps, PlaceCommentType } from '@/types/place';
import { formatCreatedDateTime } from '@/utils/formatter';

import CommentForm from './CommentForm';

const CommentList = ({ placeId }: CommentListProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<PlaceCommentType>(
    ['placeCommentList', placeId],
    () => fetchPlaceComment(10000, placeId)
  );
  const { mutateAsync: removePlaceComment } = useMutation(deletePlaceComment);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentId, setCommentId] = useState<number>();
  const [editing, setEditing] = useState({ isEditing: false, commentId: -1 });

  const onCommentDelete = async () => {
    if (!commentId) return;
    await removePlaceComment(commentId, {
      onSuccess: () => {
        onClose();
        return queryClient.invalidateQueries(['placeCommentList']);
      },
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError || data.lastId === -1) return <></>;

  return (
    <>
      <TableContainer>
        <Table variant='simple' size='lg'>
          <Tbody>
            {data?.locationComments.map(
              ({
                id,
                profileImage,
                nickName,
                memberRole,
                content,
                image,
                createdAt,
                updatedAt,
                isEditable,
              }) => (
                <Tr key={id}>
                  <Td display='flex' flexDirection='column' pl='0' pr='0'>
                    <Flex justify='space-between'>
                      <Flex align='center' gap='2' ml='1'>
                        <Avatar size='md' src={profileImage ? profileImage : undefined} />
                        <Box>
                          <Text pl='0.5' pb='0.5'>
                            {nickName}
                          </Text>
                          {memberRole && <Tag size='sm'>{memberRole}</Tag>}
                        </Box>
                      </Flex>
                      {isEditable && (
                        <MoreMenu
                          onEditEvent={() =>
                            setEditing({ isEditing: true, commentId: id })
                          }
                          onRemoveEvent={() => {
                            setCommentId(id);
                            onOpen();
                          }}
                        />
                      )}
                    </Flex>
                    {editing.isEditing && editing.commentId === id ? (
                      <CommentForm
                        type='edit'
                        commentId={id}
                        oldContent={content}
                        oldImage={image}
                        setEditHandler={() =>
                          setEditing({ isEditing: false, commentId: -1 })
                        }
                      />
                    ) : (
                      <>
                        <Box
                          p='4'
                          pl='1'
                          lineHeight='1.5rem'
                          wordBreak='keep-all'
                          whiteSpace='pre-wrap'>
                          {content}
                        </Box>
                        {image && <Image alt='댓글 이미지' src={image} />}
                      </>
                    )}
                    <Text color='grey' pt='2' fontSize='sm' letterSpacing='tight'>
                      {formatCreatedDateTime(createdAt)}
                      {createdAt !== updatedAt && ' (수정됨)'}
                    </Text>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmModal
        hasCloseButton
        isOpen={isOpen}
        body={
          <Box textAlign='center'>
            <Text>댓글을 삭제할까요?</Text>
          </Box>
        }
        closeModalHandler={onClose}
        buttonText={{ secondary: '취소', primary: '삭제' }}
        clickButtonHandler={{
          secondary: () => onClose(),
          primary: () => onCommentDelete(),
        }}
      />
    </>
  );
};

export default CommentList;
