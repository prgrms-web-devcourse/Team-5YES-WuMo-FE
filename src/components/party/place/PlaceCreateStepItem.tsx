import { StepItems } from '@/types/place';

import PlaceCategoryStep from './PlaceCategoryStep';
import PlaceInfoStep from './PlaceInfoStep';
import PlaceSearchStep from './PlaceSearchStep';

export const placeCreateStepItems: StepItems = {
  1: {
    title: '후보지의 장소를 선택해 주세요.',
    content: <PlaceSearchStep />,
  },
  2: {
    title: '여기서 무엇을 하나요?',
    content: <PlaceCategoryStep />,
  },
  3: {
    title: '부가 정보를 입력해 주세요.',
    content: <PlaceInfoStep />,
  },
};

export const placeCreateStep = {
  size: 30, // TODO: 수식으로 변경(마지막 단계는 100이 되도록)
  min: 1,
  max: Object.keys(placeCreateStepItems).length,
} as const;
