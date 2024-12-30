import {
  EMAIL_VERIFY,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILURE
} from "../types";

export const emailVerify = (payload) => ({
  type: EMAIL_VERIFY,
  payload,
});

export const emailVerifySuccess = (payload) => ({
  type: EMAIL_VERIFY_SUCCESS,
  payload,
});

export const emailVerifyFailure = () => ({
  type: EMAIL_VERIFY_FAILURE,
});
