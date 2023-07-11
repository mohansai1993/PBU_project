// eslint-disable-next-line import/no-anonymous-default-export
export default {
  formId: "coachForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First name",
      requiredErrorMsg: "First name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last name",
      requiredErrorMsg: "Last name is required",
    },
    password: {
      name: "password",
      label: "Password",
      requiredErrorMsg: "Password is required",
    },
    email: {
      name: "email",
      label: "Email",
      requiredErrorMsg: "email is required",
    },

    // Form 2
    coachingCity: {
      name: "coachingCity",
      label: "City",
      requiredErrorMsg: " City is required",
    },
    coachingState: {
      name: "coachingState",
      label: "State ",
      requiredErrorMsg: "State is required",
    },
    coachingCountry: {
      name: "coachingCountry",
      label: "Country",
      requiredErrorMsg: "Country is required",
    },
    coachingPinCode: {
      name: "coachingPinCode",
      label: "Zip Code",
      requiredErrorMsg: "Zip Code is required",
    },

    coachingStreet: {
      name: "coachingStreet",
      label: "Street",
      requiredErrorMsg: "Street is required",
    },
    areYouCertified: {
      name: "areYouCertified",
      label: "Are You Certified?",
      requiredErrorMsg: "Option is required",
    },

    skillLevel: {
      name: "skillLevel",
      label: "Skill Level",
      value: [
        {
          name: "Level 1 ",
          value: "level1",
        },
        {
          name: "Level 2 ",
          value: "level2",
        },
        {
          name: "Level 3 ",
          value: "level3",
        },
      ],
      requiredErrorMsg: "Level is required",
    },
    experience: {
      name: "experience",
      label: "Years of experience",
      requiredErrorMsg: "experience is required",
    },
    document: {
      name: "document",
      label: "Upload Proof of Certification (if certified)",
      requiredErrorMsg: "Document is is required",
    },
    faq2Text: {
      name: "faq2Text",
      label: "Please Explain",
      requiredErrorMsg: "You need to explain",
    },

    faqQuestions: [
      {
        name: "faq2",
        label: "Do You have criminal Record? *",
        isText: true,
        requiredErrorMsg: "required",
      },
      {
        name: "faq3",
        label:
          "PBallU is not liable for costs associated with any injuries that occur during the time you are training them. You are liable to ensure the health and safety of anyone you train. Do you understand? Our History*",
        requiredErrorMsg: "required",
      },
      {
        name: "faq4",
        label:
          "All sessions with clients must be booked through PBallU. Failure to adhere to this will lead to your coaching account terminated on PBallU and both of us missing put on an profitable partnership. Will you are adhere to this principal? *",
        requiredErrorMsg: "required",
      },
      {
        name: "faq5",
        label: "I have answered all questions honestly.*",
        requiredErrorMsg: "required",
      },
    ],

    // Form 3
    paymentpaln: [
      {
        name: "Beginner",
      },
      {
        name: "Intermediate",
      },
      {
        name: "Pro",
      },
    ],

    //Form 4
    loginOption: {
      name: "loginOption",
      requiredErrorMsg: "Please select a login option",
    },
  },
};
