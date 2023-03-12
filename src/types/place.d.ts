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
  searchAddress?: string;
  latitude: number;
  longitude: number;
  imageURL?: string;
  imageFile?: File | null;
  category: CategoryName;
  description: string;
  visitDate: string;
  expectedCost: number;
  spending?: number;
  routeId?: number;
  partyId?: number;
};

export type Places = {
  locations: PlaceInformation[];
  lastId: number;
};

export type PlaceInformation = {
  id: number;
  name: string;
  address: string;
  searchAddress: string;
  latitude: number;
  longitude: number;
  image: string;
  category: CategoryName;
  description: string;
  visitDate: string;
  expectedCost: number;
  spending: number;
  routeId: number;
  isEditable: boolean;
};

export type PlacePatchBody = Pick<
  PlaceInformation,
  'id',
  'image',
  'category',
  'description',
  'visitDate',
  'expectedCost',
  'partyId'
>;

export type PlaceMarker = Pick<
  Place,
  'id' | 'name' | 'latitude' | 'longitude' | 'category'
>;

export type PlaceInformationType =
  | 'visitDate'
  | 'expectedCost'
  | 'imageURL'
  | 'description'
  | 'address'
  | 'category';

export type PlaceInformationItem = {
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
  places: PlaceInformation[];
};

export type Comment = {
  content: string;
  image?: string;
  locationId: number;
  partyMemberId: number;
};

export type PlaceInformationTableProps = {
  data: PlaceInformation;
};

export type ImageData = {
  imageBase64: string | null;
  imageFile: File | null;
};

export type PlacesParams = {
  cursorId: number;
  pageSize: number;
  partyId: number;
};

export type PlaceToRoute = {
  routeId: number | null;
  locationId: number;
  partyId: number;
};
