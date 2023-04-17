import React from "react";

import sunset from "../assets/sunset.jpg";
import DialogModal from "../Components/Modal/DialogModal";
function CourtsPage() {
  return (
    <div>
      <div>
        <div
          className={`bg-[url(${sunset})] py-20 px-[20px]  bg-cover  bg-center 
`}
        >
          {/* Form Container */}
          <div className=" text-black  max-w-3xl  mx-auto">
            <div className="px-8 py-10 rounded-lg  bg-[#212F48] bg-opacity-80 ">
              <h1 className="text-5xl capitalize mb-8 font-semibold leading-tight text-center  text-white  tracking-wide">
                Search <span className="text-primary-green">court</span> Near By
                you
              </h1>
              <form className="flex flex-col gap-3">
                <div className="flex justify-between  items-center  flex-wrap">
                  <input
                    type="search"
                    name="q"
                    className="py-2 text-sm w-full   rounded-md pl-10 focus:outline-none placeholder:text-primary-gray  "
                    placeholder="Search Coach by Name"
                    autoComplete="off"
                  />
                </div>

                <div className="flex justify-center  ">
                  <button className=" bg-primary-green rounded-md  px-10 text-white py-2">
                    Search Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>{" "}
        <div className="bg-primary-green">
          <div className="container py-10 ">
            <iframe
              id="gmap_canvas"
              width={"100%"}
              height={"600px"}
              className="rounded-md"
              src="https://maps.google.com/maps?q=california&t=&z=10&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>
      <DialogModal />
    </div>
  );
}

export default CourtsPage;
