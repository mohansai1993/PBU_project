import React, { useContext } from "react";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const { handleLogin, handleGoogleSignIn } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "ron.whesley@sgvsofttech.com",
      password: "Ron@123",
      keepLogin: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      // password: Yup.string()
      //   .required("Password is required")
      //   .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleLogin({
        email: values.email,
        password: values.password,
      });
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
                    <img src={logo} alt="google" className="h-24 mx-auto" />
                  </div>
                  <div>
                    <div
                      onClick={handleGoogleSignIn}
                      className="rounded-md bg-white cursor-pointer  w-full text-primary-green text-center  py-3 my-4"
                    >
                      Login With Google
                    </div>
                    <div className="rounded-md bg-white cursor-pointer w-full text-primary-green text-center  py-3">
                      Login With Facebook(Soon)
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-16 flex-1 px-10">
                <div className="max-w-sm w-full mx-auto">
                  <div className="flex justify-between  items-center  mb-10 ">
                    <h3 className="text-black font-semibold "></h3>
                    <div className="flex ">
                      <div className="px-3 py-2 bg-primary-green  border border-primary-green text-white   ">
                        Login
                      </div>
                      <div className="px-3 py-2  border border-primary-green text-primary-green ">
                        Register
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={formik.handleSubmit}
                    >
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
                      </div>{" "}
                      <div className="w-full">
                        {" "}
                        <input
                          className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                          placeholder="password"
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
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          name="keepLogin"
                          checked={formik.values.keepLogin}
                          onChange={formik.handleChange}
                        />
                        <h4>Keep me logged In </h4>
                      </div>
                      <button className="bg-primary-green text-white py-2 rounded-md min-w-[150px]">
                        {" "}
                        Login
                      </button>
                      <div className="text-center">
                        <h4>
                          Don't have an account?{" "}
                          <Link to="/register">
                            <span className="text-primary-green">Register</span>
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

export default LoginPage;
