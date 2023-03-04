import { LocationsTypes } from './party';

export type ReceiptProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  startDate: string;
  endDate: string;
  stayDurationDate: string;
};

export type ReceiptItemProps = {
  locations: LocationsTypes[];
};

export type TriangleProps = {
  y: number;
};
