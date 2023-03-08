export type RoutePlaceListProps = {
  locations: {
    id: string;
    name: string;
    address: string;
    image: string;
  }[];
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
