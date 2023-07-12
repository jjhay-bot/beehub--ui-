import { gql } from "@apollo/client";

export const GET_MOMENTS = gql`
  query MomentGet($limit: Int, $offset: Int) {
    momentGet(limit: $limit, offset: $offset) {
      id
      date
      title
      content
      commentCount
      likeCount
    }
  }
`;
export const GET_MOMENT_ID = gql`
  query MomentGetById($momentGetByIdId: String!) {
    momentGetById(id: $momentGetByIdId) {
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
          title
          date
          supplier
          content
          category
        }
      }
      comments {
        content
      }
      highlights {
        id
        isVisible
        content
        # GETTING BE ERROR when added category! & supplier!
        # category
        # supplier
        rating
      }
    }
  }
`;
