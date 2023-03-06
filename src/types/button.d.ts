export type FloatingButtonProps = {
  icon: JSX.Element;
  onClick: () => void;
};

export type CreateModalButtonProps = {
  text: string;
  isDisabled?: boolean;
  clickButtonHandler: () => void;
};
