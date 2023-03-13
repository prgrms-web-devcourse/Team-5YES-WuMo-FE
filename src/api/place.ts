import {
  Place,
  PlaceCommentCreateBody,
  PlaceCommentPatchBody,
  PlacePatchBody,
  PlaceToRoute,
} from '@/types/place';

import axiosInstance from './api';

export const fetchPlaces = async (
  cursorId: number,
  pageSize: number,
  partyId: number
) => {
  try {
    const response = await axiosInstance.get(
      `/locations?cursorId=${cursorId}&pageSize=${pageSize}&partyId=${partyId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlace = async (locationId: number) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPlace = async (data: Place) => {
  try {
    const response = await axiosInstance.post('/locations', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPlace = async (data: PlacePatchBody) => {
  try {
    const response = await axiosInstance.patch('/locations', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlace = async (locationId: number) => {
  try {
    await axiosInstance.delete(`/locations/${locationId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createPlaceToRoute = async (data: PlaceToRoute) => {
  try {
    const response = await axiosInstance.post('/routes', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlaceFromRoute = async (locationId: number) => {
  try {
    await axiosInstance.delete(`/locations?locationId=${locationId}`);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlaceComment = async (pageSize: number, locationId: number) => {
  try {
    const response = await axiosInstance.get(
      `/location-comments?pageSize=${pageSize}&locationId=${locationId}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPlaceComment = async (data: PlaceCommentCreateBody) => {
  try {
    const response = await axiosInstance.post('/location-comments', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPlaceComment = async (data: PlaceCommentPatchBody) => {
  try {
    const response = await axiosInstance.patch('/location-comments', data);
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlaceComment = async (id: number) => {
  try {
    await axiosInstance.delete(`/location-comments/${id}`);
  } catch (error) {
    console.error(error);
  }
};
