import { Field } from "formik";
import React from "react";

function AvaibilityForm() {
  return (
    <div>
      <label> {"label"}</label>
      <Field
        name="label"
        as={"input"}
        className="border border-black w-full px-3 py-2 rounded-md "
      />
    </div>
  );
}

export default AvaibilityForm;
