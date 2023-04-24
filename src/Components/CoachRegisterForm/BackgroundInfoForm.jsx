import { ErrorMessage, Field } from "formik";
import React from "react";

function BackgroundInfoForm(props) {
  const {
    formField: { skillLevel, traningCity, experience, document },
  } = props;
  console.log(props.formField);
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
          <label> {traningCity.label}</label>
          <Field
            name={traningCity.name}
            placeholder={traningCity.placeholder}
            // as={"input"}
            type="text"
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={traningCity.name}
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
