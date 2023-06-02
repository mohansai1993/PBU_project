import { ErrorMessage, Field } from "formik";
import React from "react";

function BackgroundInfoForm(props) {
  const {
    formField: {
      skillLevel,
      experience,
      document,
      coachingCity,
      coachingState,
      coachingCountry,
      coachingPinCode,
      coachingStreet,
    },
  } = props;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="w-full">
          {" "}
          <label> {skillLevel.label}</label>
          <Field
            name={skillLevel.name}
            as={"select"}
            placeholder="select skill"
            className="border border-black w-full px-3 py-2 rounded-md "
          >
            {skillLevel.value.map((value, index) => (
              <option value={value.value} key={index}>
                {value.name}
              </option>
            ))}
          </Field>
        </div>{" "}
        <div className="w-full">
          <label> {coachingCity.label}</label>
          <Field
            name={coachingCity.name}
            placeholder={coachingCity.placeholder}
            // as={"input"}
            type="text"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={coachingCity.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {coachingState.label}</label>
          <Field
            name={coachingState.name}
            placeholder={coachingState.placeholder}
            // as={"input"}
            type="text"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={coachingState.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {coachingCountry.label}</label>
          <Field
            name={coachingCountry.name}
            placeholder={coachingCountry.placeholder}
            // as={"input"}
            type="text"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={coachingCountry.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {coachingPinCode.label}</label>
          <Field
            name={coachingPinCode.name}
            placeholder={coachingPinCode.placeholder}
            // as={"input"}
            type="number"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={coachingPinCode.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {coachingStreet.label}</label>
          <Field
            name={coachingStreet.name}
            placeholder={coachingStreet.placeholder}
            // as={"input"}
            type="text"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={coachingStreet.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {experience.label}</label>
          <Field
            name={experience.name}
            placeholder={experience.placeholder}
            // as={"input"}
            type="number"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={experience.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {document.label}</label>
          <Field
            name={document.name}
            placeholder={document.placeholder}
            type="file"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          {/* <ErrorMessage
            name={document.name}
            component="div"
            className="text-red-500"
          /> */}
        </div>{" "}
      </div>
    </div>
  );
}

export default BackgroundInfoForm;
