import { gql } from "@apollo/client";

const PostFeed = gql`
  mutation PostFeed($post: String, $coachId: ID, $postBy: String) {
    postFeed(post: $post, coachId: $coachId, postBy: $postBy) {
      post
      postBy
      updatedAt
    }
  }
`;

export { PostFeed };
