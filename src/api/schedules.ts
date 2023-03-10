import { ChangeAmountType, CreateCommentBody } from '@/types/schedule';

import axiosInstance from './api';

export const fetchScheduleList = async (partyId: number, isPublic: boolean) => {
  try {
    const response = await axiosInstance.get(
      `/routes/${partyId}?path=${isPublic ? 1 : 0}`
    );

    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLocationCommentList = async (cursorId: number, locationId: number) => {
  try {
    const response = await axiosInstance.get(
      `/party-route-comments?cursorId=${cursorId}&pageSize=1000&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createLocationComment = async (body: CreateCommentBody) => {
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
  try {
    await axiosInstance.patch(`/locations/spending`, {
      ...body,
    });
  } catch (error) {
    console.error(error);
  }
};
