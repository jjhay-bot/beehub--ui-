import { GsButton, GsForm, GsTextField } from "../atoms/customComponent";
import { useDispatch, useSelector } from "react-redux";
import { formAction, formState } from "../../store/form/form-slice";
import { setFormData } from "../../store/form/form-actions";
import loginAuth from "../../store/auth/auth-actions";
import ProgressBar from "../atoms/ProgressBar";
import { authState } from "../../store/auth/auth-slice";

const AuthForm = () => {
  const dispatch = useDispatch();
  const { formObj, error } = useSelector(formState);
  const { setError } = formAction;
  const { isLoading } = useSelector(authState);

  const handleChange = (e) => {
    dispatch(setError(false));
    dispatch(setFormData({ [e.target.name]: e.target.value }, "login"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAuth(formObj));
  };

  return (
    <>
      <GsForm sx={{ width: "300px" }} spacing={2}>
        <GsTextField label="Username" onChange={handleChange} error={error} />
        <GsTextField label="Password" onChange={handleChange} helperText={error} type="password" />
        <GsButton label="Login" onClick={onSubmit} sx={{ p: "0.5rem" }} />
      </GsForm>
      <ProgressBar loading={isLoading} type="login" />
    </>
  );
};

export default AuthForm;
