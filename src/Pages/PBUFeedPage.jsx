import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { TfiPencil } from "react-icons/tfi";
import { IoNavigate } from "react-icons/io5";
import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Couch } from "../graphql/query/Query";
import moment from "moment";
import { PostFeed } from "../graphql/mutations/mutations";

function PBUFeedPage() {
  let { id } = useParams();
  console.log(id);
  let { data: couch } = useQuery(Couch, {
    skip: !id,
    variables: {
      coachId: id,
    },
  });
  let [postFeed] = useMutation(PostFeed);

  console.log(couch);
  let Tabs = [
    {
      title: "Your Profile",
    },

    {
      title: "Setting",
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
                    <Tab as={Fragment}>
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
                <SettingPanel />
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

const SettingPanel = () => {
  const formik = useFormik({
    initialValues: {
      sport: "football",
      location: "",
      whoTraining: "myself",
      age: 10,
      gender: "male",
      goals: "",
    },

    onSubmit: (values) => {
      console.log(values);
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
            <label>Select Sport </label>
          </div>
          <div className="w-full">
            <select
              name="sport"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sport}
              className={`p-3 rounded-md w-full text-black outline-none`}
            >
              <option value="">Select Sport</option>
              <option value="football">Football</option>
              <option value="cricket">Cricket</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Location </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="search"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
              placeholder:text-primary-gray `}
                placeholder="Search Coach by Name"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Who's training? </label>
          </div>
          <div className="w-full">
            {" "}
            <select
              className=" p-3 rounded-md w-full text-black outline-none"
              name="whoTraining"
              value={formik.values.whoTraining}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Option</option>
              <option value="mySelf">MySelf</option>
              <option value="child">Child</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Age </label>
          </div>
          <input
            placeholder="Athlete Age"
            className=" p-3 rounded-md w-full text-black "
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          ></input>{" "}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Gender </label>
          </div>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" p-3 rounded-md w-full text-black outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>{" "}
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Tell us your Training goals </label>
          </div>
          <textarea
            placeholder="Your Goals"
            name="goals"
            value={formik.values.goals}
            onChange={formik.handleChange}
            className=" p-3 rounded-md text-black w-full"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className=" px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default PBUFeedPage;
