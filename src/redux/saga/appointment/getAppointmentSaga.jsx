import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_APPOINTMENT } from "../../actions/types";
import { getAppointmentFailure } from "../../actions";
import API from "../../../services/api";
import { notifyError } from "../../../utils/helper";

function* getAppointmentRequest(action) {
    try {
        const { data } = yield API.get(
            "/api/v1/appointments"
        );
        if (data.meta.code === 200) {
            yield call(action.payload.callback, data);
        } else if (data.meta.code !== 200) {
            yield call(action.payload.callback, data);
        }
    } catch (error) {
        yield put(getAppointmentFailure());
        notifyError(error?.response?.data?.message);
    }
}

export function* watchGetAppointmentAPI() {
    yield takeEvery(GET_APPOINTMENT, getAppointmentRequest);
}

export default function* rootSaga() {
    yield all([watchGetAppointmentAPI()]);
}
