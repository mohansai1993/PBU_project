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
        id
      }
      coach {
        profilePicture
        firstName
        id
      }
    }
  }
`;

const Athlete = gql`
  query GetAthlete($email: String) {
    getAthlete(email: $email) {
      id
      firstName
      lastName
      email
      password
      profilePicture
      game
      createdAt
      updatedAt
      feed {
        post
        postBy
        updatedAt
      }
      contactDetails {
        number
      }
      chats {
        athlete {
          id
          firstName
          profilePicture
          lastName
        }
        chatId
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
      averageRating
      lastName
      chats {
        athlete {
          id
          firstName
          profilePicture
          lastName
        }
        chatId
      }
      sessionPlans {
        id
        duration
        forPeople
        price
        stripeProductId
        stripePriceId
        createdAt
        updatedAt
      }
      skillLevel {
        name
      }
      contactDetails {
        number
      }
      feed {
        post
        postBy
        updatedAt
      }
      openingHours {
        Sunday {
          endTime
          startTime
        }
        Monday {
          endTime
          startTime
        }
        Tuesday {
          endTime
          startTime
        }
        Wednesday {
          endTime
          startTime
        }
        Thursday {
          endTime
          startTime
        }
        Friday {
          endTime
          startTime
        }
        Saturday {
          endTime
          startTime
        }
      }
    }
  }
`;
const Couches = gql`
  query GetCoaches($pinCode: String, $coachName: String) {
    getCoaches(pinCode: $pinCode, coachName: $coachName) {
      lastName
      firstName
      id
      profilePicture
      about
      averageRating
      totalReviews
    }
  }
`;
const GetSubscriptionPlans = gql`
  query GetSubscriptionPlans {
    getSubscriptionPlans {
      id
      sessionRate
      platformFee
      ccProcessing
      amount
      name
      createdAt
      updatedAt
    }
  }
`;

const GetTop4Reviews = gql`
  query GetTop4Reviews {
    getTop4Reviews {
      about
      averageRating
      id
      lastName
      firstName
      profilePicture
    }
  }
`;
export {
  GetFeeds,
  Couch,
  Couches,
  Athlete,
  GetSubscriptionPlans,
  GetTop4Reviews,
};
