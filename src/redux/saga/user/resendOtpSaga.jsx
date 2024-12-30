import { all, call, takeEvery } from "redux-saga/effects";
import { RESEND_OTP } from "../../actions/types";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* resendOtpRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/resend-otp",
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

export function* watchResendOtpAPI() {
  yield takeEvery(RESEND_OTP, resendOtpRequest);
}

export default function* rootSaga() {
  yield all([watchResendOtpAPI()]);
}
