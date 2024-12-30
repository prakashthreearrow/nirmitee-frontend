import { all, call, put, takeEvery } from "redux-saga/effects";
import { EDIT_PROFILE } from "../../actions/types";
import { editProfileFailure } from "../../actions";
import API from "../../../services/api";
import { notifyError, notifySuccess, notifyWarning } from "../../../utils/helper";

function* editProfileRequest(action) {
    try {
        const { data } = yield API.put(
            "/api/v1/edit-profile",
            action?.payload?.payload
        )
        if (data.meta.code === 200) {
            yield call(action.payload.callback, data);
            notifySuccess(data.meta.message);
        } else if (data.meta.code !== 200) {
            yield call(action.payload.callback, data);
            notifyWarning(data.meta.message);
        }
    } catch (error) {
        yield put(editProfileFailure());
        notifyError(error?.response?.data?.message);
    }
}

export function* watchEditProfileAPI() {
    yield takeEvery(EDIT_PROFILE, editProfileRequest);
}

export default function* rootSaga() {
    yield all([watchEditProfileAPI()]);
}
