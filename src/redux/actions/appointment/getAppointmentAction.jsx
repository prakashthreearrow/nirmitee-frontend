import { GET_APPOINTMENT, GET_APPOINTMENT_SUCCESS, GET_APPOINTMENT_FAILURE } from "../types";

export const getAppointment = (payload) => ({
  type: GET_APPOINTMENT,
  payload,
});

export const getAppointmentSuccess = (payload) => ({
  type: GET_APPOINTMENT_SUCCESS,
  payload,
});

export const getAppointmentFailure = () => ({
  type: GET_APPOINTMENT_FAILURE,
});
