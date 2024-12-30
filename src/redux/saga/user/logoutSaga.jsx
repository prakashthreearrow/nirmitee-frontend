import { put, takeEvery, all, call } from "redux-saga/effects";
import { LOGOUT } from "../../actions/types";
import { persistor } from '../../store/index'; // Import named exports
import API from "../../../services/api";
import { removeLocalStorageItem } from "../../../utils/helper";
import { logoutSuccess, resetUserDetail } from "../../actions";

function* logoutRequest(action) {
  let payload = {
    user_id: action?.payload?.user_id,
  };
  const { data } = yield API.post("/api/v1/logout", payload);
  if (data?.meta?.code === 200) {
       yield put(resetUserDetail()); // Dispatch an action to clear Redux state
    removeLocalStorageItem("token");
    persistor.purge(["GetUserDetail"]); // Only clear 'user' data
    // Purge persisted storage
    yield call(persistor.purge);
    yield call(action.payload.callback, data);
    yield put(logoutSuccess());
    yield call(action.payload.callback, data);
  }
}

export function* watchlogoutAPI() {
  yield takeEvery(LOGOUT, logoutRequest);
}

export default function* rootSaga() {
  yield all([watchlogoutAPI()]);
}
