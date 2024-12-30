//import all Saga functions you are creating here...
//Add it inside the array like function eg:mySaga()
import { all } from "redux-saga/effects";
import Login from "./auth/loginSaga";
import ResetPassword from "./auth/resetPasswordSaga";
import ForgotPassword from "./auth/forgotPasswordSaga";
import ChangePassword from "./user/changePasswordSaga";
import ResendOtp from "./user/resendOtpSaga";
import Logout from "./user/logoutSaga";
import Registration from "./user/registrationSaga";
import EmailVerify from "./user/emailVerifySaga";
import GetUserDetail from "./user/getUserDetailSaga";
import EditProfile from "./user/editProfileSaga";
import Appointment from "./appointment/appointmentSaga";
import GetAppointment from "./appointment/getAppointmentSaga";

export default function* rootSaga() {
  yield all([
    Login(),
    ResetPassword(),
    ForgotPassword(),
    ChangePassword(),
    ResendOtp(),
    Logout(),
    Registration(),
    EmailVerify(),
    GetUserDetail(),
    EditProfile(),
    Appointment(),
    GetAppointment(),
  ]);
}
