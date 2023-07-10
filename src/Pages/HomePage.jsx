import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoNavigate, IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import bg_01 from "../assets/bg-01.png";
import Slider from "../Components/Slider/Slider";

import { useFormik } from "formik";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Couches, GetTop4Reviews } from "../graphql/query/Query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SwiperSlide } from "swiper/react";
import { imageOnError } from "../utils";
function HomePage() {
  const [Coaches, setCoaches] = useState([]);
  const { data: Reviews } = useQuery(GetTop4Reviews);
  const [getCoaches] = useLazyQuery(Couches);
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
    },
    onSubmit: (values) => {
      if (values.name.trim() !== values.location.trim()) {
        getCoaches({
          variables: {
            coachName: values?.name?.trim(),
            pinCode: values.location === "" ? null : values.location.trim(),
          },
        }).then((res) => {
          setCoaches(res.data?.getCoaches);
          if (!res.data?.getCoaches.length) {
            Swal.fire({
              title: "No Coach Found ",
              icon: "success",
              confirmButtonText: "Cancel",
            });
          }
        });
        // Here you can perform the search with the values submitted by the form
      } else {
        setCoaches([]);
        Swal.fire({
          title: "Warning",
          text: "Please enter coach name or Zip Code",
          icon: "warning",
          confirmButtonText: "Cancel",
        });
      }
    },
  });
  return (
    <div>
      {/* //Hero Section */}
      <div>
        <div
          className={`bg-[url(${bg_01})] py-20 px-[20px]  bg-cover  bg-center 
`}
        >
          <div className="max-w-2xl  mx-auto ">
            <h1 className="text-5xl capitalize mb-16 font-semibold leading-tight  text-white  tracking-wide">
              Find <span className="text-primary-green">PBallU</span> Coach
              <br></br>Near You
            </h1>

            {/* Form Container */}
            <div className=" text-white relative w-full z-10 ">
              <div className="px-8 py-10 rounded-lg  bg-primary-green bg-opacity-40 ">
                <h3 className="mb-4">Search of PBU Coach Here</h3>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <div className="flex justify-between  items-center  flex-wrap">
                      <label>Search Coach by Name:</label>
                      <div className="relative text-gray-600 rounded-md ">
                        <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
                          <FiSearch size={25} className="text-primary-green" />
                        </span>
                        <input
                          type="search"
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className="py-2 text-sm rounded-md pl-10 focus:outline-none placeholder:text-primary-gray"
                          placeholder="Search Coach by Name"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between  items-center flex-wrap ">
                      <label>Search Coach by Zip Code:</label>
                      <div className="relative text-gray-600 rounded-md ">
                        <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
                          <IoNavigate
                            size={25}
                            className="text-primary-green"
                          />
                        </span>
                        <input
                          type="search"
                          id="location"
                          name="location"
                          value={formik.values.location}
                          onChange={formik.handleChange}
                          className="py-2 text-sm rounded-md pl-10 focus:outline-none placeholder:text-primary-gray"
                          placeholder="Search Coach by Pin Code"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex  md:justify-end ">
                    <button
                      type="submit"
                      className=" bg-primary-green rounded-md  px-10 text-white py-2"
                    >
                      Search Now
                    </button>
                  </div>
                </form>
              </div>
              <div className="absolute w-full">
                {Coaches?.map((value, index) => (
                  <div className="md:max-w-md md:ml-[33%]" key={index}>
                    <div className="bg-white rounded-lg col-start-2 col-end-3 w-full  mr-auto px-4 py-2 mb-2">
                      {" "}
                      <Link to={"/coach/" + value.id}>
                        <div className="text-black  font-semibold flex  items-center justify-between">
                          <img
                            className="max-w-[80px] h-[80px] rounded-lg w-full object-cover"
                            src={value.profilePicture}
                            onError={imageOnError}
                            alt=""
                          />
                          <div className="text-left">
                            <div>{value.firstName + " " + value.lastName}</div>
                            <div>
                              <div className="flex justify-end ">
                                {Array(parseInt(value.averageRating)).fill(
                                  <span>
                                    <AiFillStar
                                      size={15}
                                      className="text-yellow-400"
                                    />
                                  </span>
                                )}
                                {Array(5 - parseInt(value.averageRating)).fill(
                                  <span>
                                    <AiFillStar
                                      size={15}
                                      className="text-gray-200"
                                    />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </Link>
                    </div>
                  </div>
                ))}
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
                <Slider>
                  {Reviews?.getTop4Reviews?.map((value, index) => (
                    <SwiperSlide key={index}>
                      <CoachCard value={value} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //Community */}
      {/* <div className="bg-[#40C20936]   pb-16">
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
              <img
                src={comm1}
                className="object-cover h-[300px] w-full  rounded-xl"
              />
              <img
                src={comm2}
                className="object-cover h-[300px]  w-full rounded-xl"
              />
              <img
                src={comm3}
                className="object-cover h-[300px] w-full  rounded-xl"
              />
            </div>
            <div className="py-10 flex justify-center ">
              <button className=" bg-primary-green rounded-md  px-10 text-white py-2">
                See More
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Reviews */}
      <div className="bg-[#E3E3E3]   pb-16">
        <div className="container">
          <div>
            <h1 className="text-6xl font-bold  pt-16 pb-5">Reviews</h1>{" "}
            <div className="  mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Reviews?.getTop4Reviews?.map((value) => (
                <Link to={"/coach/" + value.id}>
                  <div className="bg-white  p-5 rounded-2xl ">
                    {" "}
                    <div>
                      {" "}
                      <img
                        src={value.profilePicture}
                        onError={imageOnError}
                        alt={value.firstName}
                        className="object-cover w-full h-[200px]  rounded-xl"
                      />
                      {}
                      <div className="py-5">
                        <div className="flex ">
                          {Array(parseInt(value.averageRating)).fill(
                            <span>
                              <AiFillStar
                                size={25}
                                className="text-yellow-400"
                              />
                            </span>
                          )}
                          {Array(5 - parseInt(value.averageRating)).fill(
                            <span>
                              <AiFillStar size={25} className="text-gray-200" />
                            </span>
                          )}
                        </div>
                        <div>
                          <h4>{value.firstName + " " + value.lastName}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CoachCard = ({ value }) => {
  return (
    <>
      <div>
        <div className="">
          <div
            className={`bg-[url(${value.profilePicture})] py-20  bg-cover  h-[250px]  
`}
          ></div>
          <div className=" flex gap-3   items-center  bg-neutral-800 ">
            <div className="px-3 grow">
              <div className="mt-2 my-1 text-white flex justify-between ">
                <h6 className="">
                  {value.firstName}{" "}
                  <span className="text-primary-green">{value.lastName}</span>
                </h6>
                <h6>(13 year experience) </h6>
              </div>
              <div className="flex text-white items-center gap-3">
                <IoLocationSharp />{" "}
                <span className="clamp-1">
                  {value?.coachingLocation[0]?.street &&
                    value?.coachingLocation[0]?.street + ","}
                  {value?.coachingLocation[0]?.street &&
                    value?.coachingLocation[0]?.city + ","}
                  {value?.coachingLocation[0]?.pinCode}
                </span>
              </div>
            </div>
            <Link
              to={`/coach/${value.id}`}
              className="text-white bg-primary-green hover:text-primary-green hover:bg-white cursor-pointer  py-5 px-5 "
            >
              Appointment{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
