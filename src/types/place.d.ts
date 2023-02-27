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
