import {
  EMAIL_VERIFY,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILURE
} from "../../actions/types";

const INIT_STATE = {
  loading: false
};

const emailVerifyReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMAIL_VERIFY:
      return { ...state, loading: true };
    case EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EMAIL_VERIFY_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default emailVerifyReducer;
