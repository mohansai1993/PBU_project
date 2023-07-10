import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { imageOnError, isCoach } from "../utils";
import { useMutation, useQuery } from "@apollo/client";
import { Athlete, GetTop4Reviews } from "../graphql/query/Query";
import { Tab } from "@headlessui/react";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import {
  DeletePost,
  EditAthlete,
  PostFeed,
} from "../graphql/mutations/mutations";
import LoadingSVG from "../Components/Loading/LoadingSvg";
import LoadingSvg from "../Components/Loading/LoadingSvg";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { uploadImage, uploadImageFirebase } from "../config/api";
import ReviewModal from "../Components/Modal/ReviewModal";
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
                      onError={imageOnError}
                      className="rounded-md h-[100px] w-[100px] object-cover"
                    />
                    <div>
                      <h3 className="mb-2 text-3xl font-bold ">
                        {`${athlete?.getAthlete?.firstName} ${athlete?.getAthlete?.lastName}`}{" "}
                        <span className="text-xs ml-1 text-primary-green">
                          ({athlete?.getAthlete?.email})
                        </span>
                      </h3>
                      <h5>{athlete?.getAthlete?.game} </h5>
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
                          {value?.title}
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
              athlete={athlete?.getAthlete}
            />
          </Tab.Panel>
          <Tab.Panel>
            <TransactionPanel
              athleteId={currentUser?.userId}
              transactions={athlete?.getAthlete?.transactions}
            />
          </Tab.Panel>
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
  const { data: Reviews } = useQuery(GetTop4Reviews);
  const [deletePost] = useMutation(DeletePost);
  return (
    <>
      <div className="">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="md:flex text-white gap-5">
            <div className="flex-1">
              <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
                {" "}
                {athlete ? (
                  <>
                    <h3 className="my-3  text-2xl font-bold  ">Coach List </h3>
                    <div className="flex flex-col  gap-4">
                      {" "}
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
                  </>
                ) : (
                  <LoadingSvg />
                )}
              </div>
            </div>
            {/* <div className="flex-[0.6] mt-6">
              <div className="flex items-start  gap-4 bg-[#212F48] p-6 rounded-2xl  mb-6">
                <img
                  src={athlete?.profilePicture}
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
                      postFeed({
                        variables: {
                          post: values?.message,
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
              </div> */}

            {/* //Message  */}
            {/* <div className="grid gap-4"> */}
            {/* {athlete?.feed?.map((feed, index) => (
                  <div className="   bg-[#212F48] p-6 rounded-2xl " key={index}> */}
            {/* <div className="flex  justify-between w-full">
                      <div className="flex  gap-3">
                        <img
                          src={athlete?.profilePicture}
                          alt="new"
                          onError={imageOnError}
                          className="rounded-md h-[50px] w-[50px] object-cover"
                        />
                        <div className="w-full">
                          <h3 className="text-xl">
                            {athlete?.firstName + " " + athlete?.lastName}
                          </h3>

                          <h3 className="text-sm">{athlete?.game}</h3>
                        </div>
                      </div>
                      <AiFillDelete
                        size={24}
                        color={"#ed5e68"}
                        cursor={"pointer"}
                        onClick={() => {
                          deletePost({
                            variables: { postId: feed.id },
                            refetchQueries: [
                              {
                                query: Athlete,
                                variables: {
                                  email: currentUser?.email,
                                },
                              },
                            ],
                          })
                            .then(() => {})
                            .catch(() => {});
                        }}
                      />
                    </div> */}
            {/* <div>
                      <p className="py-4">{feed?.post}</p>
                      <div className="flex justify-between text-primary-green ">
                        <span>{moment(feed?.updatedAt).format("LLL")}</span>
                      </div>
                    </div>
                  </div> */}

            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

const SettingPanel = ({ editAthlete, athleteId, athlete }) => {
  const [File, setFile] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    game: Yup.string().required("Game is required"),
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
      game: athlete.game,
      firstName: athlete.firstName,
      lastName: athlete.lastName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", File);
      var path = null;

      if (!File) {
        path = athlete.profilePicture;
      } else {
        // path = await uploadImage(formData);
        // path = path.data?.fileName;
        path = await uploadImageFirebase(File);
      }

      console.log(path, {
        ...values,
        athleteId: athleteId,
        profilePicture: path,
      });
      editAthlete({
        variables: {
          ...values,
          athleteId: athleteId,
          profilePicture: path,
        },
        refetchQueries: [
          {
            query: Athlete,
            variables: {
              email: athlete.email,
            },
          },
        ],
      })
        .then(() => {
          Swal.fire(
            "Success!",
            "Athlete  profile updated successfully",
            "success"
          );
        })
        .catch(() => {});
      // Your form submission logic goes here
    },
  });

  return (
    <>
      <div className="">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl mb-2 text-primary-green  font-semibold leading-tight">
                Profile Setting
              </h2>
            </div>
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
                      value={formik.values?.firstName}
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
                      value={formik.values?.lastName}
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
                      value={formik.values?.game}
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
          </div>
        </div>
      </div>
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
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((value, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          className="flex items-center "
                          to={"/coach/" + value?.coach?.id}
                        >
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full object-cover "
                              src={value?.coach?.profilePicture}
                              onError={imageOnError}
                              alt=""
                            />
                          </div>
                          <div className="ml-3 text-gray-900 ">
                            {value?.coach?.firstName +
                              " " +
                              value?.coach?.lastName}
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${value?.sessionPlan?.price}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">USD</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(value?.sessionPlan?.createdAt).format("LL")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {value?.sessionPlan?.duration > 1
                            ? moment(value?.startTime, ["HH"]).format("hh A") +
                              " - " +
                              moment
                                .utc(
                                  value?.startTime +
                                    value?.sessionPlan?.duration,
                                  ["HH"]
                                )
                                .format("hh A")
                            : moment(value?.startTime, ["HH"]).format("hh A")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {moment.utc(value?.sessionDate).format("LL")}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        {" "}
                        <ReviewModal sessionId={value?.id} />
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

const TransactionPanel = ({ transactions, athleteId }) => {
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
                    {" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  text-white  uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  text-white  uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase text-white tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Booking Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((trans, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap capitalize">
                          {trans?.transactionType}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {trans?.status}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(trans?.date).format("LL")}
                        </p>
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
