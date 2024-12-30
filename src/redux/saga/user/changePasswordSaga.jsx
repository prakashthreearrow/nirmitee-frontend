import { all, call, put, takeEvery } from "redux-saga/effects";
import { CHANGE_PASSWORD } from "../../actions/types";
import { changePasswordSuccess, changePasswordFailure } from "../../actions";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* changePasswordRequest(action) {
  try {
    const { data } = yield API.put(
      "/api/v1/change-password",
      action?.payload?.data
    );
    if (data?.meta?.code === 200) {
      yield put(changePasswordSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      yield put(changePasswordFailure());
      notifyWarning(data?.message);
    } else if (data?.meta?.code !== 200) {
      yield put(changePasswordFailure());
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(changePasswordFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchChangePasswordAPI() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordRequest);
}

export default function* rootSaga() {
  yield all([watchChangePasswordAPI()]);
}
