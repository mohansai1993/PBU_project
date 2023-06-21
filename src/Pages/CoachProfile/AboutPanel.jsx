import React, { Fragment } from "react";
import { Couch } from "../../graphql/query/Query";
import Swal from "sweetalert2";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import {
  CreateSessionPlan,
  EditCoach,
} from "../../graphql/mutations/mutations";
import { RemoveSessionPlan } from "../../module/graphql/mutations/mutations";
import { AiFillDelete } from "react-icons/ai";
const AboutPanel = ({ coachId, values }) => {
  let [editCoach] = useMutation(EditCoach);
  let [createSessionPlan, { loading: createLoading }] =
    useMutation(CreateSessionPlan);
  let [removeSessionPlan, { loading: removeLoading }] =
    useMutation(RemoveSessionPlan);
  console.log();
  return (
    <>
      <div>
        <div className="bg-[#212F48]  text-white p-4 rounded-lg my-5">
          <div>
            <h3 className="text-2xl font-bold ">Session Plan</h3>
            {removeLoading ? (
              <LoadingSVG />
            ) : (
              <div className="my-5 grid grid-cols-3 gap-3 text-black ">
                {values?.sessionPlans.map((value, index) => (
                  <div class="bg-white p-4 rounded-md" key={index}>
                    <div className="flex flex-end ">
                      <AiFillDelete
                        size={24}
                        color={"#ed5e68"}
                        cursor={"pointer"}
                        onClick={() =>
                          removeSessionPlan({
                            variables: {
                              coachId: coachId,
                              planId: value.id,
                            },
                            refetchQueries: [
                              {
                                query: Couch,
                                variables: {
                                  coachId: coachId,
                                },
                              },
                            ],
                          }).then(() => {
                            Swal.fire(
                              "Success!",
                              "Session Plan delete successfully",
                              "success"
                            );
                          })
                        }
                      />
                    </div>
                    <h3 class="text-2xl font-bold  py-5">
                      <span class="text-primary-green">Session</span> for{" "}
                      {value.forPeople} pepole
                    </h3>
                    <div>
                      <ol className="flex flex-col gap-3">
                        <li className="flex items-center gap-2 ">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            className="text-primary-green "
                            height={20}
                            width={20}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm244.5 0l-81.9-81.1c-7.5-7.5-7.5-19.8 0-27.3s19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81z" />
                          </svg>
                          You will take {value.duration} Hour.
                        </li>
                        <li className="flex items-center gap-2 ">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            className="text-primary-green "
                            height={20}
                            width={20}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm244.5 0l-81.9-81.1c-7.5-7.5-7.5-19.8 0-27.3s19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81z" />
                          </svg>
                          {value.forPeople} people can join.
                        </li>
                        <li className="flex items-center gap-2 ">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            className="text-primary-green "
                            height={20}
                            width={20}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm244.5 0l-81.9-81.1c-7.5-7.5-7.5-19.8 0-27.3s19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81z" />
                          </svg>
                          You can discuss with the coach.
                        </li>
                      </ol>
                      <button className="border border-black hover:bg-primary-green hover:text-white hover:border-white font-semibold   text-black  py-2  rounded-md w-full my-5 ">
                        ${value.price} for session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Formik
              initialValues={{
                duration: 1,
                forPeople: 2,
                price: 100,
              }}
              onSubmit={(values) => {
                createSessionPlan({
                  variables: {
                    ...values,
                    coachId: coachId,
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
                  .then(() => {
                    Swal.fire(
                      "Success!",
                      "Session Plan created  successfully",
                      "success"
                    );
                  })
                  .catch((err) => {});
                console.log(values);
              }}
            >
              {({ values, handleSubmit }) => (
                <>
                  <h3 className="font-bold text-2xl  my-2 text-green-500 ">
                    Add Session Plan
                  </h3>
                  <Form>
                    <Fragment>
                      <div className="text-white grid grid-cols-2 gap-3 ">
                        <div className="flex flex-col gap-3">
                          <div>
                            <label>Duration</label>
                          </div>
                          <div className="relative text-gray-600 rounded-md ">
                            <div className="w-full">
                              <Field
                                name={`duration`}
                                type="number"
                                min={1}
                                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none placeholder:text-primary-gray`}
                              />
                              <ErrorMessage name={`coachingCity`} />
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="flex flex-col gap-3">
                          <div>
                            <label>For People</label>
                          </div>
                          <div className="relative text-gray-600 rounded-md ">
                            <div className="w-full">
                              <Field
                                name={`forPeople`}
                                type="number"
                                min={1}
                                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                      placeholder:text-primary-gray `}
                              />
                              <ErrorMessage name={`coachingCity`} />
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="flex flex-col gap-3">
                          <div>
                            <label>Price</label>
                          </div>
                          <div className="relative text-gray-600 rounded-md ">
                            <div className="w-full">
                              <Field
                                name={`price`}
                                type="number"
                                min={1}
                                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                      placeholder:text-primary-gray `}
                              />
                              <ErrorMessage name={`coachingCity`} />
                            </div>{" "}
                          </div>{" "}
                        </div>
                      </div>
                    </Fragment>
                    <div>
                      {createLoading ? (
                        <LoadingSVG />
                      ) : (
                        <button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className=" my-10 bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                        >
                          Add Plan
                        </button>
                      )}
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-white font-semibold">Experience</h2>
          <form
            className="my-5"
            onSubmit={(e) => {
              e.preventDefault();

              editCoach({
                variables: {
                  coachId: coachId,
                  coachingExperience:
                    document.getElementById("experience").value,
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
                .then(() => {
                  Swal.fire(
                    "Success!",
                    "Experience updated successfully",
                    "success"
                  );
                })
                .catch(() => {});
            }}
          >
            {console.log(values?.coachingExperience)}
            <textarea
              className="w-full text-black p-3 placeholder:text-black rounded-md"
              placeholder="Write Your coaching Experience "
              defaultValue={values?.coachingExperience}
              id="experience"
            />{" "}
            <div className="flex justify-end">
              <button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl text-white font-semibold">
            Athlete Highlighting
          </h2>
          <form
            className="my-5"
            onSubmit={(e) => {
              e.preventDefault();
              editCoach({
                variables: {
                  coachId: coachId,
                  highlights: document.getElementById("highlighting").value,
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
                .then(() => {
                  Swal.fire(
                    "Success!",
                    "Highlights updated successfully",
                    "success"
                  );
                })
                .catch(() => {});
            }}
          >
            <textarea
              className="w-full text-black p-3 placeholder:text-gray-500  rounded-md"
              placeholder="Add Athlete Highlighting "
              id="highlighting"
              defaultValue={values?.highlights}
            />{" "}
            <div className="flex justify-end">
              <button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AboutPanel;
