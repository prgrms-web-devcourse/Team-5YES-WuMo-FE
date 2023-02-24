export type SignProps = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

export type SignInProps = Pick<SignProps, 'email' | 'password'>;
