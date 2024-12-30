import { all, call, takeEvery } from "redux-saga/effects";
import { EMAIL_VERIFY } from "../../actions/types";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* emailVerifyRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/verify-email",
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

export function* watchEmailVerifyAPI() {
  yield takeEvery(EMAIL_VERIFY, emailVerifyRequest);
}

export default function* rootSaga() {
  yield all([watchEmailVerifyAPI()]);
}
