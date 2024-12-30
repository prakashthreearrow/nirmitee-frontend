import { EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from "../types";

export const editProfile = (payload) => ({
  type: EDIT_PROFILE,
  payload,
});

export const editProfileSuccess = () => ({
  type: EDIT_PROFILE_SUCCESS
});

export const editProfileFailure = () => ({
  type: EDIT_PROFILE_FAILURE,
});
