import { gql } from "@apollo/client";

const PostFeed = gql`
  mutation PostFeed(
    $post: String
    $coachId: ID
    $postBy: String
    $files: [String]
    $athleteId: ID
  ) {
    postFeed(
      post: $post
      coachId: $coachId
      postBy: $postBy
      files: $files
      athleteId: $athleteId
    ) {
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
    $coachingStreet1: String
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
      coachingStreet1: $coachingStreet1
      subscriptionPlanId: $subscriptionPlanId
    ) {
      email
      userType
      token
      userId
    }
  }
`;

const EditAthlete = gql`
  mutation EditAthlete(
    $athleteId: ID
    $firstName: String
    $lastName: String
    $countryCode: Int
    $password: String
    $number: String
    $street1: String
    $street2: String
    $city: String
    $state: String
    $country: String
    $pinCode: String
    $profilePicture: String
    $game: String
  ) {
    editAthlete(
      athleteId: $athleteId
      firstName: $firstName
      lastName: $lastName
      countryCode: $countryCode
      password: $password
      number: $number
      street1: $street1
      street2: $street2
      city: $city
      state: $state
      country: $country
      pinCode: $pinCode
      profilePicture: $profilePicture
      game: $game
    ) {
      email
    }
  }
`;
const EditCoach = gql`
  mutation EditCoach(
    $profilePicture: String
    $about: String
    $game: String
    $firstName: String
    $lastName: String
    $coachingStreet1: String
    $coachingStreet2: String
    $coachingCity: String
    $coachingState: String
    $coachingCountry: String
    $coachingPinCode: String
    $coachId: ID
  ) {
    editCoach(
      profilePicture: $profilePicture
      about: $about
      game: $game
      firstName: $firstName
      lastName: $lastName
      coachingStreet1: $coachingStreet1
      coachingStreet2: $coachingStreet2
      coachingCity: $coachingCity
      coachingState: $coachingState
      coachingCountry: $coachingCountry
      coachingPinCode: $coachingPinCode
      coachId: $coachId
    ) {
      about
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

const AddChatRoom = gql`
  mutation AddChatRoom($chatId: String!, $coachId: ID!, $athleteId: ID!) {
    addChatRoom(chatId: $chatId, coachId: $coachId, athleteId: $athleteId)
  }
`;

export {
  PostFeed,
  RegisterCoach,
  EditCoach,
  EditAthlete,
  SetSlot,
  AddChatRoom,
};
