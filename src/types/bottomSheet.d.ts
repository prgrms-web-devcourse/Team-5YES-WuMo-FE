export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  modal: {
    title: string;
    content: JSX.Element;
    onClick: () => void;
    buttonText: string;
  };
};
