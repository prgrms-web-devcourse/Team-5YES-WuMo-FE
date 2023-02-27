import { StepItem } from '@/types/place';

import PlaceCategoryStep from './PlaceCategoryStep';
import PlaceInfoStep from './PlaceInfoStep';
import PlaceSearchStep from './PlaceSearchStep';

export const placeCreateStepItems: StepItem[] = [
  {
    title: '후보지의 장소를 선택해 주세요.',
    content: <PlaceSearchStep />,
  },
  {
    title: '여기서 무엇을 하나요?',
    content: <PlaceCategoryStep />,
  },
  {
    title: '부가 정보를 입력해 주세요.',
    content: <PlaceInfoStep />,
  },
];

export const placeCreateStep = {
  size: 30, // TODO: 수식으로 변경
  min: 1,
  max: placeCreateStepItems.length,
} as const;
