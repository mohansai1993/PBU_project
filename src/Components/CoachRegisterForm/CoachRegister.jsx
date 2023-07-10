import React, { useContext, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TbUserSearch } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import Stepper from "../Steper/Steper";
import coachRegisterFormModel from "./FormModal/coachRegister";
import validationSchema from "./FormModal/validation";
import BasicInfoForm from "./BasicInfoForm";
import { Form, Formik } from "formik";
import BackgroundInfoForm from "./BackgroundInfoForm";
import FaqQuestionsForm from "./FaqQuestionsForm";
import PaymentForm from "./PaymentForm";
import { GetSubscriptionPlans } from "../../graphql/query/Query";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { uploadImage, uploadImageFirebase } from "../../config/api";

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
  loginOption: "password",
  firstName: "Ritik ",
  lastName: "Chhipa",
  email: "ritikus@gmail.com",
  password: "12346789",
  countryCode: 1,
  number: 91001586400,
  googleId: null,
  facebookId: null,
  //Form 2
  skillLevel: "",
  coachingCity: "Whiteville",
  coachingState: "North Carolina",
  coachingCountry: "United States",
  coachingPinCode: 28472,
  coachingStreet: "34, Malviya Nagar",
  experience: 21,
  document: "",
  areYouCertified: "no",
  //Form 3
  faq2: "",
  faq2Text: "fgdhfgdjhghsdjfgjh",
  faq3: "",
  faq4: "",
  faq5: "",
  paymentpaln: "",
  //Form 4
};
const { formId, formField } = coachRegisterFormModel;

function CoachRegister() {
  const [activeStep, setActiveStep] = useState(2);
  const [File, setFile] = useState(null);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { data: getSubscriptionPlans } = useQuery(GetSubscriptionPlans);

  const { handleRegisterCoach, handleGoogleSignIn } = useContext(AuthContext);

  function _renderStepContent(step, values, setFieldValue) {
    switch (step) {
      case 0:
        return <BasicInfoForm formField={formField} values={values} />;
      case 1:
        return (
          <BackgroundInfoForm
            formField={formField}
            values={values}
            setFieldValue={setFieldValue}
            setFile={setFile}
          />
        );
      case 2:
        return (
          <FaqQuestionsForm
            formField={formField}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
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

  async function _submitForm(values, actions) {
    actions.setSubmitting(true);
    const formData = new FormData();
    formData.append("file", File);
    try {
      // var path = await uploadImage(formData);
      // path = path.data?.fileName;
      var path = await uploadImageFirebase(File);
      console.log(path);
      actions.setFieldValue("document", path);
    } catch (err) {
      console.log(err);
      path = null;
    }

    if (!File) {
      path = null;
    }
    console.log(values);
    try {
      if (values.loginOption === "password") {
        // let data = await handleRegisterCoach({
        //   values: {
        //     ...values,
        //     coachingPinCode: String(values.coachingPinCode),
        //     subscriptionPlanId: values.paymentpaln,
        //     skillLevelId: values.skillLevel,
        //     experience: Number(values.experience),
        //     document: path,
        //   },
        // });
        console.log({
          values: {
            ...values,
            coachingPinCode: String(values.coachingPinCode),
            subscriptionPlanId: values.paymentpaln,
            skillLevelId: values.skillLevel,
            experience: Number(values.experience),
            document: path,
          },
        });
      } else if (values.loginOption === "google") {
        handleGoogleSignIn({
          values: {
            ...values,
            coachingPinCode: String(values.coachingPinCode),
            subscriptionPlanId: values.paymentpaln,
            skillLevelId: values.skillLevel,
            experience: Number(values.experience),
            document: path,
            password: null,
          },
          isCoach: true,
          isLogin: false,
        });
      } else {
        console.log(JSON.stringify(values, null, 2));
      }

      console.log(JSON.stringify(values, null, 2));

      actions.setSubmitting(false);
    } catch (err) {
      console.log(err);
      actions.setSubmitting(false);
    }
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
      <div className="py-10">
        <Stepper step={steps} />
      </div>
      <div className="bg-white p-5">
        <div>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, values, setFieldValue)}

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
                      {isLastStep ? "Save" : "Next"}
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
