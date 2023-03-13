export type RoutePlaceListProps = {
  locations: LocationsProps[];
};

export type LocationsProps = {
  id: string;
  name: string;
  address: string;
  image: string;
};

export type BestRouteListSort = {
  sortType: string;
};

export type BestRouteListType = {
  routes: {
    routeId: number;
    partyId: number;
    image: string;
    likeCount: number;
    isLiking: boolean;
    locations: RoutePlaceListProps.locations;
    name: string;
    startDate: string;
    endDate: string;
  }[];
};

export type BestRouteListParamsType = {
  cursorId?: number;
  pageSize: number;
  sortType: string;
  searchWord?: string;
};

export type BestRouteItemProps = {
  name: string;
  partyId: number;
  routeId: number;
  image: string;
  dragging: boolean;
};
