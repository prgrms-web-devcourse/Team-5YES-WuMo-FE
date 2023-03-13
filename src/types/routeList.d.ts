export type RoutePlaceListProps = {
  locations: LocationsProps[];
};

export type LocationsProps = {
  id: string;
  name: string;
  address: string;
  image: string;
};

export type RouteList = {
  routes: BestRouteListProps[];
  lastId: number;
};

export type BestRouteListProps = {
  routeId: number;
  likeCount: number;
  isLiking: boolean;
  locations: LocationsProps[];
  name: string;
  startDate: string;
  endDate: string;
  image: string;
};

export type BestRouteListSortSearchProps = {
  cursorId?: number;
  pageSize: number;
  sortType: 'NEWEST' | 'LIKES';
  searchWord?: string;
};

export type BestRouteListSort = {
  sortType: string;
};

export type BestRouteListType = {
  routes: {
    routeId: number;
    image: string;
    likeCount: number;
    isLiking: boolean;
    locations: RoutePlaceListProps.locations;
    name: string;
    startDate: string;
    endDate: string;
  }[];
};

export type BestRouteListParams = {
  cursorId?: number;
  pageSize: number;
  sortType: string;
  searchWord?: string;
};

export type BestRouteItemProps = {
  name: string;
  routeId: number;
  image: string;
  dragging: boolean;
};
