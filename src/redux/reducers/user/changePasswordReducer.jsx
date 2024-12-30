import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
} from "../../actions/types";

const INIT_STATE = {
  loading: false,
};

const changePasswordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return { ...state, loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default changePasswordReducer;
