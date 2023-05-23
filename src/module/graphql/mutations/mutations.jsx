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

const RegisterCoach = gql`
  mutation RegisterCoach(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $skillLevelId: ID
    $coachingCity: String
    $coachingState: String
    $coachingCountry: String
    $coachingPinCode: String
    $document: String
    $coachingStreet: String
    $subscriptionPlanId: ID
  ) {
    registerCoach(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      skillLevelId: $skillLevelId
      coachingCity: $coachingCity
      coachingState: $coachingState
      coachingCountry: $coachingCountry
      coachingPinCode: $coachingPinCode
      document: $document
      coachingStreet: $coachingStreet
      subscriptionPlanId: $subscriptionPlanId
    ) {
      email
      userType
      token
    }
  }
`;

const SetSlot = gql`
  mutation SetSlot($coachId: ID, $openingHours: OpeningHoursInput) {
    setSlot(coachId: $coachId, openingHours: $openingHours) {
      createdAt
      about
    }
  }
`;

const RemoveSessionPlan = gql`
  mutation RemoveSessionPlan($coachId: ID, $planId: ID) {
    removeSessionPlan(coachId: $coachId, planId: $planId) {
      about
    }
  }
`;

export { PostFeed, RegisterCoach, SetSlot, RemoveSessionPlan };
