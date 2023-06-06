import React from "react";
import bg_01 from "../assets/bg-01.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
function BecomeCoach() {
  return (
    <div>
      <div>
        <div
          className={`bg-[url(https://d1jkfbnxwa8kir.cloudfront.net/assets/big-bg/coachingjobs_hero@2x-c9ca814c20a13109dd529a0bb482136e65a69f1b86844b840bb9e348cce0275e.jpg)] py-20 px-[20px]  bg-cover  bg-center 
`}
        >
          <h1 className="text-5xl capitalize mb-8 font-semibold leading-tight text-center  text-white  tracking-wide">
            Pickleball <span className="text-primary-green">Coaching</span>
          </h1>
          <p
            className="text-center
          text-white "
          >
            PBU is looking for certified pickleball coaches to join our national
            team of <br></br>talented and enthusiastic pickleball trainers
            dedicated to helping players grow <br></br>in their skill and love
            of the sport.
          </p>
        </div>
        <div className="container">
          <div className="flex">
            <img src="https://img.freepik.com/free-photo/paralyzed-asian-employee-working-call-center-reception-disability-friendly-office-female-operator-wheelchair-user-with-impairment-giving-assistance-customer-service-helpline_482257-43001.jpg" />
            <div className="bg-white p-4 rounded-md">
              <h3 className="text-2xl font-bold  py-5">
                PBU&nbsp;<span className="text-primary-green">Provides</span>
              </h3>
              <div className="mb-10">
                <ol className="flex flex-col gap-7">
                  <li className="flex items-center gap-2 ">
                    <IoIosArrowDroprightCircle
                      className="text-primary-green "
                      size={20}
                    />{" "}
                    The opportunity to control your work schedule
                  </li>
                  <li className="flex items-center gap-2 ">
                    <IoIosArrowDroprightCircle
                      className="text-primary-green "
                      size={20}
                    />{" "}
                    The ability to set your own hourly rate (Coaches earn an
                    average of $45/hour)
                  </li>
                  <li className="flex items-center gap-2 ">
                    <IoIosArrowDroprightCircle
                      className="text-primary-green "
                      size={20}
                    />{" "}
                    Option to choose your own subscription plan based on your
                    preferences
                  </li>{" "}
                  <li className="flex items-center gap-2 ">
                    <IoIosArrowDroprightCircle
                      className="text-primary-green "
                      size={20}
                    />{" "}
                    A fixed rate of revenue sharing that beats competitors rates
                    so both coaches and PBallU thrive together
                  </li>{" "}
                </ol>
              </div>
              <Link className="pt-3" to="/become/coach/apply">
                <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px]">
                  Become Coach
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeCoach;
