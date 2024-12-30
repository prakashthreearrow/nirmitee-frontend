import { all, call, takeEvery } from "redux-saga/effects";
import { FORGOT_PASSWORD } from "../../actions/types";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* forgotPasswordRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/forgot-password",
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

export function* watchForgotPasswordAPI() {
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchForgotPasswordAPI()]);
}
