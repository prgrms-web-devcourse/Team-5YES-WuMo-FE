import axiosInstance from '@/api/api';
import { MyPartyListPrams } from '@/types/party';
import { BestRouteListParams } from '@/types/routeList';

export const fetchBestRouteList = async ({
  cursorId,
  pageSize,
  sortType,
  searchWord,
}: BestRouteListParams) => {
  try {
    const response = await axiosInstance.get(
      `/routes?cursorId=${
        cursorId ? cursorId : ''
      }&pageSize=${pageSize}&sortType=${sortType}&searchWord=${
        searchWord ? searchWord : ''
      }`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMyPartyList = async ({
  cursorId,
  pageSize,
  partyType,
}: MyPartyListPrams) => {
  try {
    const response = await axiosInstance.get(
      `/parties/members/me?partyType=${partyType}&cursorId=${
        cursorId ? cursorId : ''
      }&pageSize=${pageSize}`
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
