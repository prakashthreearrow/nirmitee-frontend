import { GET_USER_DETAIL, RESET_USER_DETAIL, GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_FAILURE } from "../types";

export const getUserDetail = (payload) => ({
  type: GET_USER_DETAIL,
  payload,
});

export const resetUserDetail = () => ({
  type: RESET_USER_DETAIL,
});


export const getUserDetailSuccess = (payload) => ({
  type: GET_USER_DETAIL_SUCCESS,
  payload,
});

export const getUserDetailFailure = () => ({
  type: GET_USER_DETAIL_FAILURE,
});
