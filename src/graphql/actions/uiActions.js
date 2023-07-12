import gql_var from "../variables";

//NOTIFICATION
const newNotification = (message, type) => {
  gql_var.notifMessageVar({
    message: message,
    type: type,
  });
  gql_var.notifAlertVar(true);
  setTimeout(() => {
    gql_var.notifAlertVar(false);
  }, 3000);
};

const isLoading = () => {
  gql_var.isLoadingVar(true);
};

const isLoadingModal = () => {
  gql_var.isLoadingModalVar(true);
  setTimeout(() => {
    gql_var.isLoadingModalVar(false);
  }, 1000);
};

const reqSuccess = (message) => {
  message && newNotification(message, "success");
  setTimeout(() => {
    gql_var.isLoadingVar(false);
    gql_var.isLoadingModalVar(false);
  }, 100);
  gql_var.modalShowVar(false);
};

const reqError = (error) => {
  newNotification(error.message, "error");
  gql_var.isLoadingVar(false);
  gql_var.isLoadingModalVar(false);
  gql_var.disabledNextVar(true);
  gql_var.lastPageVar(null);
};

const resetPagination = () => {
  gql_var.queryVar("");
  gql_var.pageVar(1);
};

const resetFilters = () => {
  gql_var.filterIsActiveVar("");
  gql_var.filterWithAccessContVar("");
  gql_var.filterDeletedVar(false);
  gql_var.cursorVar([""]);
};

const uiActions = {
  isLoading,
  reqSuccess,
  reqError,
  resetPagination,
  resetFilters,
  newNotification,
  isLoadingModal,
};

export default uiActions;
