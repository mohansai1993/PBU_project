import { ErrorMessage, Field } from "formik";
import React from "react";

function FaqQuestionsForm(props) {
  const {
    formField: { faqQuestions },
  } = props;
  return (
    <div>
      <div className="w-full">
        {faqQuestions.map((question, index) => (
          <div key={index}>
            <label className="font-semibold">
              {index + 1 + "." + question.label}
            </label>
            <div className="grid grid-cols-2 gap-3 mb-7 mt-3 ">
              <label htmlFor={question.name + index} className="w-full   ">
                <Field
                  type="radio"
                  name={question.name}
                  value="yes"
                  id={question.name + index}
                  className="peer peer-checked:bg-sky-500 hidden "
                />
                <div className="w-full bg-[#cacec9] peer-checked:bg-primary-green peer-checked:text-white  px-2 py-2   rounded">
                  Yes
                </div>
              </label>
              <label
                htmlFor={question.name + index + 1}
                className="w-full peer-checked:bg-sky-500 "
              >
                <Field
                  type="radio"
                  name={question.name}
                  value="no"
                  id={question.name + index + 1}
                  className="peer peer-checked:bg-sky-500 hidden"
                />
                <div className="w-full bg-[#cacec9] peer-checked:bg-primary-green peer-checked:text-white  px-2 py-2   rounded">
                  No
                </div>
              </label>
              <ErrorMessage
                name={question.name}
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqQuestionsForm;
