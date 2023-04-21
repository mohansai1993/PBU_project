import { ErrorMessage, Field } from "formik";
import React from "react";

function BasicInfoForm(props) {
  const {
    formField: { firstName, lastName, email, password },
  } = props;
  console.log(firstName);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="w-full">
          <label>{firstName.label}</label>
          <input name={firstName.name}></input>
        </div>{" "}
      </div>
    </div>
  );
}

export default BasicInfoForm;
