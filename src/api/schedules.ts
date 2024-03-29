import { BestRouteListParamsType } from '@/types/routeList';
import { ChangeAmountType, CreateCommentBody, UpdateCommentType } from '@/types/schedule';

import axiosInstance from './api';

export const fetchScheduleList = async (partyId: number, isPublic: boolean) => {
  const params = {
    party: partyId,
    path: isPublic ? 1 : 0,
  };
  try {
    const response = await axiosInstance.get('/routes/detail', { params });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRouteCommentList = async (
  cursorId: number | string,
  locationId: number
) => {
  try {
    const response = await axiosInstance.get(
      `/party-route-comments?cursorId=${cursorId}&pageSize=5&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 공개된 추천 일정 (추천 일정 목록) 조회
export const fetchBestRouteList = async ({
  cursorId,
  pageSize,
  sortType,
  searchWord,
}: BestRouteListParamsType) => {
  const params = {
    cursorId,
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

export const fetchLikeRouteList = async ({
  pageSize,
  sortType,
  searchWord,
}: BestRouteListParamsType) => {
  const params = {
    pageSize,
    sortType,
    searchWord,
  };

  try {
    const response = await axiosInstance.get('/routes/likes', { params });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createRouteComment = async (body: CreateCommentBody) => {
  try {
    const response = await axiosInstance.post(`/party-route-comments`, {
      ...body,
    });

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchChangeAmount = async (body: ChangeAmountType) => {
  return await axiosInstance.patch(`/locations/spending`, {
    ...body,
  });
};

export const patchRouteComment = async (body: UpdateCommentType) => {
  try {
    await axiosInstance.patch(`/party-route-comments`, {
      ...body,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteRouteComment = async (id: number) => {
  try {
    return await axiosInstance.delete(`/party-route-comments/${id}`);
  } catch (error) {
    console.error(error);
  }
};
