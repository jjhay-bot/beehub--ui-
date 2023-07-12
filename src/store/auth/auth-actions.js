import { checkError, requestOption } from "../api/request";
import { authAction } from "./auth-slice";
import { formAction } from "../form/form-slice";
import newNotification from "../ui/ui-actions";
import { setSession, getForage, setForage } from "../api/forage";
import { API_URI } from "../../config";
import localforage from "localforage";
import getVendorList from '../vendors/vendor-actions';
import getWarehouseList from '../warehouse/warehouse-actions';

const loginAuth = (payload) => {
  const { setError } = formAction;
  const { setUser, setToken, setEmail, setIsLoading } = authAction;
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      const { data } = await requestOption(`${API_URI}/auth/v1/login`, payload);
      dispatch(setUser(data));
      dispatch(setToken(data.jwt_token));
      dispatch(setEmail(data.email));

      // save session
      localStorage.setItem("token", data.jwt_token);
      localStorage.setItem("email", data.email);
      setSession("session", new Date());
      dispatch(newNotification("Login successfully!"));
      dispatch(setIsLoading(false))
    } catch (error) {
      localStorage.clear();
      dispatch(setIsLoading(false))
      dispatch(setError("Incorrect credential"));
      dispatch(newNotification("Incorrect credential", "error"));
      checkError(error);
    }
  };
};

export const isAuthenticated = (navigation, token) => {
  const { setUser } = authAction;
  return async (dispatch) => {
    const session = sessionStorage.getItem("session");
    const currentUser = await getForage("login");

    try {
      if (!session && token) {
        await localforage.clear();
        await setForage("login", currentUser);
        dispatch(setUser(currentUser));
        sessionStorage.setItem("session", new Date());
      }
      if (!token) {
        return navigation("/login");
      }
      dispatch(getVendorList());
      dispatch(getWarehouseList());
    } catch (error) {
      checkError();
      console.log("error: checking isAuthenticated()");
    }
  };
};

export default loginAuth;
