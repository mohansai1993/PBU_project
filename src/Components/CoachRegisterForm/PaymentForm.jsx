import { Field } from "formik";
import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function PaymentForm(props) {
  const {
    formField: { paymentpaln },
    plans,
  } = props;
  console.log(plans);
  return (
    <div>
      <div className="w-full my-10">
        <h1 className="font-semibold text-2xl my-10 ">Choose Your Plan</h1>
        <div className="grid  md:grid-cols-3 gap-3">
          {plans?.map((value, index) => (
            <div key={index}>
              <h3 className="text-xl  font-bold  ">
                <span className="text-primary-green capitalize">
                  {value.name.split(" ")[0]}
                </span>{" "}
                {value.name.split(" ")[1]}
              </h3>
              <ol className="flex flex-col gap-2 my-3">
                <li className="flex items-center gap-2 ">
                  <IoIosArrowDroprightCircle
                    className="text-primary-green "
                    size={20}
                  />{" "}
                  You Keep {plans[index]?.sessionRate}% of Session Rate
                </li>{" "}
                <li className="flex items-center gap-2 ">
                  <IoIosArrowDroprightCircle
                    className="text-primary-green "
                    size={20}
                  />{" "}
                  {plans[index]?.platformFee}% PBU fee
                </li>{" "}
                <li className="flex items-center gap-2 ">
                  <IoIosArrowDroprightCircle
                    className="text-primary-green "
                    size={20}
                  />{" "}
                  {plans[index]?.ccProcessing}% CC Processing
                </li>
              </ol>
              <label htmlFor={value.name} className="w-full   ">
                <Field
                  type="radio"
                  name="paymentpaln"
                  value={plans[index]?.id}
                  id={value.name}
                  className="peer peer-checked:bg-sky-500 hidden "
                />
                <div className="cursor-pointer text-center text-sm w-full bg-[#cacec9] peer-checked:bg-primary-green peer-checked:text-white  px-2 py-2   rounded">
                  ${plans[index]?.amount} a month
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
