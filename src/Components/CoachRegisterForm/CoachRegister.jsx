import React, { useContext, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TbUserSearch } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineMoreTime, MdPayments } from "react-icons/md";
import Stepper from "../Steper/Steper";
import coachRegisterFormModel from "./FormModal/coachRegister";
import validationSchema from "./FormModal/validation";
import BasicInfoForm from "./BasicInfoForm";
import { Form, Formik, useFormikContext } from "formik";
import BackgroundInfoForm from "./BackgroundInfoForm";
import FaqQuestionsForm from "./FaqQuestionsForm";
import PaymentForm from "./PaymentForm";
import { GetSubscriptionPlans } from "../../graphql/query/Query";
import { useMutation, useQuery } from "@apollo/client";
import { RegisterCoach } from "../../graphql/mutations/mutations";
import AvaibilityForm from "./AvaibilityForm";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthForm from "./FormModal/AuthForm";
const steps = [
  {
    title: "Basic Information",
    icon: <BsInfoCircle size={30} color="#FFF" />,
  },
  {
    title: "Background",
    icon: <TbUserSearch size={30} color="#FFF" />,
  },
  {
    title: "Questions",
    icon: <GiReceiveMoney size={30} color="#FFF" />,
  },
  {
    title: "Payment details",
    icon: <MdPayments size={30} color="#FFF" />,
  },
];

let formInitialValues = {
  firstName: "Ritik ",
  lastName: "Chhipa",
  email: "ritik@gmail.com",
  password: "123456789",
  countryCode: 91,
  number: 91001586400,
  googleId: null,
  facebookId: null,
  //Form 2
  skillLevel: "level1",
  coachingCity: "Jaipur",
  coachingState: "Rajasthan",
  coachingCountry: "India",
  coachingPinCode: 312001,
  coachingStreet: "ashok nagar",
  experience: 21,
  document: "",
  //Form 3
  faq1: "",
  faq2: "",
  faq3: "",
  faq4: "",
  faq5: "",
  paymentpaln: "",
  //Form 4
};
const { formId, formField } = coachRegisterFormModel;

function CoachRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [registerCoach, { error }] = useMutation(RegisterCoach);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { data: getSubscriptionPlans } = useQuery(GetSubscriptionPlans);

  const { handleRegisterCoach, handleGoogleSignIn } = useContext(AuthContext);
  function _renderStepContent(step, values) {
    switch (step) {
      case 0:
        return <BasicInfoForm formField={formField} values={values} />;
      case 1:
        return <BackgroundInfoForm formField={formField} />;
      case 2:
        return <FaqQuestionsForm formField={formField} />;
      case 3:
        return (
          <PaymentForm
            formField={formField}
            plans={getSubscriptionPlans?.getSubscriptionPlans || []}
          />
        );

      default:
        return <div>Not Found</div>;
    }
  }
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    if (values.loginOption === "password") {
      handleRegisterCoach({ values });
    } else if (values.loginOption === "google") {
      handleGoogleSignIn({
        values: { ...values, password: null },
        isCoach: true,
      });
    } else {
      console.log(JSON.stringify(values, null, 2));
    }
    // .then((res) => {
    //   console.log(res);
    //   alert("Now,You are the coach");
    //   navigate("/coach/" + res.id);
    // })
    // .catch(() => {
    //   alert(error.graphQLErrors[0].message);
    // });

    actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
    <>
      <Stepper step={steps} />
      <div className="bg-white p-5">
        <div>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, values)}

                <div className="flex justify-center gap-3 mt-5">
                  {activeStep !== 0 && (
                    <button
                      type="button"
                      onClick={_handleBack}
                      className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                    >
                      Back
                    </button>
                  )}
                  <div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default CoachRegister;
