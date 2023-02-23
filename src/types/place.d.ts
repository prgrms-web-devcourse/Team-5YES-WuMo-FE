import { MutableRefObject } from 'react';

export type PlaceListTableProps = {
  selectedPlace: string | null;
  places: kakao.maps.services.PlacesSearchResultItem[];
  selectPlaceHandler: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

export type PlacePreviewMapProps = {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
  level?: number;
};

export type PlaceSearchFormProps = {
  initialRef: MutableRefObject<null>;
  searchHandler: (keyword: string) => void;
};

export type PlaceSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
