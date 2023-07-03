import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import {
  AddCoaching,
  RemoveCoachingLocation,
  SetSlot,
} from "../../graphql/mutations/mutations";
import { Couch } from "../../graphql/query/Query";
import Swal from "sweetalert2";
import * as Yup from "yup";
import PBUGoogleMap from "../../Components/Maps/Map";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
import { AiFillDelete } from "react-icons/ai";
import SelectField from "../../Components/Input/SelectField";

import CitiesData from "../../config/cities.json";
import CountryData from "../../config/countries.json";
import StateData from "../../config/states.json";

const CoachingPanel = ({ coachId, coachings }) => {
  const [addCoaching, { loading: addLoading }] = useMutation(AddCoaching);
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");

  const [removeCoachingLocation, { loading }] = useMutation(
    RemoveCoachingLocation
  );
  const { render, latLong } = PBUGoogleMap();

  const locationValidation = Yup.object().shape({
    location: Yup.array().of(
      Yup.object().shape({
        coachingCity: Yup.string().required(
          "Coaching City is a required field."
        ),
        coachingStreet: Yup.string().required("Street is required"),
        coachingState: Yup.string().required("State is required"),
        coachingCountry: Yup.string().required("Country is required"),
        coachingPinCode: Yup.string()
          .matches(/^\d+$/, "Zip Code not correct")
          .required("Zip Code  is required"),
      })
    ),
  });
  return (
    <>
      {loading || addLoading ? (
        <LoadingSVG />
      ) : (
        <div>
          {coachings?.map((value, index) => (
            <>
              <div className=" bg-[#212F48]  text-white p-4 rounded-lg my-5">
                <AiFillDelete
                  size={24}
                  color={"#ed5e68"}
                  cursor={"pointer"}
                  onClick={() =>
                    removeCoachingLocation({
                      variables: {
                        coachId: coachId,
                        coachingLocationId: value?.id,
                      },
                      refetchQueries: [
                        {
                          query: Couch,
                          variables: {
                            coachId: coachId,
                          },
                        },
                      ],
                    })
                  }
                />
                <h3 className="font-bold text-2xl  my-2 text-green-500 ">
                  Coaching {index + 1}
                </h3>
                <div className="text-white grid grid-cols-2 gap-3  ">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching City </label>
                      <input
                        readOnly
                        value={value?.city}
                        className={`p-3 rounded-md w-full  text-black  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Country </label>
                      <input
                        readOnly
                        value={value?.country}
                        className={`p-3 rounded-md w-full text-black  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Street </label>
                      <input
                        readOnly
                        value={value?.street}
                        className={`p-3 rounded-md w-full text-black  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching State </label>
                      <input
                        readOnly
                        value={value?.state}
                        className={`p-3 rounded-md w-full text-black  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Zip Code </label>
                      <input
                        readOnly
                        value={value?.pinCode}
                        className={`p-3 rounded-md w-full text-black  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
      <Formik
        initialValues={{
          coachingCity: "Bill",
          coachingStreet: "Ashibb ",
          coachingState: "State",
          coachingCountry: "coachingCountry",
          coachingPinCode: "123456",
        }}
        validationSchema={locationValidation}
        onSubmit={(values) =>
          addCoaching({
            variables: {
              coachId: coachId,
              coachingLocation: latLong,
              ...values,
            },
            refetchQueries: [
              {
                query: Couch,
                variables: {
                  coachId: coachId,
                },
              },
            ],
          })
            .then((values) => {
              console.log(values);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <Form>
              <h3 className="font-bold text-2xl  my-2 text-green-500 ">
                Add Coaching Location
              </h3>

              <Fragment>
                <div className="text-white grid grid-cols-2 gap-3 ">
                  <SelectField
                    value={values["coachingCountry"]}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      console.log(e.target.value);
                      setFieldValue("coachingCountry", e.target.value);
                    }}
                    name={"coachingCountry"}
                    label={"Coaching Country"}
                    colorText={"#fff"}
                  >
                    <>
                      <option value="" style={{ color: "black" }}>
                        Select an Country
                      </option>
                      {CountryData.map((country, index) => (
                        <option
                          value={country.name}
                          key={index}
                          style={{ color: "black" }}
                        >
                          {country.name}
                        </option>
                      ))}
                    </>
                  </SelectField>
                  <SelectField
                    value={values["coachingState"]}
                    onChange={(e) => {
                      setState(e.target.value);
                      console.log(e.target.value);
                      setFieldValue("coachingState", e.target.value);
                    }}
                    name={"coachingState"}
                    label={"Coaching State"}
                    colorText={"#fff"}
                  >
                    <>
                      <option value="" style={{ color: "black" }}>
                        Select State
                      </option>
                      {StateData.filter(
                        (obj) => obj.country_name === Country
                      ).map((state, index) => (
                        <option value={state.name} key={index}>
                          {state.name}
                        </option>
                      ))}
                    </>
                  </SelectField>
                  {/* //State */}
                  <SelectField
                    value={["coachingCity"]}
                    name={"coachingCity"}
                    label={"Coaching City"}
                    colorText={"#fff"}
                    onChange={(e) => {
                      setFieldValue("coachingCity", e.target.value);
                    }}
                  >
                    <option value="" style={{ color: "black" }}>
                      Select an City
                    </option>
                    {CitiesData.filter((obj) => obj.state_name === State).map(
                      (city, index) => (
                        <option
                          value={city.name}
                          key={index}
                          style={{ color: "black" }}
                        >
                          {city.name}
                        </option>
                      )
                    )}
                  </SelectField>
                  {/*  */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching PinCode</label>
                    </div>
                    <div className="relative text-gray-600 rounded-md ">
                      <div className="w-full">
                        <Field
                          name={`coachingPinCode`}
                          className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                      placeholder:text-primary-gray `}
                        />
                        <ErrorMessage name={`coachingPinCode`} />
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Street </label>
                    </div>
                    <div className="relative text-gray-600 rounded-md ">
                      <div className="w-full">
                        <Field
                          name={`coachingStreet`}
                          className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                      placeholder:text-primary-gray `}
                        />
                        <ErrorMessage name={`coachingStreet`} />
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Location</label>
                    </div>
                    <div className="h-[30vh]">
                      {render({
                        marker: {
                          draggable: true,
                          position: {
                            lat: latLong.latitude,
                            lng: latLong.longitude,
                          },
                        },
                      })}
                    </div>
                  </div>
                </div>
              </Fragment>

              <div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className=" my-10 bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                >
                  Submit
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default CoachingPanel;
