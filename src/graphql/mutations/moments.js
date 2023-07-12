import { gql } from "@apollo/client";

export const MOMENT_UPDATE = gql`
  mutation MomentUpdate($momentUpdateId: String!, $input: MomentInput) {
    momentUpdate(id: $momentUpdateId, input: $input) {
      id
      date
      title
      content
      location
      commentCount
      likeCount
      media {
        id
        url
        type
        reference {
          isVisible
          id
        }
      }
    }
  }
`;
