import React, { useState } from "react";
import { useFormik } from "formik";
import sunset from "../assets/sunset.jpg";
import { useLazyQuery } from "@apollo/client";
import { GetCourts } from "../graphql/query/Query";
import PBUCourtGoogleMap from "../Components/Maps/CourtMap";
import Swal from "sweetalert2";
function CourtsPage() {
  const [getCourts, { error }] = useLazyQuery(GetCourts);
  const { render, latLong } = PBUCourtGoogleMap();
  const [Courts, setCourts] = useState([]);
  const formik = useFormik({
    initialValues: {
      pincode: "",
      city: "",
    },
    onSubmit: (values) => {
      console.log({
        variables: {
          city: values?.city?.trim(),
          pinCode: values?.pincode?.toString(),
        },
      });
      getCourts({
        variables: {
          city: values?.city?.trim(),
          pinCode: values?.pincode?.toString(),
        },
      })
        .then((values) => {
          console.log("hfghfg", values.data);
          setCourts(values.data.getCourts);

          if (!values.data.getCourts?.length) {
            Swal.fire({
              text: "No courts Available on this location",
              icon: "success",
              confirmButtonText: "Cancel",
            });
          }
        })
        .catch((err) => {
          setCourts([]);
          Swal.fire({
            title: error.message,
            icon: "warning",
            confirmButtonText: "Cancel",
          });
          console.log();
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
            {Courts.length > 0 &&
              render({
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
