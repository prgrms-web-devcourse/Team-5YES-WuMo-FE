export type PlaceListProps = {
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
  searchPlaceHandler: (keyword: string) => void;
  resetPlaceHandler: () => void;
};

export type PlaceCreateModalProps = {
  isOpen: boolean;
  closeModalHandler: () => void;
};

export type StepItems = {
  [stepKey: number]: {
    title: string;
    content: JSX.Element;
  };
};

export type Category = {
  [name: string]: {
    text: string;
    imageID: string;
  };
};

export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  category: string;
  description: string;
  visitDate: string;
  expectedCost: number;
};

export type PlaceInfoType = 'visitDate' | 'expectedCost' | 'image' | 'description';

export type PlaceInfoStepItem = {
  type: PlaceInfoType;
  icon: JSX.Element;
  text: string;
  content: JSX.Element;
};

export type PlaceCreateStepItem = {
  title: string;
  component: JSX.Element;
};

export type InputValueType = string | number | File | Date | null;

export type InputProps = {
  value: string;
  setValueHandler: (key: PlaceInfoType, newValue: InputValueType) => void;
};
