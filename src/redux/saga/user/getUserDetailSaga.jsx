import { all, call, put, takeEvery } from "redux-saga/effects";
import { persistor } from '../../store/index'; // Import named exports
import { GET_USER_DETAIL } from "../../actions/types";
import { getUserDetailSuccess, resetUserDetail } from "../../actions";
import API from "../../../services/api";
import { notifyError, notifySuccess, notifyWarning, removeLocalStorageItem } from "../../../utils/helper";

function* getUserDetailRequest(action) {
    try {
        const { data } = yield API.get(
            "/api/v1/user-detail",
            action?.payload?.calender
        )
        if (data.meta.code === 200) {
            yield put(getUserDetailSuccess(data));
            yield call(action.payload.callback, data);
            notifySuccess(data.meta.message);
        } else if (data.meta.code !== 200) {
            if (data.meta.code === 401) {
                removeLocalStorageItem("token");
                yield put(resetUserDetail()); // Dispatch an action to clear Redux state
                persistor.purge(["GetUserDetail"]); // Only clear 'user' data
            }
            yield call(action.payload.callback, data);
            notifyWarning(data.meta.message);
        }
    } catch (error) {
        notifyError(error?.response?.data?.message);
    }
}

export function* watchGetUserDetailAPI() {
    yield takeEvery(GET_USER_DETAIL, getUserDetailRequest);
}

export default function* rootSaga() {
    yield all([watchGetUserDetailAPI()]);
}
