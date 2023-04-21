import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TbUserSearch } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineMoreTime, MdPayments } from "react-icons/md";
import Stepper from "../Steper/Steper";
import coachRegisterFormModel from "./FormModal/coachRegister";
import validationSchema from "./FormModal/coachRegister";
import BasicInfoForm from "./BasicInfoForm";
import { Form, Formik } from "formik";
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
    title: "Shipping details",
    icon: <GiReceiveMoney size={30} color="#FFF" />,
  },
  {
    title: "Availability",
    icon: <MdOutlineMoreTime size={30} color="#FFF" />,
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
  password: 123456789,
  countryCode: 91,
  number: 91001586400,
  street1: null,
  street2: null,
  city: null,
  state: null,
  country: null,
  pinCode: null,
  subscriptionPlanId: null,
  skillLevelId: null,
  coachingStreet1: null,
  coachingStreet2: null,
  coachingCity: null,
  coachingState: null,
  coachingCountry: null,
  document: null,
  coachingPinCode: null,
};
const { formId, formField } = coachRegisterFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfoForm formField={formField} />;
    // case 1:
    //   return <PaymentForm formField={formField} />;
    // case 2:
    //   return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}
function CoachRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
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
            // initialValues={formInitialValues}
            // validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div>
                  {activeStep !== 0 && (
                    <button
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
                    {/* {isSubmitting && <CircularProgress size={24} />} */}
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
