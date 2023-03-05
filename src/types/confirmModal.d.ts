export type ConfirmModalProps = {
  isOpen: boolean;
  hasCloseButton?: boolean;
  closeModalHandler: () => void;
  body: JSX.Element;
  buttonText: {
    left?: string;
    right?: string;
  };
  clickButtonHandler: {
    left?: () => void;
    right?: () => void;
  };
};
