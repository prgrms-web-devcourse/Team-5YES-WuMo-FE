export type UserProps = {
  email: string;
  nickname: string;
  password: string;
  refresh_token: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type UserEditProps = Pick<UserProps, 'nickname' | 'password'> & {
  id: number;
  profileImage: string | null;
};
