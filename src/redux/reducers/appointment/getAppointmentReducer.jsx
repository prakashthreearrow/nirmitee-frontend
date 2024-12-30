import {
    GET_APPOINTMENT,
    GET_APPOINTMENT_SUCCESS,
    GET_APPOINTMENT_FAILURE
} from "../../actions/types";

const INIT_STATE = {
    loading: false
};

const getAppointmentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_APPOINTMENT:
            return { ...state, loading: true };
        case GET_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case GET_APPOINTMENT_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default getAppointmentReducer;
