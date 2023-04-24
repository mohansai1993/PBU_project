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
      {" "}
      <div className="w-full my-10">
        <div className="grid  grid-cols-3 gap-3">
          {paymentpaln.map((value, index) => (
            <div key={index}>
              <h3 className="text-xl  font-bold  ">
                <span className="text-primary-green capitalize">PBU</span>{" "}
                {value.name}
              </h3>
              <ol className="flex flex-col gap-2 my-3">
                <li className="flex items-center gap-2 ">
                  <IoIosArrowDroprightCircle
                    className="text-primary-green "
                    size={20}
                  />{" "}
                  You Keep ${plans[index]?.sessionRate}% of Session Rate
                </li>{" "}
                <li className="flex items-center gap-2 ">
                  <IoIosArrowDroprightCircle
                    className="text-primary-green "
                    size={20}
                  />{" "}
                  ${plans[index]?.platformFee}% PBU fee
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
                <div className=" text-center text-sm w-full bg-[#cacec9] peer-checked:bg-primary-green peer-checked:text-white  px-2 py-2   rounded">
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
