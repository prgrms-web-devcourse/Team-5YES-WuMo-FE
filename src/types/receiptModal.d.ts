import { ScheduleLocationType, ScheduleType } from './schedule';

export type ReceiptProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  startDate: string;
  endDate: string;
  totalMembers: number;
  stayDurationDate: string;
  scheduleList: ScheduleType;
};

export type ReceiptItemProps = {
  locations: ScheduleLocationType[];
};

export type TriangleProps = {
  y: number;
};
