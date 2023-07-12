import { gql } from "@apollo/client";

export const CREATE_MEDIA = gql`
  # {
  #   "input": {
  #     "url": "https://momento-images-v1.s3.ap-southeast-1.amazonaws.com/moments/37.jpg",
  #     "type": "moment",
  #     "reference": {
  #       "id": "cc854c4e-c89c-4faf-a4fe-0cc10a537b65",
  #       "isVisible": true
  #     }
  #   }
  # }
  mutation Mutation($input: MediaInput) {
    mediaCreate(input: $input) {
      id
      url
      type
      reference {
        id
        isVisible
        content
        category
        supplier
        title
        date
      }
    }
  }
`;

export const DELETE_MEDIA = gql`
  mutation Mutation($mediaDeleteId: String!) {
    mediaDelete(id: $mediaDeleteId)
  }
`;
