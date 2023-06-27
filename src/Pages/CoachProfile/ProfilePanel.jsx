import { ErrorMessage, Field, Formik, Form } from "formik";
import moment from "moment";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

import {
  Couch,
  CreateConnectedAccount,
  GetTop4Reviews,
  LoginExpressDashboard,
} from "../../graphql/query/Query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DeletePost } from "../../graphql/mutations/mutations";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Default from "../../assets/default.png";
import { imageOnError } from "../../utils";
const ProfilePanel = ({ couch, postFeed }) => {
  const [deletePost] = useMutation(DeletePost);
  const { data: Reviews } = useQuery(GetTop4Reviews);
  const [createConnectedAccount] = useLazyQuery(CreateConnectedAccount);
  const { data: loginExpressDashboard } = useQuery(LoginExpressDashboard, {
    variables: {
      coachId: couch?.id,
    },
    skip: false,
  });
  return (
    <>
      <div>
        <div className="md:flex text-white gap-5">
          <div className="flex-[0.4]">
            {!couch?.stripeId ? (
              <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
                <h3 className="my-3  text-2xl font-bold  ">Account Setup</h3>
                <p className="mb-4">
                  To accept payments from the platform, please set up a
                  Connected Account. &nbsp;
                  <strong>You need to complete the follow in one go.</strong>
                  &nbsp; You might want to keep the following things on hand for
                  the onboarding process::<br></br>
                  <br></br> 1. Phone for OTP
                  <br></br>
                  2. Bank account or card details
                  <br></br> 3. Identity Proof Document
                </p>

                <button
                  onClick={() => {
                    createConnectedAccount({
                      variables: {
                        coachId: couch?.id,
                      },
                    }).then(({ data, error }) => {
                      console.log(data);

                      if (error) {
                        Swal.fire("Warning!", error.message, "warning");
                      } else {
                        window.location.href = data?.createConnectedAccount;
                      }
                    });
                  }}
                  className="gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]"
                >
                  Create Account
                </button>
              </div>
            ) : null}
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              <div className="flex justify-between items-center ">
                <h3 className="my-3  text-2xl font-bold  ">About Coach</h3>
                <a
                  target="_blank"
                  href={loginExpressDashboard?.loginExpressDashboard}
                  className="gap-2 px-2 bg-primary-green text-white py-3 rounded-md min-w-[150px] text-center "
                >
                  Express Login
                </a>
              </div>
              <p className="mb-4">{couch?.about}</p>
              <div>
                <h3 className="my-4  text-2xl font-bold  ">Info</h3>
              </div>{" "}
              <ol className="flex flex-col gap-3">
                <li className="flex items-center gap-2 ">
                  Skill Level:{" "}
                  <span className="text-primary-green font-semibold">
                    {couch?.skillLevel?.name}
                  </span>
                </li>

                <li className="flex items-center gap-2 ">
                  Email:
                  <span className="text-primary-green font-semibold">
                    {couch?.email}
                  </span>
                </li>
              </ol>
            </div>
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              {" "}
              <h3 className="my-3  text-2xl font-bold  ">Coach List </h3>
              <div className="flex flex-col  gap-4">
                {Reviews?.getTop4Reviews?.map((value, index) => (
                  <Link
                    index={index}
                    to={`/coach/${value?.id}`}
                    className="flex items-center  gap-4"
                  >
                    <img
                      src={value?.profilePicture}
                      onError={imageOnError}
                      className="rounded-md h-[50px] w-[50px] object-cover"
                      alt="img"
                    />
                    <div>
                      <h3 className="mb-1 text-xl font-bold ">
                        {value?.firstName}&nbsp;{value?.lastName}{" "}
                      </h3>
                      <h5 className="text-xs">
                        {value?.coachingLocation[0]?.city}
                      </h5>
                    </div>{" "}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-[0.6] mt-6">
            <div className="flex items-start  gap-4 bg-[#212F48] p-6 rounded-2xl  mb-6">
              <img
                src={couch?.profilePicture}
                onError={imageOnError}
                className="rounded-md h-[50px] w-[50px] object-cover"
                alt=""
              />
              <Formik
                initialValues={{
                  message: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values?.message) {
                    errors.message = "Message is required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    console.log(values);
                    postFeed({
                      variables: {
                        post: values?.message,
                        coachId: couch?.id,
                        postBy: "coach",
                      },
                      refetchQueries: [
                        {
                          query: Couch,
                          variables: {
                            coachId: couch?.id,
                          },
                        },
                      ],
                    });
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full">
                    <div className="w-full">
                      <Field
                        name="message"
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="w-full text-black p-3 placeholder:text-black rounded-md"
                            placeholder="Write here"
                          />
                        )}
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500"
                      />
                      <button
                        type="submit"
                        className="gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Message"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* //Message  */}
            <div className="grid gap-4">
              {couch?.feed?.map((feed, index) => (
                <div key={index} className="   bg-[#212F48] p-6 rounded-2xl ">
                  <div className="flex  justify-between w-full">
                    <div className="flex  gap-3">
                      <img
                        src={couch?.profilePicture}
                        onError={imageOnError}
                        className="rounded-md h-[50px] w-[50px] object-cover"
                        alt=""
                      />
                      <div className="w-full">
                        <h3 className="text-xl">
                          {couch?.firstName + " " + couch?.lastName}
                        </h3>
                        <h3 className="text-sm">Footballer</h3>
                      </div>
                    </div>
                    <AiFillDelete
                      size={24}
                      color={"#ed5e68"}
                      cursor={"pointer"}
                      onClick={() =>
                        deletePost({
                          variables: { postId: feed.id },
                          refetchQueries: [
                            {
                              query: Couch,
                              variables: {
                                coachId: couch?.id,
                              },
                            },
                          ],
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="py-4">{feed?.post}</p>
                    <div className="flex justify-between text-primary-green ">
                      <span>{moment(feed?.updatedAt).format("LLL")}</span>
                      {/* <span>Book Now</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
