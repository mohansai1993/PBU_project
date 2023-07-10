import * as Yup from "yup";
import coachRegisterFormModel from "./coachRegister";
const {
  formField: {
    firstName,
    lastName,
    email,
    password,
    coachingCity,
    coachingState,
    coachingCountry,
    coachingPinCode,
    coachingStreet,
    skillLevel,
    experience,
    faqQuestions,
    loginOption,
    document,
    areYouCertified,
    faq2Text,
  },
} = coachRegisterFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [loginOption.name]: Yup.string().required(
      `${loginOption.requiredErrorMsg}`
    ),
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [coachingCity.name]: Yup.string().required(
      `${coachingCity.requiredErrorMsg}`
    ),
    [coachingState.name]: Yup.string().required(
      `${coachingState.requiredErrorMsg}`
    ),
    [coachingCountry.name]: Yup.string().required(
      `${coachingCountry.requiredErrorMsg}`
    ),
    [skillLevel.name]: Yup.string().required(`${skillLevel.requiredErrorMsg}`),
    [coachingStreet.name]: Yup.string().required(
      `${coachingStreet.requiredErrorMsg}`
    ),
    [coachingPinCode.name]: Yup.number()
      .min(5)
      .required(`${coachingPinCode.requiredErrorMsg}`),

    [experience.name]: Yup.number()
      .positive()
      .min(1)
      .max(100)
      .required(`${experience.requiredErrorMsg}`),
    [areYouCertified.name]: Yup.string().required(
      `${areYouCertified.requiredErrorMsg}`
    ),
    [document.name]: Yup.string().when("areYouCertified", {
      is: (val) => val === "yes",
      then: () => Yup.string().required(`${document.requiredErrorMsg}`),
    }),
  }),
  Yup.object().shape({
    [faqQuestions[0].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[1].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[2].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[3].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faq2Text.name]: Yup.string().when(faqQuestions[0].name, {
      is: (val) => val === "yes",
      then: () =>
        Yup.string().min(100).required(`${faq2Text.requiredErrorMsg}`),
    }),
  }),

  Yup.object().shape({
    paymentpaln: Yup.string().required(),
  }),
  Yup.object().shape({
    [loginOption.name]: Yup.string().required("Please select a login option"),
  }),
];
