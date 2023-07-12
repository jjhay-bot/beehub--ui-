import { gql } from "@apollo/client";

export const GET_HIGHLIGHTS = gql`
  query HighlightGet($limit: Int, $offset: Int) {
    highlightGet(limit: $limit, offset: $offset) {
      id
      isVisible
      content
      category
      supplier
      rating
      moment {
        id
      }
      media {
        id
        url
        type
      }
    }
  }
  # query HighlightGet($limit: Int, $offset: Int) {
  #   highlightGet(limit: $limit, offset: $offset) {
  #     id
  #     isVisible
  #     content
  #     category
  #     supplier
  #     rating
  #     media {
  #       id
  #       url
  #       type
  #     }
  #     moment {
  #       id
  #       date
  #       title
  #       content
  #       commentCount
  #       likeCount
  #     }
  #   }
  # }
`;

export const GET_HIGHLIGHT_BY_ID = gql`
  query Query($highlightGetByIdId: String!) {
    highlightGetById(id: $highlightGetByIdId) {
      id
      isVisible
      content
      category
      supplier
      rating
      media {
        id
        url
        type
        reference {
          id
          isVisible
          content
          category
          supplier
          date
          title
        }
      }
    }
  }
`;
