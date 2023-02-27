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
  longititude: number;
  image_url: string;
  category: string;
  description: string;
  visit_date: string;
  expected_cost: number;
  spending: number;
  created_at: string;
  updated_at: string;
  party_id: number;
  route_id: number;
};

type PlaceInfoStep = 'visit_date' | 'expected_cost' | 'image_url' | 'description';

export type PlaceInfoStepItem = {
  type: PlaceInfoStep;
  icon: JSX.Element;
  text: string;
  value: string | number;
  content: JSX.Element;
};
