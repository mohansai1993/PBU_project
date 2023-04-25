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
    coachingStreet1,
    experience,
    faqQuestions,
  },
} = coachRegisterFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
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
    [coachingStreet1.name]: Yup.string().required(
      `${coachingStreet1.requiredErrorMsg}`
    ),
    [coachingPinCode.name]: Yup.number()
      .min(5)
      .required(`${coachingPinCode.requiredErrorMsg}`),

    [experience.name]: Yup.number()
      .positive()
      .min(1)
      .max(100)
      .required(`${experience.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [faqQuestions[0].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[1].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[2].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[3].name]: Yup.string().oneOf(["yes", "no"]).required(),
    [faqQuestions[4].name]: Yup.string().oneOf(["yes", "no"]).required(),
  }),

  Yup.object().shape({
    paymentpaln: Yup.string().required(),
  }),
];
