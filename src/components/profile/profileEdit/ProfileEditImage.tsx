import { Avatar, AvatarBadge, Center, Input } from '@chakra-ui/react';
import { MdCameraAlt } from 'react-icons/md';

import { ProfileEditImageProps } from '@/types/user';

const ProfileEditImage = ({
  onOpen,
  imageBase64,
  inputRef,
  handleFileChange,
}: ProfileEditImageProps) => {
  return (
    <Center mb='12'>
      <Avatar
        size='2xl'
        bg='#D9D9D9'
        src={imageBase64 ? imageBase64 : undefined}
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
      <Input
        hidden
        ref={inputRef}
        type='file'
        name='image'
        accept='image/jpg, image/jpeg, image/png'
        onChange={handleFileChange}
      />
    </Center>
  );
};

export default ProfileEditImage;
