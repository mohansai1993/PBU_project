import React, { useState } from "react";
import { useFormik } from "formik";
import sunset from "../assets/sunset.jpg";
import { useLazyQuery } from "@apollo/client";
import { GetCourts } from "../graphql/query/Query";
import PBUGoogleMap from "../Components/Maps/Map";
function CourtsPage() {
  const [getCourts] = useLazyQuery(GetCourts);
  const { render, latLong } = PBUGoogleMap();
  const [Courts, setCourts] = useState([]);
  const formik = useFormik({
    initialValues: {
      pincode: "",
      city: "",
    },
    onSubmit: (values) => {
      getCourts({
        variables: {
          ...values,
        },
      }).then((values) => {
        console.log(values.data);
        setCourts(values.data.getCourts);
      });
    },
  });
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
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex justify-between  items-center  flex-wrap">
                  <input
                    type="number"
                    name="pincode"
                    className="py-2 text-sm w-full rounded-md pl-10 focus:outline-none placeholder:text-primary-gray"
                    placeholder="Search by pincode ..."
                    onChange={formik.handleChange}
                  />
                  <input
                    type="text"
                    name="city"
                    className="py-2 mt-2 text-sm w-full rounded-md pl-10 focus:outline-none placeholder:text-primary-gray"
                    placeholder="Search by city ..."
                    autoComplete="off"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="flex justify-center  ">
                  <button
                    type="submit"
                    className=" bg-primary-green rounded-md  px-10 text-white py-2"
                  >
                    Search Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>{" "}
        <div className="bg-primary-green">
          <div className="container py-10 ">
            {/* <iframe
              id="gmap_canvas"
              width={"100%"}
              height={"600px"}
              className="rounded-md"
              src="https://maps.google.com/maps?q=california&t=&z=10&ie=UTF8&iwloc=&output=embed"
            /> */}

            {render({
              marker: {
                draggable: false,
                positions: Courts.map((marker) => ({
                  __typename: marker.location.__typename,
                  lat: marker.location.latitude,
                  lng: marker.location.longitude,
                  street: marker?.street,
                })),
              },
              isCenter: true,
            })}
          </div>
        </div>
      </div>
      {/* <DialogModal /> */}
    </div>
  );
}

export default CourtsPage;
