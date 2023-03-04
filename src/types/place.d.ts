export type PlaceSearchResult = {
  keyword: string;
  result: kakao.maps.services.PlacesSearchResult;
  selectedPlace: Pick<
    kakao.maps.services.PlacesSearchResultItem | 'id',
    'place_name',
    'address_name',
    'road_address_name',
    'x',
    'y'
  >;
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

export type PlaceInformationType =
  | 'visitDate'
  | 'expectedCost'
  | 'image'
  | 'description'
  | 'address';

export type PlaceInformationStepItem = {
  type: PlaceInformationType;
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
  setValueHandler: (key: PlaceInformationType, newValue: InputValueType) => void;
};

export type PlanPlaceListProps = {
  places: Place[];
};

export type Comment = {
  content: string;
  image?: string;
  locationId: number;
  partyMemberId: number;
};

export type PlaceInformationTableProps = {
  data: Place;
};

export type ImageData = {
  imageBase64: string;
  imageFile: File | null;
};
