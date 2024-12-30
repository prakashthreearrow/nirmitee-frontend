import { APPOINTMENT, APPOINTMENT_SUCCESS, APPOINTMENT_FAILURE } from "../types";

export const appointment = (payload) => ({
  type: APPOINTMENT,
  payload,
});

export const appointmentSuccess = () => ({
  type: APPOINTMENT_SUCCESS
});

export const appointmentFailure = () => ({
  type: APPOINTMENT_FAILURE,
});
