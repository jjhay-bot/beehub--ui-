import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MEDIA, DELETE_MEDIA } from "../mutations/media";

const DeleteMedia = (media_id) => {
  return useMutation(DELETE_MEDIA, {
    variables: {
      mediaDeleteId: media_id,
    },
    onCompleted: (data) => {
      // console.log(data);
    },
    onError: (e) => console.log(e),
  });
};

const CreateMedia = () => {
  return useMutation(CREATE_MEDIA, {
    onCompleted: (data) => {
      // console.log(data);
    },
    onError: (e) => console.log(e),
  });
};

const mediaActions = {
  DeleteMedia,
  CreateMedia,
};

export default mediaActions;
