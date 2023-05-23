import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isCoach } from "../utils";
import { useMutation, useQuery } from "@apollo/client";
import { Athlete } from "../graphql/query/Query";
import { Tab } from "@headlessui/react";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { EditAthlete, PostFeed } from "../graphql/mutations/mutations";
import { IoNavigate } from "react-icons/io5";
import MultiChat from "../module/pages/MultiChat";
import Loading from "../Components/Loading/Loading";
import LoadingSVG from "../Components/Loading/LoadingSvg";
import LoadingSvg from "../Components/Loading/LoadingSvg";

function UserProfile() {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  let [postFeed] = useMutation(PostFeed);
  let [editAthlete] = useMutation(EditAthlete);
  const navigate = useNavigate();
  useEffect(() => {
    if (isCoach()) {
      alert("You are not an Athlete");
      navigate("/");
    }
  }, []);
  let { data: athlete, loading } = useQuery(Athlete, {
    skip: !id,
    variables: {
      email: currentUser?.email,
    },
  });

  console.log(athlete?.getAthlete?.sessions);

  let Tabs = [
    {
      title: "Your Profile",
    },

    {
      title: "Profile Setting",
    },

    {
      title: "Transaction History",
    },
    {
      title: "Booking",
    },
  ];
  return (
    <div className="bg-[#152033]">
      {" "}
      <Tab.Group>
        <div className="bg-[#212F48] p-6 rounded-2xl ">
          {!loading ? (
            <div>
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
                      src={athlete?.getAthlete?.profilePicture}
                      className="rounded-md h-[100px] w-[100px] object-cover"
                    />
                    <div>
                      <h3 className="mb-2 text-3xl font-bold ">{`${athlete?.getAthlete?.firstName} ${athlete?.getAthlete?.lastName}`}</h3>
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
          ) : (
            <LoadingSVG />
          )}
        </div>

        <div></div>
        <Tab.Panels className=" mt-6 pb-6">
          <Tab.Panel>
            <ProfilePanel postFeed={postFeed} athlete={athlete?.getAthlete} />
          </Tab.Panel>{" "}
          <Tab.Panel>
            <SettingPanel
              editAthlete={editAthlete}
              athleteId={currentUser?.userId}
            />
          </Tab.Panel>
          <Tab.Panel>Transaction</Tab.Panel>
          <Tab.Panel>
            <BookingPanel bookings={athlete?.getAthlete?.sessions} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const ProfilePanel = ({ athlete, postFeed }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div>
        <div className="md:flex text-white gap-5">
          <div className="flex-[0.4]">
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              {athlete ? (
                <div>
                  <div>
                    <h3 className="my-4  text-2xl font-bold  ">Info</h3>
                  </div>{" "}
                  <ol className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 ">
                      Skill Level:{" "}
                      <span className="text-primary-green font-semibold">
                        {athlete?.skillLevel?.name}
                      </span>
                    </li>
                    <li className="flex items-center gap-2 ">
                      Phone:{" "}
                      <span className="text-primary-green font-semibold">
                        {athlete?.contactDetails?.number}
                      </span>
                    </li>{" "}
                    <li className="flex items-center gap-2 ">
                      Email:
                      <span className="text-primary-green font-semibold">
                        {athlete?.email}
                      </span>
                    </li>
                  </ol>
                </div>
              ) : (
                <LoadingSVG />
              )}
            </div>

            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              {" "}
              {athlete ? (
                <>
                  <h3 className="my-3  text-2xl font-bold  ">Coach List </h3>
                  <div className="flex flex-col  gap-4">
                    {" "}
                    <div className="flex items-center  gap-4">
                      <img
                        src={athlete?.profilePicture}
                        className="rounded-md h-[50px] w-[50px]"
                        alt="picture"
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
                </>
              ) : (
                <LoadingSvg />
              )}
            </div>
          </div>
          <div className="flex-[0.6] mt-6">
            <div className="flex items-start  gap-4 bg-[#212F48] p-6 rounded-2xl  mb-6">
              <img
                src={athlete?.profilePicture}
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
                    postFeed({
                      variables: {
                        post: values.message,
                        athleteId: athlete?.id,
                        postBy: "athlete",
                      },
                      refetchQueries: [
                        {
                          query: Athlete,
                          variables: {
                            email: currentUser?.email,
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
              {athlete?.feed?.map((feed, index) => (
                <div className="   bg-[#212F48] p-6 rounded-2xl ">
                  <div className="flex  justify-between w-full">
                    <div className="flex  gap-3">
                      <img
                        src={athlete?.profilePicture}
                        className="rounded-md h-[50px] w-[50px] object-cover"
                      />
                      <div className="w-full">
                        <h3 className="text-xl">
                          {athlete?.firstName + " " + athlete?.lastName}
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

const SettingPanel = ({ editAthlete, athleteId }) => {
  const [File, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      profilePicture: null,
      game: "foostball",
      firstName: "new",
      lastName: "sfsdf",
      street: "ghjgjgh",
      city: "fghfghfg",
      state: "fghfghfg",
      country: "hgfhfghfg",
      pinCode: "123456789",
    },

    onSubmit: (values) => {
      editAthlete({
        variables: {
          athleteId: athleteId,
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
                name="firstName"
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
                name="lastName"
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
                name="city"
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
                name="state"
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
                name="country"
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
                name="pinCode"
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
                name="street"
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

const BookingPanel = ({ bookings }) => {
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl text-primary-green  font-semibold leading-tight">
              Booking
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-[#212F48]">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  text-white  uppercase tracking-wider">
                      Coach
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase text-white tracking-wider">
                      Plan
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Booking Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Appointment Time
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Appointment Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white " />
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((value, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link className="flex" to={"/coach/" + value.coach.id}>
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full object-cover "
                              src={value.coach.profilePicture}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {value.coach.firstName +
                                " " +
                                value.coach.lastName}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap"></p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${value.sessionPlan?.price}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(value.sessionPlan?.createdAt).format("LL")}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">
                          Due in{" "}
                          {moment(value.sessionPlan?.createdAt).diff(
                            moment(value.sessionDate),
                            "days"
                          )}{" "}
                          days
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {value.sessionPlan?.duration > 1
                            ? moment(value.startTime, ["HH"]).format("hh A") +
                              " - " +
                              moment
                                .utc(
                                  value?.startTime +
                                    value.sessionPlan?.duration,
                                  ["HH"]
                                )
                                .format("hh A")
                            : moment(value?.startTime, ["HH"]).format("hh A")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {moment.utc(value.sessionDate).format("LL")}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:"
                        >
                          <svg
                            className="inline-block h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
