import React from "react";
import { ErrorMessage, Field } from "formik";
export function TextField({
  name,
  placeholder,
  label = null,
  isRequired = true,
  htmlType = "text",
  input = "input",
  onChange = null,
  color = "black",
  props,
}) {
  return (
    <div className="flex-1">
      {" "}
      <div className="my-3">
        {label && (
          <div className="mb-2">
            <label style={{ color: color }}>
              {label}
              <span className="text-red-500">&nbsp;{isRequired && "*"}</span>
            </label>
          </div>
        )}
        <Field name={name} {...props}>
          {({ field }) =>
            input === "input" ? (
              <input
                placeholder={placeholder}
                {...field}
                type={htmlType}
                onChange={htmlType === "file" ? onChange : null}
                className="border border-black w-full px-3 py-2 rounded-md text-black"
              />
            ) : (
              <textarea
                placeholder={placeholder}
                {...field}
                type={htmlType}
                className="border border-black w-full px-3 py-2 rounded-md "
              />
            )
          }
        </Field>
        <div className="text-red-500 text-xs mt-1">
          {" "}
          <ErrorMessage name={name} component={"div"} />
        </div>
      </div>
    </div>
  );
}
