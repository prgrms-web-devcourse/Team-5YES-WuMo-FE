import { Avatar, AvatarBadge, Center, Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { MdCameraAlt } from 'react-icons/md';

interface ProfileEditPhotoProps {
  onOpen: () => void;
  imageBase64: string | null;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ProfileEditPhoto = ({
  onOpen,
  imageBase64,
  inputRef,
  handleFileChange,
}: ProfileEditPhotoProps) => {
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

export default ProfileEditPhoto;
