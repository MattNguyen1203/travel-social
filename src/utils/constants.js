// API URL
export const LOGIN_URL = "auth/login";
export const LOGOUT_URL = "auth/logout";
export const UPDATE_USER_URL = "auth/update";
export const REGISTER_URL = "auth/register";
export const FORGOT_URL = "auth/forgot";
export const RESET_URL = "auth/reset";

// Auth constants

export const LOGIN = "login";
export const REGISTER = "register";
export const LOGOUT = "logout";
export const UPDATE_USER = "updateUser";
export const FORGOT = "forgotPassword";
export const RESET = "resetPassword";
export const STRONG_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\\\]&/|>,"'`~.#$%^()_+=\-[}{;:])[A-Za-z\d@$!%*?&/|>,"'`~.#$%^()_+=\-[}{;\]\\:]{8,}$/;

export const UPDATE_PERSONAL = "updatePersonal";
export const UPDATE_SECURITY = "updateSecurity";

// Route
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const SETTING_ROUTE = "/setting";
export const OVERVIEW_ROUTE = "/setting/overview";
export const PERSONAL_ROUTE = "/setting/personal";
export const SECURITY_ROUTE = "/setting/security";
