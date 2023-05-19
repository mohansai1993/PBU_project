import { ErrorMessage, Field } from "formik";
import React from "react";

function AuthForm(props) {
  const {
    formField: { password, loginOption },
  } = props;
  return (
    <div>
      <div className="my-5 max-w-md mx-auto ">
        <div>
          <div>
            <Field
              as="select"
              id="loginOption"
              name={loginOption.name}
              className="rounded-md bg-primary-green text-white cursor-pointer w-full  text-center  py-3"
            >
              <option value="">Select an option</option>
              <option value="google">Register With Google</option>
              <option value="facebook">Register With Facebook</option>
              <option value="password">Register With Password</option>
            </Field>
            <ErrorMessage
              name={loginOption.name}
              component="div"
              className="error"
            />
          </div>
        </div>

        {props.values.loginOption === "password" && <div> </div>}
      </div>
    </div>
  );
}

export default AuthForm;
