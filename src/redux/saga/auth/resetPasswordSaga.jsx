import { all, call, takeEvery } from "redux-saga/effects";
import { RESET_PASSWORD } from "../../actions/types";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* resetPasswordRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/reset-password",
      action?.payload?.data
    );
    if (data.meta.code === 200) {
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchResetPasswordAPI() {
  yield takeEvery(RESET_PASSWORD, resetPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchResetPasswordAPI()]);
}
