import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { MOMENT_UPDATE } from "../mutations/moments";
import { GET_MOMENTS, GET_MOMENT_ID } from "../queries/moments";
import gql_var from "../variables";
import actions from "./index";

const GetAllMoment = () => {
  return useQuery(GET_MOMENTS, {
    variables: {
      offset: null,
      limit: null,
    },
    onCompleted: (data) => {
      console.log("GetAllMoment", data);
      // gql_var.rolesVar(data);
    },
    onError: (e) => console.log(e),
    // onError: actions.reqError,
  });
};

const GetMomentById = (variables) => {
  return useLazyQuery(GET_MOMENT_ID, {
    variables,
    onCompleted: async (data) => {
      const mediaVar = data.momentGetById.media.filter((key) => !!key.id);
      gql_var.momentURL_ID(variables.momentGetByIdId)
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
      gql_var.momentFormVar({ ...data.momentGetById, media: mediaVar });
    },
    onError: (e) => console.log(e),
    // onError: actions.reqError,
  });
};

const MomentUpdate = (momentFormVar) => {
  const media = Object.values(momentFormVar?.media || [])?.map(({ id, reference, type, url }) => {
    const { id: ref_id, isVisible } = reference;
    return {
      id: String(id),
      type,
      url,
      reference: { id: String(ref_id), isVisible },
    };
  });
  return useMutation(MOMENT_UPDATE, {
    variables: {
      momentUpdateId: momentFormVar.id,
      input: {
        title: momentFormVar.title,
        date: momentFormVar.date,
        content: momentFormVar.content,
        location: momentFormVar.location,
        media: media,
      },
    },
    onCompleted: () => {
      // actions.reqSuccess(`Removed special for ${startCase(data.identifier_key)}`);
      // data.identifier_key === "account_id" ? refetchAccounts() : refetchDevices();
    },
    onError: actions.reqError,
  });
};

const momentActions = {
  GetAllMoment,
  GetMomentById,
  MomentUpdate,
};

export default momentActions;
