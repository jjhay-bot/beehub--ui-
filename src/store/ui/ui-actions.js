import { uiAction } from "./ui-slice";

const newNotification = (message, severity = "success") => {
  const { setNotification } = uiAction;
  return async (dispatch) => {
    dispatch(
      setNotification({
        message: message,
        type: severity,
      })
    );
  };
};

export default newNotification;
