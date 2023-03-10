import { BestRouteListSortSearchProps } from '@/types/routeList';

import axiosInstance from './api';

export const fetchScheduleList = async (routeId: number, isPublic: boolean) => {
  try {
    const response = await axiosInstance.get(`/routes/${11}?path=${isPublic ? 1 : 0}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLocationCommentList = async (cursorId: number, locationId: number) => {
  try {
    const response = await axiosInstance.get(
      `/party-route-comments?cursorId=${cursorId}&pageSize=5&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 공개된 루트 (베스트루트 목록) 조회
export const fetchBestRouteList = async ({
  pageSize,
  sortType,
  searchWord,
}: BestRouteListSortSearchProps) => {
  const params = {
    pageSize,
    sortType,
    searchWord,
  };

  try {
    const response = await axiosInstance.get('/routes', { params });
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
