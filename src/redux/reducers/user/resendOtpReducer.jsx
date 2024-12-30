import {
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE
} from "../../actions/types";

const INIT_STATE = {
  loading: false
};

const resendOtpReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESEND_OTP:
      return { ...state, loading: true };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESEND_OTP_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default resendOtpReducer;
