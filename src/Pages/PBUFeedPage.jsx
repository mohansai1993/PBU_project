import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { TfiPencil } from "react-icons/tfi";
import { IoNavigate } from "react-icons/io5";
import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Couch } from "../graphql/query/Query";
import moment from "moment";
import {
  PostFeed,
  EditCoach,
  setSlot,
  SetSlot,
} from "../graphql/mutations/mutations";
import { AiFillDelete } from "react-icons/ai";
import * as Yup from "yup";
import MultiChat from "../module/pages/MultiChat";

function PBUFeedPage() {
  let { id } = useParams();
  let { data: couch } = useQuery(Couch, {
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
      title: "Transaction History",
    },
    {
      title: "About",
    },
    {
      title: "Chats",
    },
  ];
  return (
    <div className="bg-[#152033]">
      <div className="container">
        <div>
          <Tab.Group>
            {" "}
            <div className="bg-[#212F48] p-6 rounded-2xl ">
              <img />
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
                    <Tab as={Fragment} className="cursor-pointer" index={index}>
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
                />
              </Tab.Panel>
              <Tab.Panel>
                <AboutPanel coachId={id} />
              </Tab.Panel>
              <Tab.Panel>
                <MultiChat coachId={id} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

const ProfilePanel = ({ couch, postFeed }) => {
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
                <div className="   bg-[#212F48] p-6 rounded-2xl ">
                  <div className="flex  justify-between w-full">
                    <div className="flex  gap-3">
                      <img
                        src={couch?.profilePicture}
                        className="rounded-md h-[50px] w-[50px] object-cover"
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

  const formik = useFormik({
    initialValues: {
      profilePicture: null,
      about: "THis is about ",
      game: "foostball",
      firstName: "new",
      lastName: "sfsdf",
      coachingStreet1: "ghjgjgh",
      coachingCity: "fghfghfg",
      coachingState: "fghfghfg",
      coachingCountry: "hgfhfghfg",
      coachingPinCode: "123456789",
    },

    onSubmit: (values) => {
      console.log(values, File);
      editCoach({
        variables: {
          coachId: coachId,
          profilePicture: null,
          coachingPinCode: values.coachingPinCode.toString(),
          ...values,
        },
      });
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
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="First name"
              />
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
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="last name"
              />
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
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Game"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Coaching City </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="coachingCity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Coaching City"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Coaching State </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="coachingState"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Coaching State"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Coaching Country </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="coachingCountry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Coaching Country"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Coaching Pincode </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="number"
                name="coachingPinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Coaching Pincode"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Coaching Street </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="coachingStreet1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Coaching Street"
              />
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
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Write about you"
              />
            </div>
          </div>
        </div>
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

const AvaibilityPanel = ({ coachId, openingHours }) => {
  const [slot] = useMutation(SetSlot);
  const initialValues = {
    sunday: {
      start: openingHours.Sunday.startTime,
      end: openingHours.Sunday.endTime,
    },
    monday: {
      start: openingHours.Monday.startTime,
      end: openingHours.Monday.endTime,
    },
    tuesday: {
      start: openingHours.Tuesday.startTime,
      end: openingHours.Tuesday.endTime,
    },
    wednesday: {
      start: openingHours.Wednesday.startTime,
      end: openingHours.Wednesday.endTime,
    },
    thursday: {
      start: openingHours.Thursday.startTime,
      end: openingHours.Thursday.endTime,
    },
    friday: {
      start: openingHours.Friday.startTime,
      end: openingHours.Friday.endTime,
    },
    saturday: {
      start: openingHours.Saturday.startTime,
      end: openingHours.Saturday.endTime,
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
      {" "}
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          slot({
            variables: {
              coachId: coachId,
              openingHours: {
                Sunday: {
                  endTime: values.sunday.start,
                  startTime: values.sunday.start,
                },
                Friday: {
                  startTime: values.friday.start,
                  endTime: values.friday.start,
                },
                Monday: {
                  startTime: values.monday.start,
                  endTime: values.monday.start,
                },
                Saturday: {
                  endTime: values.saturday.start,
                  startTime: values.saturday.start,
                },
                Thursday: {
                  endTime: values.thursday.start,
                  startTime: values.thursday.start,
                },
                Tuesday: {
                  endTime: values.tuesday.start,
                  startTime: values.tuesday.start,
                },
                Wednesday: {
                  endTime: values.wednesday.start,
                  startTime: values.wednesday.start,
                },
              },
            },
          }).then((res) => console.log(res));
        }}
        enableReinitialize={true}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    <td scope="row" class="px-6 py-4 capitalize">
                      {day}
                    </td>
                    <td scope="row" class="px-6 py-4">
                      <Field
                        type="number"
                        name={`${day}.start`}
                        value={start}
                        className="p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
                        placeholder:text-primary-gray "
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
                        placeholder:text-primary-gray "
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
    </>
  );
};

const AboutPanel = ({ couchId }) => {
  return (
    <>
      <div>
        <div>
          <h2 className="text-2xl text-white font-semibold">
            Coaching Experience
          </h2>
          <form
            className="my-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <textarea
              className="w-full text-black p-3 placeholder:text-black rounded-md"
              placeholder="Write Your coaching Experience "
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
            }}
          >
            <textarea
              className="w-full text-black p-3 placeholder:text-black rounded-md"
              placeholder="Tell us about your athlete "
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
          <h2 className="text-2xl text-white font-semibold">Session Plan </h2>
          <form
            className="my-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <textarea
              className="w-full text-black p-3 placeholder:text-black rounded-md"
              placeholder="Write about your session plans "
            />
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
