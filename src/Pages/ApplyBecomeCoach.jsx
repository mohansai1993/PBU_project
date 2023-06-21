import React from "react";
import "react-calendar/dist/Calendar.css";
import CoachRegister from "../Components/CoachRegisterForm/CoachRegister";

function ApplyBecomeCoach() {
  return (
    <div>
      <div className="bg-black">
        <div
          className={`bg-[url(https://d1jkfbnxwa8kir.cloudfront.net/assets/big-bg/coachingjobs_hero@2x-c9ca814c20a13109dd529a0bb482136e65a69f1b86844b840bb9e348cce0275e.jpg)] py-20 px-[20px]  bg-cover  bg-center 
`}
        >
          <h1 className="text-5xl capitalize mb-8 font-semibold leading-tight text-center  text-white  tracking-wide">
            Apply to Become a <span className="text-primary-green">PBU</span>{" "}
            Coach
          </h1>
        </div>{" "}
        <div className="container">
          <CoachRegister />
        </div>
      </div>
    </div>
  );
}

export default ApplyBecomeCoach;
