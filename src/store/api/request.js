import axios from "axios";
import localforage from "localforage";
import { API_URI } from "../../config";
import { last, split } from "lodash";
import { setForage } from "./forage";

export const checkError = (error) => {
  console.log(
    `%c ${error?.response?.data?.error?.message || error || "Server Error"} `,
    "background:  #66ff66"
  );
  if (error?.response?.data?.error?.message) {
    throw new Error(error?.response?.data?.error?.message);
  } else {
    throw new Error(error || "Status 500, Server Error");
  }
};

export const requestOption = async (url = API_URI, data, options = {}) => {
  const { refetch = true, formdata, uniq = "", type = null, record = true } = options;
  const method = type ? type : data ? "post" : "get";

  const newContentType = async () =>
    await (formdata ? "application/x-www-form-urlencoded" : "application/json");
  const headers = {
    "Content-Type": await newContentType(),
    Authorization: localStorage.getItem("token"),
  };

  // hasLocal data (session) || fetch
  const localKey = last(split(url, "/")) + uniq;
  let sessionData = refetch ? null : await localforage.getItem(localKey);

  // FETCH
  const res = sessionData || (await axios(url, { data, method, headers }));
  !sessionData && record && (await setForage(localKey, res.data));
  return sessionData ? res : await res.data;
};
