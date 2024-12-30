import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGIN } from "../../actions/types";
import { loginFailure } from "../../actions";
import API from "../../../services/api";
import { notifySuccess, notifyWarning, setLocalStorageItem } from "../../../utils/helper";

function* loginRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/login",
      action?.payload?.data
    );
    if (data.meta.code === 200) {
      setLocalStorageItem("token",data?.meta?.token)
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(loginFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchloginAPI() {
  yield takeEvery(LOGIN, loginRequest);
}

export default function* rootSaga() {
  yield all([watchloginAPI()]);
}
