import PartyNameModal from '@/components/party/create/PartyNameModal';
import PartyOwnRoleModal from '@/components/party/create/PartyOwnRoleModal';
import PartyPeriodModal from '@/components/party/create/PartyPeriodModal';
import PlaceCategoryStep from '@/components/party/place/create/category/PlaceCategoryStep';
import PlaceInfoStep from '@/components/party/place/create/info/PlaceInfoStep';
import PlaceSearchStep from '@/components/party/place/create/search/PlaceSearchStep';
import { PartyCreateStepItem } from '@/types/party';
import { PlaceCreateStepItem } from '@/types/place';

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
    component: <PlaceSearchStep />,
  },
  {
    title: '여기서 무엇을 하나요?',
    component: <PlaceCategoryStep />,
  },
  {
    title: '부가 정보를 입력해 주세요.',
    component: <PlaceInfoStep />,
  },
];

export const processStep = {
  process: 33.3,
  min: 1,
  partyCreateMax: partyCreateStepItems.length,
  placeCreateMax: placeCreateStepItems.length,
} as const;
