export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  modal: ModalType;
};

export type ModalType = {
  title?: string;
  content: JSX.Element;
};
