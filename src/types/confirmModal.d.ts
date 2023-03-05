export type ConfirmModalProps = {
  isOpen: boolean;
  hasCloseButton?: boolean;
  closeModalHandler: () => void;
  body: JSX.Element;
  buttonText: {
    secondary?: string;
    primary?: string;
  };
  clickButtonHandler: {
    secondary?: () => void;
    primary?: () => void;
  };
};
