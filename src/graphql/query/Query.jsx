import { gql } from "@apollo/client";

const GetFeeds = gql`
  query GetFeeds($pageNumber: Int) {
    getFeeds(pageNumber: $pageNumber) {
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
      sessions {
        startTime
        sessionDate
        id
        coach {
          id
          firstName
          lastName
          profilePicture
        }
        sessionPlan {
          duration
          price
          createdAt
        }
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
      sessions {
        startTime
        sessionDate
        id
        coach {
          id
          firstName
          lastName
          profilePicture
        }
        sessionPlan {
          duration
          price
        }
      }
      sessionPlans {
        duration
        forPeople
        id
        price
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
        city
        country
        state
        pinCode
        street
      }
      feed {
        id
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
      game
      coachingLocation {
        id
        street
        city
        state
        country
        pinCode
        location {
          latitude
          longitude
        }
        createdAt
        updatedAt
      }
      coachingExperience
      highlights
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
      firstName
      lastName
      id
      averageRating
      about
      profilePicture
      experience
      coachingLocation {
        city
        id
        country
        location {
          latitude
          longitude
        }
        pinCode
        state
        street
      }
    }
  }
`;
const GetCourts = gql`
  query GetCourts($pinCode: String, $city: String) {
    getCourts(pinCode: $pinCode, city: $city) {
      id
      street
      city
      state
      country
      pinCode
      location {
        latitude
        longitude
      }
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
  GetCourts,
};
