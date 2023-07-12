// import loginAuth from "../auth/auth-actions";
import { formAction } from "./form-slice";

const { setFormObj, setFormObjDefault } = formAction;
// record Input changes
export const setFormData = (payload) => {
  return async (dispatch) => {
    dispatch(setFormObj({ ...payload }));
  };
};

export const setFormDefault = (payload) => {
  return async (dispatch) => {
    dispatch(setFormObjDefault({ ...payload }));
  };
};

// submit Form with validation
// export const submitFormData = (payload, type) => {
//   return async (dispatch) => {
//     if (type === "login") {
//       await dispatch(loginAuth(payload));
//     }
//   };
// };

export default setFormData;
