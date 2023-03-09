import { atom } from 'recoil';

import { Place, PlaceSearchResult } from '@/types/place';

export const initialPlaceState = {
  name: '',
  address: '',
  latitude: 0,
  longitude: 0,
  imageURL: '',
  imageFile: null,
  category: '',
  description: '',
  visitDate: '',
  expectedCost: 0,
};

export const initialPlaceSearchState = {
  keyword: '',
  result: [],
  selectedPlace: {
    id: '',
    place_name: '',
    address_name: '',
    road_address_name: '',
    x: '',
    y: '',
  },
};

export const createPlaceState = atom<Place>({
  key: 'createPlaceState',
  default: initialPlaceState,
});

export const createPlaceStepState = atom<number>({
  key: 'createPlaceStepState',
  default: 1,
});

export const placeSearchState = atom<PlaceSearchResult>({
  key: 'placeSearchState',
  default: initialPlaceSearchState,
});
