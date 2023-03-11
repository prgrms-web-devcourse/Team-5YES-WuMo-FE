export type UserProps = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
};

export type UserEditProps = Pick<UserProps, 'id' | 'nickname' | 'profileImage'>;
