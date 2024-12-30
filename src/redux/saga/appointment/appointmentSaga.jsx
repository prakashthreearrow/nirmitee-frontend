import { all, call, put, takeEvery } from "redux-saga/effects";
import { APPOINTMENT } from "../../actions/types";
import { appointmentFailure } from "../../actions";
import API from "../../../services/api";
import { notifyError, notifySuccess, notifyWarning } from "../../../utils/helper";

function* appointmentRequest(action) {
    try {
        let response = null;
        if (action?.payload?.calender?.id) {
            const { data } = yield API.put(
                `/api/v1/appointments/${action?.payload?.calender?.id}`,
                action?.payload?.calender
            )
            response = data;
        } else {
            const { data } = yield API.post(
                "/api/v1/appointments",
                action?.payload?.calender
            );
            response = data;
        }
        if (response.meta.code === 200) {
            yield call(action.payload.callback, response);
            notifySuccess(response.meta.message);
        } else if (response.meta.code !== 200) {
            yield call(action.payload.callback, response);
            notifyWarning(response.meta.message);
        }
    } catch (error) {
        yield put(appointmentFailure());
        notifyError(error?.response?.data?.message);
    }
}

export function* watchAppointmentAPI() {
    yield takeEvery(APPOINTMENT, appointmentRequest);
}

export default function* rootSaga() {
    yield all([watchAppointmentAPI()]);
}
