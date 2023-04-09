export type UserProps = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
};

export type UserEditProps = Pick<UserProps, 'id' | 'nickname' | 'profileImage'>;

export type ProfileEditImageProps = {
  onOpen: () => void;
  imageBase64: string | null;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};
