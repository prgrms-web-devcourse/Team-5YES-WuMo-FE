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
  draggable?: boolean;
  mapMarkers?: PlaceMarker[];
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
  id?: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  category: CategoryName;
  description: string;
  visitDate: string;
  expectedCost: number;
  spending?: number;
  routeId?: number;
};

export type PlaceMarker = Pick<Place, 'id' | 'latitude' | 'longitude' | 'category'>;

export type PlaceInfoType =
  | 'visitDate'
  | 'expectedCost'
  | 'image'
  | 'description'
  | 'address';

export type PlaceInfoStepItem = {
  type: PlaceInfoType;
  icon: JSX.Element;
  text: string;
  content?: JSX.Element;
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

export type PlanPlaceListProps = {
  places: Place[];
  openModalHandler: () => void;
};
