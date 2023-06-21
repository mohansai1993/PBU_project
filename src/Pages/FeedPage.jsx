import React, { useContext, useEffect, useState } from "react";
import { GetFeeds, GetTop4Reviews } from "../graphql/query/Query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { AiFillStar } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CommentOnPost } from "../graphql/mutations/mutations";
import { AuthContext } from "../context/AuthContext";
import Default from "../assets/default.png";
import Swal from "sweetalert2";
function FeedPage() {
  const [getFeedsByPage, { loading }] = useLazyQuery(GetFeeds);
  const [Post, setPost] = useState([]);
  const { data: Reviews } = useQuery(GetTop4Reviews);
  const [Page, setPage] = useState(1);
  const { data: getFeeds } = useQuery(GetFeeds, {
    variables: {
      pageNumber: Page,
    },
  });

  useEffect(() => {
    handlePost();
  }, [Page, loading, getFeeds]);

  const handlePost = () => {
    getFeedsByPage({
      variables: {
        pageNumber: Page,
      },
    })
      .then(({ data }) => {
        console.log(data);

        setPost(getFeeds?.getFeeds);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (!Post) {
    return <Loading />;
  }

  return (
    <div className="bg-[#152033]">
      <div>
        {" "}
        <div className="md:flex text-white gap-5">
          <div className="flex-[0.4]">
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              {" "}
              <h3 className="my-3  text-2xl font-bold  ">Coach List </h3>
              <div className="flex flex-col  gap-4">
                {" "}
                {Reviews?.getTop4Reviews?.map((value, index) => (
                  <div className="flex items-center  gap-4" key={index}>
                    <img
                      src={
                        value.profilePicture ? value.profilePicture : Default
                      }
                      alt={value.firstName}
                      className="rounded-full  object-cover h-[50px] w-[50px]"
                    />
                    <div>
                      <div>
                        <h3 className="mb-1 text-xl font-bold ">
                          {value.firstName + " " + value.lastName}
                        </h3>
                        <div className="flex ">
                          {Array(parseInt(value.averageRating)).fill(
                            <span>
                              <AiFillStar
                                size={15}
                                className="text-yellow-400"
                              />
                            </span>
                          )}
                          {Array(5 - parseInt(value.averageRating)).fill(
                            <span>
                              <AiFillStar size={15} className="text-gray-200" />
                            </span>
                          )}
                        </div>
                      </div>{" "}
                      <Link to={"/coach/" + value.id}>
                        <span className="text-primary-green">Book Now</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-[0.6] mt-6 ">
            {console.log(Post)}
            {/* //Message  */}
            {Post?.map((feed, index) => (
              <div
                key={index}
                className="mb-4 gap-4 bg-[#212F48] p-6 rounded-2xl "
              >
                <div className="flex  justify-between w-full">
                  <div className="flex  gap-2">
                    <img
                      src={
                        feed.postBy === "athlete"
                          ? feed?.athlete?.profilePicture
                            ? feed?.athlete?.profilePicture
                            : Default
                          : feed?.coach?.profilePicture
                          ? feed?.coach?.profilePicture
                          : Default
                      }
                      alt="dsf"
                      className="rounded-full  object-cover h-[50px] w-[50px]"
                    />

                    <div>
                      <h3 className="text-xl">
                        {feed.postBy === "athlete"
                          ? feed?.athlete?.firstName
                          : feed?.coach?.firstName}
                      </h3>
                      <h3 className="text-sm capitalize">{feed?.postBy}</h3>
                    </div>
                  </div>

                  {feed.postBy === "coach" && (
                    <Link to={"/coach/" + feed.coach.id}>
                      <button className="  gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
                        Message
                      </button>
                    </Link>
                  )}
                </div>
                <div>
                  <p className="py-4">{feed.post}</p>
                  <div className="flex justify-between text-primary-green ">
                    <span>{moment(feed.updatedAt).format("LL")}</span>
                    {feed.postBy === "coach" && (
                      <Link to={"/coach/" + feed.coach.id}>
                        <span>Book Now</span>
                      </Link>
                    )}
                  </div>
                </div>{" "}
                <CommentPanel
                  comments={feed?.comments}
                  feedId={feed?.id}
                  handlePost={handlePost}
                  Page={Page}
                />
              </div>
            ))}
            <div className="py-10 flex justify-center ">
              <button
                className=" bg-primary-green rounded-md  px-10 text-white py-2"
                onClick={() => {
                  setPage(Page + 1);
                  console.log(Page);
                  handlePost();
                }}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

const CommentPanel = ({ comments, feedId, handlePost, Page }) => {
  const [openComment, setOpenComment] = useState(false);
  const [commentOnPost] = useMutation(CommentOnPost);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.userType);
  return (
    <>
      <div>
        <div className="flex justify-between text-white text-xs mt-3 cursor-pointer hover:text-primary-green">
          <span onClick={() => setOpenComment(!openComment)}>
            <span> Comments</span>
          </span>
        </div>
        {openComment ? (
          <>
            {" "}
            <div className="p-6 mb-6 text-base">
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
                    commentOnPost({
                      variables: {
                        comment: values.message,
                        athleteId: !currentUser?.userType
                          ? currentUser?.userId
                          : null,
                        coachId: currentUser?.userType
                          ? currentUser?.userId
                          : null,
                        commentBy: currentUser?.userType,
                        feedId: feedId,
                      },
                      refetchQueries: [
                        {
                          query: GetFeeds,
                          variables: {
                            pageNumber: Page,
                          },
                        },
                      ],
                    })
                      .then((data) => {
                        console.log(data);
                        handlePost();
                        Swal.fire({
                          title: "Successfully",
                          text: "Comment has posted successfully",
                        });
                      })
                      .catch((err) => {
                        Swal.fire({
                          title: "Warning",
                          text: err?.message,
                        });
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
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
                            placeholder="Write comment here..."
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
                        {isSubmitting ? "Submitting..." : "Comment"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div>
              {comments?.map((comment, index) => (
                <>
                  <article className="p-6 mb-6 text-base" key={index}>
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-white">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={
                              comment?.[comment?.commentBy].profilePicture
                                ? comment?.[comment?.commentBy].profilePicture
                                : Default
                            }
                            alt="Bonnie Green"
                          />
                          {comment?.[comment?.commentBy].firstName +
                            " " +
                            comment?.[comment?.commentBy].lastName}
                        </p>
                        <p className="text-sm text-primary-green ">
                          <time
                            pubdate
                            dateTime="2022-03-12"
                            title="March 12th, 2022"
                          >
                            {moment(comment?.createdAt).format("LL")}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-300 ">{comment?.comment}</p>
                  </article>
                </>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default FeedPage;
