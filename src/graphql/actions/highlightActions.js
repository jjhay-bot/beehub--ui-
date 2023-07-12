import { useLazyQuery, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { HIGHLIGHT_CREATE } from "../mutations/hightlights";
import { GET_HIGHLIGHTS, GET_HIGHLIGHT_BY_ID } from "../queries/highlights";
import gql_var from "../variables";
import actions from "./index";
import { compact } from "lodash";

const GetHLById = (variables) => {
  return useLazyQuery(GET_HIGHLIGHT_BY_ID, {
    variables,
    onCompleted: async (data) => {
      const mediaVar = data.highlightGetById.media.filter((key) => !!key.id);
      gql_var.momentURL_ID(variables.momentGetByIdId);
      while (mediaVar.length < 3) {
        mediaVar.push({
          id: mediaVar.length,
          url: null,
          type: "moment",
          reference: {
            id: null,
            isVisible: false,
            content: null,
            category: null,
            supplier: null,
            title: null,
            date: null,
          },
        });
      }
      actions.reqSuccess();
      gql_var.highlightFormVar({ ...data.highlightGetById, media: mediaVar });
    },
    errorPolicy: "ignore",
    onError: (e) => console.log(e),
    // onError: actions.reqError,
  });
};

const CreateHighlight = () => {
  const highlightFormVar = useReactiveVar(gql_var.highlightFormVar);

  return useMutation(HIGHLIGHT_CREATE, {
    // (variables) handle on Component
    onCompleted: (data) => {
      gql_var.highlightFormVar({ ...highlightFormVar, id: data.highlightCreate.id });
    },
    onError: (e) => console.log(e),
  });
};

const GetHighlights = (moment_id) => {
  return useQuery(GET_HIGHLIGHTS, {
    variables: {
      limit: null,
      offset: null,
    },
    errorPolicy: "ignore",
    onCompleted: (data) => {
      const momentHL = compact(data.highlightGet).filter((x) => x.moment.id === moment_id);
      gql_var.momentHL_Var(momentHL);
    },
    onError: (e) => console.log(e),
  });
};

const highlightActions = {
  GetHLById,
  GetHighlights,
  CreateHighlight,
};

export default highlightActions;
