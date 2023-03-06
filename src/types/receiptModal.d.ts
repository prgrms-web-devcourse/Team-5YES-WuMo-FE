import { LocationsType } from './party';

export type ReceiptProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  startDate: string;
  endDate: string;
  stayDurationDate: string;
};

export type ReceiptItemProps = {
  locations: LocationsType[];
};

export type TriangleProps = {
  y: number;
};
