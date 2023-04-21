import { gql } from "@apollo/client";

const GetFeeds = gql`
  query GetFeeds {
    getFeeds {
      createdAt
      id
      post
      postBy
      updatedAt
      files
      athlete {
        profilePicture
        firstName
      }
      coach {
        profilePicture
        firstName
      }
    }
  }
`;

const Couch = gql`
  query GetCoach($coachId: ID) {
    getCoach(coachId: $coachId) {
      about
      createdAt
      document
      email
      firstName
      id
      profilePicture
      lastName
      skillLevel {
        name
      }
    }
  }
`;
export { GetFeeds, Couch };
