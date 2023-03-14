import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Image,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';

import { createImage } from '@/api/image';
import { createPlaceComment, patchPlaceComment } from '@/api/place';
import { fetchMyProfileInfo } from '@/api/user';
import Loading from '@/components/base/Loading';
import Toast from '@/components/base/toast/Toast';
import useImageUpload from '@/hooks/useImageUpload';
import { CommentFormProps } from '@/types/place';
import { PLACE_ERROR_MESSAGES } from '@/utils/constants/messages';

const CommentForm = ({
  type,
  partyId,
  placeId,
  oldContent,
  oldImage,
  commentId,
  setEditHandler,
}: CommentFormProps) => {
  const [content, setContent] = useState(oldContent || '');

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    values: imageValues,
    setValues,
    onFileChange,
    onFileChoose,
    onFileDelete,
  } = useImageUpload(
    {
      imageBase64: oldImage || null,
      imageFile: null,
    },
    inputRef
  );

  const queryClient = useQueryClient();
  const {
    data: writerInfo,
    isLoading,
    isError,
  } = useQuery(['myProfileInfo'], () => fetchMyProfileInfo());
  const { mutateAsync: createImageUrl, reset: imageReset } = useMutation(createImage);
  const { mutateAsync: createComment } = useMutation(createPlaceComment);
  const { mutateAsync: editComment } = useMutation(patchPlaceComment);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmitImageFile = async () => {
    if (!imageValues.imageFile) return null;
    const formData = new FormData();
    formData.append('image', imageValues.imageFile);
    const imageUrl = await createImageUrl(formData);
    return imageUrl;
  };

  const onCreateCommentSubmit = async () => {
    if (!partyId || !placeId) return;
    if (!content && !imageValues.imageFile) {
      Toast.show({
        message: PLACE_ERROR_MESSAGES.COMMENT_REQUIRED,
        type: 'warning',
      });

      return;
    }
    const imageUrl = await onSubmitImageFile();

    const placeCommentBody = {
      content,
      image: imageUrl,
      locationId: placeId,
      partyId,
    };

    await createComment(placeCommentBody, {
      onSuccess: () => {
        setContent('');
        setValues({ imageFile: null, imageBase64: '' });
        return queryClient.invalidateQueries(['placeCommentList']);
      },
    });

    imageReset();
  };

  const onEditCommentSubmit = async () => {
    if (!commentId) return;
    if (!content && !imageValues.imageFile) {
      Toast.show({
        message: PLACE_ERROR_MESSAGES.COMMENT_REQUIRED,
        type: 'warning',
      });
      return;
    }

    const placeCommentBody = {
      id: commentId,
      content,
      image: imageValues.imageBase64 ? await onSubmitImageFile() : oldImage,
    };

    await editComment(placeCommentBody, {
      onSuccess: () => {
        setContent('');
        setValues({ imageFile: null, imageBase64: '' });
        setEditHandler?.();
        return queryClient.invalidateQueries(['placeCommentList']);
      },
    });

    imageReset();
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <></>;

  return (
    <FormControl
      onSubmit={() => {
        type === 'create' ? onCreateCommentSubmit() : onEditCommentSubmit();
      }}
      pt='4'
      pb='4'>
      <Flex direction='column'>
        {type === 'create' && (
          <Flex align='center' gap='2' ml='1'>
            <Avatar size='sm' src={writerInfo.profileImage} />
            <Text>{writerInfo.nickname}</Text>
          </Flex>
        )}
        <Textarea
          size='md'
          variant='outline'
          value={content}
          onChange={onChange}
          placeholder={PLACE_ERROR_MESSAGES.COMMENT_REQUIRED}
          resize='none'
          mt='3'
          mb='3'
          borderRadius='lg'
          borderColor='gray.200'
          focusBorderColor='primary.red'>
          <Icon as={MdAddPhotoAlternate} boxSize={8} />
        </Textarea>
        <Flex justify='space-between'>
          {imageValues.imageBase64 ? (
            <Box mt='3.125rem'>
              <Flex pos='relative' mt='-2.4375rem' justify='center'>
                <Button
                  onClick={onFileDelete}
                  size='sm'
                  colorScheme='blackAlpha'
                  pos='absolute'
                  borderRadius='50%'
                  top='-4'
                  right='-4'>
                  x
                </Button>
                <Image
                  w='7.5rem'
                  h='7.5rem'
                  objectFit='cover'
                  src={imageValues.imageBase64}
                />
              </Flex>
            </Box>
          ) : (
            <>
              <IconButton
                variant='outline'
                aria-label='이미지 추가'
                icon={<MdAddPhotoAlternate />}
                onClick={onFileChoose}
              />
              <input
                hidden
                ref={inputRef}
                type='file'
                name='image'
                accept='image/jpg, image/jpeg, image/png'
                onChange={onFileChange}
              />
            </>
          )}
          <Button
            type='submit'
            w='6rem'
            onClick={() => {
              type === 'create' ? onCreateCommentSubmit() : onEditCommentSubmit();
            }}
            isDisabled={!content && !imageValues.imageFile}>
            등록
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default CommentForm;
