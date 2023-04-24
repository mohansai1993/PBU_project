import { ErrorMessage, Field } from "formik";
import React from "react";

function BasicInfoForm(props) {
  const {
    formField: { firstName, lastName, email, password },
  } = props;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="w-full">
          {" "}
          <label> {firstName.label}</label>
          <Field
            name={firstName.name}
            label={firstName.label}
            as={"input"}
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={firstName.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {lastName.label}</label>
          <Field
            name={lastName.name}
            placeholder={lastName.placeholder}
            as={"input"}
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={lastName.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {email.label}</label>
          <Field
            name={email.name}
            placeholder={email.placeholder}
            as={"input"}
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={email.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
        <div className="w-full">
          <label> {password.label}</label>
          <Field
            name={password.name}
            placeholder={password.placeholder}
            as={"input"}
            className="border border-black w-full px-3 py-2 rounded-md "
          />
          <ErrorMessage
            name={password.name}
            component="div"
            className="text-red-500"
          />
        </div>{" "}
      </div>
    </div>
  );
}

export default BasicInfoForm;
