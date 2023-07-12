import momentActions from "./momentActions";
import uiActions from "./uiActions";
import mediaActions from './mediaActions';
import highlightActions from './highlightActions';

const actions = {
  ...momentActions,
  ...uiActions,
  ...mediaActions,
  ...highlightActions
};

export default actions;
