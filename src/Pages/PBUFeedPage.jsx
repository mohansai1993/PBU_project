import React, { Fragment, useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { TfiPencil } from "react-icons/tfi";
import { IoNavigate } from "react-icons/io5";
import { FieldArray, useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Couch } from "../graphql/query/Query";
import moment from "moment";
import _ from "lodash";
import {
  PostFeed,
  EditCoach,
  SetSlot,
  DeletePost,
  AddCoaching,
  RemoveCoachingLocation,
  CreateSessionPlan,
} from "../graphql/mutations/mutations";
import { AiFillDelete } from "react-icons/ai";
import * as Yup from "yup";
import MultiChat from "../module/pages/MultiChat";
import { AuthContext } from "../context/AuthContext";
import LoadingSVG from "../Components/Loading/LoadingSvg";
import Swal from "sweetalert2";
import PBUGoogleMap from "../Components/Maps/Map";
import { RemoveSessionPlan } from "../module/graphql/mutations/mutations";

function PBUFeedPage() {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  let { data: couch, loading } = useQuery(Couch, {
    skip: !id,
    variables: {
      coachId: id,
    },
  });
  let [postFeed] = useMutation(PostFeed);
  let [editCoach] = useMutation(EditCoach);
  let Tabs = [
    {
      title: "Your Profile",
    },

    {
      title: "Profile Setting",
    },
    {
      title: "Availability",
    },
    {
      title: "Coaching",
    },
    {
      title: "About",
    },
    {
      title: "Chats",
    },
  ];
  // useEffect(() => {
  //   if (!isCoach(currentUser?.userType)) {
  //     alert("You are not an Coach");
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div className="bg-[#152033]">
      <div className="container">
        <div>
          <Tab.Group>
            {" "}
            <div className="bg-[#212F48] p-6 rounded-2xl ">
              {loading ? (
                <LoadingSVG />
              ) : (
                <>
                  <div className="text-white ">
                    <img
                      src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                      alt=""
                      className="object-cover h-[250px] rounded-2xl mb-8 w-full"
                    />
                    <div className="flex  items-center  justify-between">
                      <div className="flex items-center  gap-4">
                        <img
                          alt=""
                          src={couch?.getCoach?.profilePicture}
                          className="rounded-md h-[100px] w-[100px] object-cover"
                        />
                        <div>
                          <h3 className="mb-2 text-3xl font-bold ">{`${couch?.getCoach?.firstName} ${couch?.getCoach?.lastName}`}</h3>
                          <h5>Footballer </h5>
                        </div>
                      </div>
                    </div>
                    <hr className="border-[#B8B8B8] my-6  "></hr>
                  </div>
                  <Tab.List className=" text-white  divide-x divide-[#B8B8B8]">
                    {Tabs.map((value, index) => (
                      <>
                        <Tab
                          as={Fragment}
                          className="cursor-pointer"
                          index={index}
                        >
                          {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <span
                              key={index}
                              className={
                                selected
                                  ? "outline-none text-primary-green px-3"
                                  : "px-3"
                              }
                            >
                              {value.title}
                            </span>
                          )}
                        </Tab>
                      </>
                    ))}
                  </Tab.List>
                </>
              )}
            </div>
            <Tab.Panels className=" mt-6 pb-6">
              <Tab.Panel>
                <ProfilePanel postFeed={postFeed} couch={couch?.getCoach} />
              </Tab.Panel>
              <Tab.Panel>
                <SettingPanel editCoach={editCoach} coachId={id} />
              </Tab.Panel>
              <Tab.Panel>
                <AvaibilityPanel
                  coachId={id}
                  openingHours={couch?.getCoach?.openingHours}
                  loading={loading}
                />
              </Tab.Panel>
              {/* /Transaction */}
              <Tab.Panel>
                <CoachingPanel
                  coachId={id}
                  coachings={couch?.getCoach?.coachingLocation}
                />
              </Tab.Panel>{" "}
              <Tab.Panel>
                <AboutPanel coachId={id} values={couch?.getCoach} />
              </Tab.Panel>
              <Tab.Panel>
                <MultiChat couch={couch} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

const ProfilePanel = ({ couch, postFeed }) => {
  const [deletePost] = useMutation(DeletePost);
  return (
    <>
      <div>
        <div className="md:flex text-white gap-5">
          <div className="flex-[0.4]">
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              <h3 className="my-3  text-2xl font-bold  ">About Athlete</h3>
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
                  Phone:{" "}
                  <span className="text-primary-green font-semibold">
                    {couch?.contactDetails?.number}
                  </span>
                </li>{" "}
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
                {" "}
                <div className="flex items-center  gap-4">
                  <img
                    src={couch?.profilePicture}
                    className="rounded-md h-[50px] w-[50px]"
                    alt="img"
                  />
                  <div>
                    <h3 className="mb-1 text-xl font-bold ">Leo Messy </h3>
                    <h5 className="text-xs">Football Coach</h5>
                  </div>{" "}
                  <h5 className="text-xs text-primary-green">Start $50</h5>
                </div>
                <div className="flex items-center  gap-4">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                    className="rounded-md h-[50px] w-[50px]"
                    alt="img"
                  />
                  <div>
                    <h3 className="mb-1 text-xl font-bold ">Leo Messy </h3>
                    <h5 className="text-xs">Football Coach</h5>
                  </div>{" "}
                  <h5 className="text-xs text-primary-green">Start $50</h5>
                </div>
                <div className="flex items-center  gap-4">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                    className="rounded-md h-[50px] w-[50px]"
                    alt="img"
                  />
                  <div>
                    <h3 className="mb-1 text-xl font-bold ">Leo Messy </h3>
                    <h5 className="text-xs">Football Coach</h5>
                  </div>{" "}
                  <h5 className="text-xs text-primary-green">Start $50</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0.6] mt-6">
            <div className="flex items-start  gap-4 bg-[#212F48] p-6 rounded-2xl  mb-6">
              <img
                src={couch?.profilePicture}
                className="rounded-md h-[50px] w-[50px] object-cover"
                alt=""
              />
              <Formik
                initialValues={{
                  message: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.message) {
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
                        post: values.message,
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

const SettingPanel = ({ editCoach, coachId }) => {
  const [File, setFile] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    game: Yup.string().required("Game is required"),
    city: Yup.string().required(" City is required"),
    state: Yup.string().required(" State is required"),
    country: Yup.string().required(" Country is required"),
    pinCode: Yup.string()
      .matches(/^\d+$/, " Pincode not correct")
      .required(" Pincode is required"),
    street: Yup.string().required(" Street is required"),
    about: Yup.string().required("About is required"),
  });
  const ErrorPrint = ({ value }) => {
    return (
      <>
        {formik.touched[value] && formik.errors[value] ? (
          <div className="text-start text-red-600 text-sm ">
            {formik.errors[value]}
          </div>
        ) : null}
      </>
    );
  };
  const formik = useFormik({
    initialValues: {
      profilePicture: null,
      about: "THis is about",
      game: "foostball",
      firstName: "new",
      lastName: "sfsdf",
      street: "ghjgjgh",
      city: "fghfghfg",
      state: "fghfghfg",
      country: "hgfhfghfg",
      pinCode: "123456789",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editCoach({
        variables: {
          coachId: coachId,
          profilePicture: null,
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
        .then(() => {
          Swal.fire(
            "Success!",
            "Coach profile updated successfully",
            "success"
          );
        })
        .catch(() => {});
      // Your form submission logic goes here
    },
  });

  return (
    <>
      <form
        className="text-white grid grid-cols-2 gap-3 "
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label>First Name </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="First name"
              />{" "}
              <ErrorPrint value={"firstName"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Last Name </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="last name"
              />
              <ErrorPrint value={"lastName"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Game</label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="game"
                onChange={formik.handleChange}
                value={formik.values.game}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Game"
              />
              <ErrorPrint value={"game"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>City </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="City"
                autoComplete="off"
              />
              <ErrorPrint value={"city"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label> State </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder=" State"
              />
            </div>
            <ErrorPrint value={"state"} />
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label> Country </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder=" Country"
              />
              <ErrorPrint value={"country"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label> Pincode </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="pinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pinCode}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder=" Pincode"
              />
              <ErrorPrint value={"pinCode"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label> Street </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="street"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder=" Street"
              />
              <ErrorPrint value={"street"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Profile Image </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="file"
                name="profilePicture"
                onChange={
                  (e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }
                  // formik.handleChange
                }
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full bg-white  text-sm  rounded-md focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Select Profile image"
              />
              <ErrorPrint value={"profilePicture"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>About </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <textarea
                type="text"
                name="about"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Write about you"
              />
              <ErrorPrint value={"about"} />
            </div>
          </div>
        </div>
        {/* <div>
          <div>
            <label> Location </label>
          </div>
          {render({
            marker: {
              draggable: true,
            },
          })}
        </div> */}
        <div>
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
    </>
  );
};

const AvaibilityPanel = ({ coachId, openingHours, loading }) => {
  const [slot, { loading: slotLoading }] = useMutation(SetSlot);
  console.log(openingHours);
  const initialValues = {
    sunday: {
      start: openingHours?.Sunday.startTime,
      end: openingHours?.Sunday.endTime,
    },
    monday: {
      start: openingHours?.Monday.startTime,
      end: openingHours?.Monday.endTime,
    },
    tuesday: {
      start: openingHours?.Tuesday.startTime,
      end: openingHours?.Tuesday.endTime,
    },
    wednesday: {
      start: openingHours?.Wednesday.startTime,
      end: openingHours?.Wednesday.endTime,
    },
    thursday: {
      start: openingHours?.Thursday.startTime,
      end: openingHours?.Thursday.endTime,
    },
    friday: {
      start: openingHours?.Friday.startTime,
      end: openingHours?.Friday.endTime,
    },
    saturday: {
      start: openingHours?.Saturday.startTime,
      end: openingHours?.Saturday.endTime,
    },
  };
  const validation = Yup.object().shape({
    sunday: Yup.object().shape({
      start: Yup.number()
        .min(6, "not be less than 6")
        .max(24, "not be greater than 24"),
      end: Yup.number()
        .min(6, "not be less than 6")
        .max(24, "not be greater than 24"),
    }),
    // add validation for other days here
  });

  return (
    <>
      {loading || slotLoading ? (
        <LoadingSVG />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            console.log(values);
            slot({
              variables: {
                coachId: coachId,
                openingHours: {
                  Sunday: {
                    startTime: values.sunday.start,
                    endTime: values.sunday.end,
                  },
                  Monday: {
                    startTime: values.monday.start,
                    endTime: values.monday.end,
                  },
                  Tuesday: {
                    startTime: values.tuesday.start,
                    endTime: values.tuesday.end,
                  },
                  Wednesday: {
                    startTime: values.wednesday.start,
                    endTime: values.wednesday.end,
                  },
                  Thursday: {
                    startTime: values.thursday.start,
                    endTime: values.thursday.end,
                  },
                  Friday: {
                    startTime: values.friday.start,
                    endTime: values.friday.end,
                  },
                  Saturday: {
                    startTime: values.saturday.start,
                    endTime: values.saturday.end,
                  },
                },
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
              .then((res) => {
                Swal.fire(
                  "Success",
                  "Availability Update Successfully",
                  "success"
                );
              })
              .catch((err) => {
                Swal.fire("Error", "Something went wrong", "error");
              });
          }}
          enableReinitialize={true}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Day
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Start Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(values).map(([day, { start, end }]) => (
                    <tr
                      key={day}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 capitalize text-[#212f48]  text-bold   "
                      >
                        {day}
                      </td>
                      <td scope="row" class="px-6 py-4">
                        <Field
                          type="number"
                          name={`${day}.start`}
                          value={start}
                          className="p-3 rounded-md w-full  text-sm rounded-md focus:outline-none 
                        placeholder:text-primary-gray bg-[#212f48] text-white text-semibold "
                          placeholder="Start Time"
                        />
                        <ErrorMessage
                          name={`${day}.start`}
                          component="div"
                          className="text-red-500"
                        />
                      </td>
                      <td scope="row" class="px-6 py-4 ">
                        <Field
                          type="number"
                          name={`${day}.end`}
                          value={end}
                          className="p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
                        placeholder:text-primary-gray bg-[#212f48] text-white text-semibold "
                          placeholder="End Time"
                        />
                        <ErrorMessage
                          name={`${day}.end`}
                          component="div"
                          className="text-red-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="submit"
                className="bg-primary-green text-white py-1  rounded-md min-w-[150px]  mt-5"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

const CoachingPanel = ({ coachId, coachings }) => {
  const [addCoaching, { loading: addLoading }] = useMutation(AddCoaching);
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
          .matches(/^\d+$/, "Pincode not correct")
          .required("Pincode is required"),
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
                        coachingLocationId: value.id,
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
                        value={value.city}
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
                        value={value.country}
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
                        value={value.street}
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
                        value={value.state}
                        className={`p-3 rounded-md w-full text-black  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Pincode </label>
                      <input
                        readOnly
                        value={value.pinCode}
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
        {({ values, handleSubmit }) => (
          <>
            <Form>
              <Fragment>
                <div className="text-white grid grid-cols-2 gap-3 ">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching City </label>
                    </div>
                    <div className="relative text-gray-600 rounded-md ">
                      <div className="w-full">
                        <Field
                          name={`coachingCity`}
                          className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                    placeholder:text-primary-gray `}
                        />
                        <ErrorMessage name={`coachingCity`} />
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
                      <label>Coaching State </label>
                    </div>
                    <div className="relative text-gray-600 rounded-md ">
                      <div className="w-full">
                        <Field
                          name={`coachingState`}
                          className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                    placeholder:text-primary-gray `}
                        />
                        <ErrorMessage name={`coachingState`} />
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label>Coaching Country </label>
                    </div>
                    <div className="relative text-gray-600 rounded-md ">
                      <div className="w-full">
                        <Field
                          name={`coachingCountry`}
                          className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                    placeholder:text-primary-gray `}
                        />
                        <ErrorMessage name={`coachingCountry`} />
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
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
                                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                                    placeholder:text-primary-gray `}
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
              className="w-full text-black p-3 placeholder:text-black rounded-md"
              placeholder="Tell us about your athlete "
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
export default PBUFeedPage;
