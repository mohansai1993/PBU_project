import React from "react";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
function LoginPage() {
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
                    <div className="rounded-md bg-white  w-full text-primary-green text-center  py-3 my-4">
                      Register With Google
                    </div>
                    <div className="rounded-md bg-white  w-full text-primary-green text-center  py-3">
                      Register With Facebook
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-16 flex-1 px-10">
                <div className="max-w-sm w-full mx-auto">
                  <div className="flex justify-between  items-center  mb-10 ">
                    <h3 className="text-black font-semibold ">
                      {" "}
                      Login for Athlete
                    </h3>
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
                    <form className="flex flex-col gap-4">
                      <input
                        className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                        placeholder="Email"
                        type="email"
                      />{" "}
                      <input
                        className="placeholder:text-primary-green border px-3 py-2 rounded-md border-primary-green w-full"
                        placeholder="Password"
                        type="password"
                      />
                      <div className="flex gap-2">
                        <input type="checkbox" />
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
