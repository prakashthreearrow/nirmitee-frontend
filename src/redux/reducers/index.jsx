import { combineReducers } from "redux";
//import all reducers creating here, and add inside the combine reducers
import Login from "./auth/loginReducer";
import ResetPassword from "./auth/resetPasswordReducer";
import ForgotPassword from "./auth/forgotPasswordReducer";
import ChangePassword from "./user/changePasswordReducer";
import ResendOtp from "./user/resendOtpReducer";
import Logout from "./user/logoutReducer";
import Registration from "./user/registrationReducer";
import EmailVerify from "./user/emailVerifyReducer";
import GetUserDetail from "./user/getUserDetailReducer";
import EditProfile from "./user/editProfileReducer";
import Appointment from "./appointment/appointmentReducer";
import GetAppointment from "./appointment/getAppointmentReducer";


const appReducer = combineReducers({
  //exampleReducer
  Login,
  ResetPassword,
  ForgotPassword,
  ChangePassword,
  ResendOtp,
  Logout,
  Registration,
  EmailVerify,
  GetUserDetail,
  EditProfile,
  Appointment,
  GetAppointment,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
