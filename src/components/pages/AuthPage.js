import { Stack } from "@mui/system";
import React from "react";
import AuthForm from '../organism/AuthForm';

const AuthPage = () => {
  return (
    <Stack height="90vh" alignItems="center" justifyContent="center">
      <AuthForm />
    </Stack>
  );
};

export default AuthPage;
