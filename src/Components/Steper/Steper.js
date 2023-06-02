import React from "react";
import clock_white from "../../assets/form/clock-white.png";
import payment_white from "../../assets/form/payment-white.png";
import price_white from "../../assets/form/price-white.png";
function Stepper({ step }) {
  return (
    <div className="flex justify-between">
      {step.map((steps, index) => (
        <div
          key={index}
          className="bg-primary-green rounded-md  w-fit  min-w-[150px]"
        >
          <div className="py-3 ">
            <div className="flex justify-center">{steps.icon}</div>
            <div className="text-white text-center ">{steps.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
