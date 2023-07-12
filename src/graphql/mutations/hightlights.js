import { gql } from "@apollo/client";

export const HIGHLIGHT_UPDATE = gql`
  # payload
  # {
  #   "highlightUpdateId": "9c5bf28c-43ef-49bc-b8c6-49ba1666f0e1",
  #   "input": {
  #     "isVisible": false,
  #     "content": "test-jhay-hl-edit",
  #     "category": "test-jhay-hl-edit",
  #     "supplier": "test-jhay-hl-edit",
  #     "media": [
  #       {
  #         "url": "https://momento-images-v1.s3.ap-southeast-1.amazonaws.com/moments/supporting_photo2.png",
  #         "id": "1"
  #       }
  #     ]
  #   }
  # }
  mutation HighlightUpdate($highlightUpdateId: String!, $input: HighlightInput) {
    highlightUpdate(id: $highlightUpdateId, input: $input) {
      id
      isVisible
      content
      category
      supplier
      rating
    }
  }
`;

export const HIGHLIGHT_CREATE = gql`
  # PAYLOAD
  # {
  #   "input": {
  #     "isVisible": true,
  #     "content": "test-jhay-222",
  #     "category": "test-jhay-22",
  #     "supplier": "test-jhay-22",
  #     "rating": 100,
  #         "moment": {
  #         "id": "cc854c4e-c89c-4faf-a4fe-0cc10a537b65"
  #     }
  #   }
  # }
  mutation HighlightCreate($input: HighlightInput) {
    highlightCreate(input: $input) {
      id
      isVisible
      content
      category
      supplier
      rating
      moment {
        id
      }
    }
  }
`;
