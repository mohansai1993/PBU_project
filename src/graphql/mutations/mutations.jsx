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
    $coachingStreet: String
    $subscriptionPlanId: ID
    $googleId: String
    $facebookId: String
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
      googleId: $googleId
      facebookId: $facebookId
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
    $password: String
    $profilePicture: String
    $game: String
  ) {
    editAthlete(
      athleteId: $athleteId
      firstName: $firstName
      lastName: $lastName
      password: $password
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
    $coachId: ID
    $street: String
    $city: String
    $state: String
    $country: String
    $pinCode: String
    $coachingExperience: String
    $highlights: String
  ) {
    editCoach(
      profilePicture: $profilePicture
      about: $about
      game: $game
      firstName: $firstName
      lastName: $lastName
      coachId: $coachId
      street: $street
      city: $city
      state: $state
      country: $country
      pinCode: $pinCode
      coachingExperience: $coachingExperience
      highlights: $highlights
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

const CreateSessionPlan = gql`
  mutation CreateSessionPlan(
    $forPeople: Int
    $duration: Int
    $price: Float
    $coachId: ID
  ) {
    createSessionPlan(
      forPeople: $forPeople
      duration: $duration
      price: $price
      coachId: $coachId
    ) {
      about
    }
  }
`;
const AddChatRoom = gql`
  mutation AddChatRoom($chatId: String!, $coachId: ID!, $athleteId: ID!) {
    addChatRoom(chatId: $chatId, coachId: $coachId, athleteId: $athleteId)
  }
`;

const DeletePost = gql`
  mutation DeletePost($postId: ID) {
    deletePost(postId: $postId)
  }
`;

const AddCoaching = gql`
  mutation AddCoachingLocation(
    $coachId: ID
    $coachingStreet: String
    $coachingCity: String
    $coachingState: String
    $coachingCountry: String
    $coachingPinCode: String
    $coachingLocation: LocationInput
  ) {
    addCoachingLocation(
      coachId: $coachId
      coachingStreet: $coachingStreet
      coachingCity: $coachingCity
      coachingState: $coachingState
      coachingCountry: $coachingCountry
      coachingPinCode: $coachingPinCode
      coachingLocation: $coachingLocation
    ) {
      about
    }
  }
`;

const RemoveCoachingLocation = gql`
  mutation RemoveCoachingLocation($coachId: ID, $coachingLocationId: ID) {
    removeCoachingLocation(
      coachId: $coachId
      coachingLocationId: $coachingLocationId
    ) {
      about
    }
  }
`;
const RegisterAthlete = gql`
  mutation RegisterAthlete(
    $firstName: String
    $lastName: String
    $email: String
    $googleId: String
    $password: String
    $facebookId: String
    $game: String
  ) {
    registerAthlete(
      firstName: $firstName
      lastName: $lastName
      email: $email
      googleId: $googleId
      password: $password
      facebookId: $facebookId
      game: $game
    ) {
      email
      userType
      token
      userId
    }
  }
`;

const Login = gql`
  mutation Login(
    $email: String
    $password: String
    $googleId: String
    $facebookId: String
  ) {
    login(
      email: $email
      password: $password
      googleId: $googleId
      facebookId: $facebookId
    ) {
      email
      userType
      token
      userId
    }
  }
`;

const BookSession = gql`
  mutation BookSession(
    $athleteId: ID
    $coachId: ID
    $sessionDate: Date
    $sessionPlanId: ID
    $startTime: Int
  ) {
    bookSession(
      athleteId: $athleteId
      coachId: $coachId
      sessionDate: $sessionDate
      sessionPlanId: $sessionPlanId
      startTime: $startTime
    )
  }
`;

const PaySubscription = gql`
  mutation PaySubscription(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $googleId: String
    $facebookId: String
    $subscriptionPlanId: ID
    $skillLevelId: ID
    $coachingCity: String
    $coachingStreet: String
    $coachingState: String
    $coachingCountry: String
    $coachingPinCode: String
    $coachingLocation: LocationInput
    $document: String
    $game: String
    $experience: Float
  ) {
    paySubscription(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      googleId: $googleId
      facebookId: $facebookId
      subscriptionPlanId: $subscriptionPlanId
      skillLevelId: $skillLevelId
      coachingCity: $coachingCity
      coachingStreet: $coachingStreet
      coachingState: $coachingState
      coachingCountry: $coachingCountry
      coachingPinCode: $coachingPinCode
      coachingLocation: $coachingLocation
      document: $document
      game: $game
      experience: $experience
    )
  }
`;

const PaySession = gql`
  mutation PaySession(
    $athleteId: ID
    $coachId: ID
    $sessionDate: Date
    $sessionPlanId: ID
    $startTime: Int
  ) {
    paySession(
      athleteId: $athleteId
      coachId: $coachId
      sessionDate: $sessionDate
      sessionPlanId: $sessionPlanId
      startTime: $startTime
    )
  }
`;
const CommentOnPost = gql`
  mutation CommentOnPost(
    $comment: String
    $athleteId: ID
    $coachId: ID
    $commentBy: String
    $feedId: ID
  ) {
    commentOnPost(
      comment: $comment
      athleteId: $athleteId
      coachId: $coachId
      commentBy: $commentBy
      feedId: $feedId
    ) {
      id
      post
      createdAt
      updatedAt
    }
  }
`;
const PostFeedback = gql`
  mutation PostFeedback($rating: Float, $sessionId: ID, $review: String) {
    postFeedback(rating: $rating, sessionId: $sessionId, review: $review) {
      id
      rating
      review
    }
  }
`;
export {
  PostFeed,
  RegisterCoach,
  EditCoach,
  EditAthlete,
  SetSlot,
  AddChatRoom,
  DeletePost,
  AddCoaching,
  RegisterAthlete,
  RemoveCoachingLocation,
  Login,
  CreateSessionPlan,
  BookSession,
  PaySubscription,
  PaySession,
  CommentOnPost,
  PostFeedback,
};
