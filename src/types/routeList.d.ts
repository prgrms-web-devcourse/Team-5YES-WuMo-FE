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
