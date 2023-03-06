import { MdCalendarToday, MdCreditCard, MdImage, MdOutlineComment } from 'react-icons/md';

import PartyNameModal from '@/components/party/create/PartyNameModal';
import PartyOwnRoleModal from '@/components/party/create/PartyOwnRoleModal';
import PartyPeriodModal from '@/components/party/create/PartyPeriodModal';
import PlaceCategoryModal from '@/components/place/create/category/PlaceCategoryModal';
import DateTimeInput from '@/components/place/create/information/DateTimeInput';
import DescriptionInput from '@/components/place/create/information/Descriptionnput';
import ImageInput from '@/components/place/create/information/ImageInput';
import PlaceInformationModal from '@/components/place/create/information/PlaceInformationModal';
import PriceInput from '@/components/place/create/information/PriceInput';
import PlaceSearchModal from '@/components/place/create/search/PlaceSearchModal';
import { PartyCreateStepItem } from '@/types/party';
import { PlaceCreateStepItem, PlaceInformationStepItem } from '@/types/place';

export const partyCreateStepItems: PartyCreateStepItem[] = [
  {
    title: '무슨 모임을 만들까요?',
    component: <PartyNameModal />,
  },
  {
    title: '모임 일정을 설정해주세요.',
    component: <PartyPeriodModal />,
  },
  {
    title: '모임에서 본인 역할은?',
    component: <PartyOwnRoleModal />,
  },
];

export const placeCreateStepItems: PlaceCreateStepItem[] = [
  {
    title: '후보지의 장소를 선택해 주세요.',
    component: <PlaceSearchModal />,
  },
  {
    title: '여기서 무엇을 하나요?',
    component: <PlaceCategoryModal />,
  },
  {
    title: '부가 정보를 입력해 주세요.',
    component: <PlaceInformationModal />,
  },
];

export const PlaceInformationStepItems: PlaceInformationStepItem[] = [
  {
    type: 'visitDate',
    icon: <MdCalendarToday />,
    text: '방문 예정일',
    content: <DateTimeInput />,
  },
  {
    type: 'expectedCost',
    icon: <MdCreditCard />,
    text: '예상 비용',
    content: <PriceInput />,
  },
  {
    type: 'image',
    icon: <MdImage />,
    text: '대표 사진',
    content: <ImageInput />,
  },
  {
    type: 'description',
    icon: <MdOutlineComment />,
    text: '메모',
    content: <DescriptionInput />,
  },
];

export const processStep = {
  process: 33.3,
  min: 1,
  partyCreateMax: partyCreateStepItems.length,
  placeCreateMax: placeCreateStepItems.length,
} as const;
