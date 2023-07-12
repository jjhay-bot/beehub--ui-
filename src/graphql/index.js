import gql_var from "./variables";
import actions from './actions/index';

const gql_options = {
  ...gql_var,
  ...actions
}

export default gql_options