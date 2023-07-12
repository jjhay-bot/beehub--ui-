import { useReactiveVar } from "@apollo/client";
import { Alert, Slide, Snackbar } from "@mui/material";
import gql_var from "../../graphql/variables";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

export const Notification = () => {
  const notifMessage = useReactiveVar(gql_var.notifMessageVar);
  const notifAlert = useReactiveVar(gql_var.notifAlertVar);

  const handleClose = () => {
    gql_var.notifAlertVar(false);
  };

  return (
    notifAlert && (
      <Snackbar
        open={true}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}>
        <Alert onClose={handleClose} severity={notifMessage.type} sx={{ width: "100%" }}>
          {notifMessage.message}
        </Alert>
      </Snackbar>
    )
  );
};
