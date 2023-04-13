import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoNavigate, IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import bg_01 from "../assets/bg-01.png";
import Slider from "../Components/Slider/Slider";
function HomePage() {
  return (
    <div>
      {/* //Hero Section */}
      <div>
        <div
          className={`bg-[url(${bg_01})] py-20 px-[20px]  bg-cover  bg-center 
`}
        >
          <div className="max-w-2xl   mx-auto ">
            <h1 className="text-5xl capitalize mb-16 font-semibold leading-tight  text-white  tracking-wide">
              Find <span className="text-primary-green">PBU</span> Coach
              <br></br>Near You ...
            </h1>

            {/* Form Container */}
            <div className=" text-white ">
              <div className="px-8 py-10 rounded-lg  bg-primary-green bg-opacity-40 ">
                <h3 className="mb-4">Search of PBU Coach Here</h3>
                <form className="flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between  items-center  flex-wrap">
                      <label>Search Coach by Name:</label>
                      <div className="relative text-gray-600 rounded-md ">
                        <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
                          <FiSearch size={25} className="text-primary-green" />
                        </span>
                        <input
                          type="search"
                          name="q"
                          className="py-2 text-sm   rounded-md pl-10 focus:outline-none placeholder:text-primary-gray  "
                          placeholder="Search Coach by Name"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between  items-center flex-wrap ">
                      <label>Search Coach by Name:</label>
                      <div className="relative text-gray-600 rounded-md ">
                        <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
                          <IoNavigate
                            size={25}
                            className="text-primary-green"
                          />
                        </span>
                        <input
                          type="search"
                          name="q"
                          className="py-2 text-sm  rounded-md pl-10 focus:outline-none 
                          placeholder:text-primary-gray  "
                          placeholder="Search Coach by Name"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex  md:justify-end ">
                    <button className=" bg-primary-green rounded-md  px-10 text-white py-2">
                      Search Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coaches */}
      <div className="bg-black  pb-16">
        <div className="container">
          <div>
            <h1 className="text-6xl font-bold  text-white py-16">
              Pickleball <span className="text-primary-green">Coaches</span>
            </h1>{" "}
            <div>
              <div>
                {" "}
                <Slider
                  data={[
                    <CoachCard />,
                    <CoachCard />,
                    <CoachCard />,
                    <CoachCard />,
                    <CoachCard />,
                    <CoachCard />,
                  ]}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //Community */}
      <div className="bg-[#40C20936]   pb-16">
        <div className="container">
          <div>
            <h1 className="text-6xl font-bold  pt-16 pb-5">
              Community Photos Using{" "}
              <span className="text-primary-green">PBU</span>
            </h1>{" "}
            <p>
              Want YOUR CoachUp Moment to be featured here too? Capture and tag
              your photos and/or videos with POU
            </p>
            <div className="  mt-10 grid sm:grid-cols-2 md:grid-cols-3  gap-3">
              <img src={bg_01} className="object-cover h-[300px]  rounded-xl" />
              <img src={bg_01} className="object-cover h-[300px]  rounded-xl" />
              <img src={bg_01} className="object-cover h-[300px]  rounded-xl" />
            </div>
            <div className="py-10 flex justify-center ">
              <button className=" bg-primary-green rounded-md  px-10 text-white py-2">
                See More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-[#E3E3E3]   pb-16">
        <div className="container">
          <div>
            <h1 className="text-6xl font-bold  pt-16 pb-5">Reviews</h1>{" "}
            <div className="  mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div className="bg-white  p-5 rounded-2xl ">
                {" "}
                <div>
                  {" "}
                  <img
                    src={bg_01}
                    className="object-cover h-[200px]  rounded-xl"
                  />
                  <div className="py-5">
                    <div className="flex ">
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                    </div>
                    <div>
                      <h4>Jon</h4>
                      <p className="text-gray-700">
                        Fancy advertising Lots of excuses, but they are all
                        lies. Never buy anything from this company!
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="bg-white  p-5 rounded-2xl ">
                {" "}
                <div>
                  {" "}
                  <img
                    src={bg_01}
                    className="object-cover h-[200px]  rounded-xl"
                  />
                  <div className="py-5">
                    <div className="flex ">
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                    </div>
                    <div>
                      <h4>Jon</h4>
                      <p className="text-gray-700">
                        Fancy advertising Lots of excuses, but they are all
                        lies. Never buy anything from this company!
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="bg-white  p-5 rounded-2xl ">
                {" "}
                <div>
                  {" "}
                  <img
                    src={bg_01}
                    className="object-cover h-[200px]  rounded-xl"
                  />
                  <div className="py-5">
                    <div className="flex ">
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                    </div>
                    <div>
                      <h4>Jon</h4>
                      <p className="text-gray-700">
                        Fancy advertising Lots of excuses, but they are all
                        lies. Never buy anything from this company!
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="bg-white  p-5 rounded-2xl ">
                {" "}
                <div>
                  {" "}
                  <img
                    src={bg_01}
                    className="object-cover h-[200px]  rounded-xl"
                  />
                  <div className="py-5">
                    <div className="flex ">
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                      <span>
                        <AiFillStar size={25} className="text-yellow-400" />
                      </span>
                    </div>
                    <div>
                      <h4>Jon</h4>
                      <p className="text-gray-700">
                        Fancy advertising Lots of excuses, but they are all
                        lies. Never buy anything from this company!
                      </p>
                    </div>
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

const CoachCard = () => {
  return (
    <>
      <div>
        <div className="">
          <div
            className={`bg-[url(${bg_01})] py-20  bg-cover h-[250px] bg-center 
`}
          ></div>
          <div className=" flex gap-3   items-center  bg-neutral-800 ">
            <div className="px-3 grow">
              <div className="mt-2 my-1 text-white flex justify-between ">
                <h6 className="">
                  Joanne <span className="text-primary-green">Dondero</span>
                </h6>
                <h6>(13 year experience) </h6>
              </div>
              <div className="flex text-white items-center gap-3">
                <IoLocationSharp />{" "}
                <span> white Plains, New Yourk ,1036879</span>
              </div>
            </div>
            <div className="text-white bg-primary-green hover:text-primary-green hover:bg-white cursor-pointer  py-5 px-5 ">
              Appointment{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
