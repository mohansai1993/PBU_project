import React, { useContext } from "react";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
function SignUpPage() {
  const { handleGoogleSignIn } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      choice: "athlete",
      firstName: "Ritik",
      lastName: "Chhipa",
      email: "ritik@gmail.com",
      password: "123456789",
      confirmPassword: "123456789",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="  ">
      <div className="flex ">
        <div className="bg-black flex-[0.3] hidden md:block "></div>
        <div className=" flex-1 relative  md:-left-[22%]">
          <div className="max-w-6xl mx-auto my-10 ">
            <div className="flex ">
              <div className="hidden md:block flex-1 bg-primary-green py-16 ">
                <div className="max-w-sm w-full mx-auto">
                  <div className="pb-16">
                    <img src={logo} className="h-24 mx-auto" />
                  </div>
                  <div>
                    <div
                      onClick={() => handleGoogleSignIn(false)}
                      className="rounded-md bg-white cursor-pointer  w-full text-primary-green text-center  py-3 my-4"
                    >
                      Register With Google
                    </div>
                    <div className="rounded-md bg-white  w-full text-primary-green text-center  py-3">
                      Register With Facebook(Soon)
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-16 flex-1 px-10">
                <div className="max-w-sm w-full mx-auto">
                  <div className="flex justify-between  items-center  mb-10 ">
                    <h3 className="text-black font-semibold "></h3>
                    <div className="flex ">
                      <div className="px-3 py-2  border border-primary-green text-primary-green ">
                        Login
                      </div>
                      <div className="px-3 py-2 bg-primary-green  border border-primary-green text-white   ">
                        Register
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <select
                        className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                        name="choice"
                        value={formik.values.choice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="athlete">Athlete</option>
                      </select>
                      <div className="flex gap-4">
                        <div className="w-full">
                          {" "}
                          <input
                            className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                            placeholder="First Name "
                            type="text"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
                            <div className="text-red-600">
                              {formik.errors.firstName}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full">
                          <input
                            className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-red-600">
                              {formik.errors.lastName}
                            </div>
                          ) : null}
                        </div>
                      </div>{" "}
                      <div className="w-full">
                        {" "}
                        <input
                          className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                          placeholder="email"
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-red-600">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex gap-4">
                        <div className="w-full">
                          {" "}
                          <input
                            className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-600">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full">
                          <input
                            className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword ? (
                            <div className="text-red-600">
                              {formik.errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-primary-green text-white py-2 rounded-md min-w-[150px]"
                      >
                        {" "}
                        Register
                      </button>
                      <div className="text-center">
                        <h4>
                          Already Member? &nbsp;
                          <Link to="/login">
                            <span className="text-primary-green">
                              Go to Login{" "}
                            </span>
                          </Link>
                        </h4>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
