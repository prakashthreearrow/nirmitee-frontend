import { all, call, takeEvery } from "redux-saga/effects";
import { REGISTRATION } from "../../actions/types";
import API from "../../../services/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* registrationRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/register",
      action?.payload?.data
    );
    if (data.meta.code === 200) {
      notifySuccess(data.meta.message);
      yield call(action.payload.callback, data)
    } else if (data.meta.code !== 200) {
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchRegistrationAPI() {
  yield takeEvery(REGISTRATION, registrationRequest);
}

export default function* rootSaga() {
  yield all([watchRegistrationAPI()]);
}
