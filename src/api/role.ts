import { RolePatchBody } from '@/types/role';

import instance from './api';

export const patchOwnRole = async (partyId: number, rolePatchAPIBody: RolePatchBody) => {
  try {
    const response = await instance.patch(
      `/parties/${partyId}/members`,
      rolePatchAPIBody
    );
    if (response) return response.data;
  } catch (error) {
    console.error(error);
  }
};
