import React, { useEffect, useState } from "react";
import { GetFeeds, GetTop4Reviews } from "../graphql/query/Query";
import { useLazyQuery, useQuery } from "@apollo/client";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { AiFillStar } from "react-icons/ai";
function FeedPage() {
  const [getFeedsByPage] = useLazyQuery(GetFeeds);
  const [Post, setPost] = useState([]);
  const { data: Reviews } = useQuery(GetTop4Reviews);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    handlePost();
  }, [Page]);
  const handlePost = () => {
    console.log(Page);
    getFeedsByPage({
      variables: {
        pageNumber: Page,
      },
    })
      .then(({ data }) => {
        setPost(data.getFeeds);
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
                      src={value.profilePicture}
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
            {/* //Message  */}
            {Post.map((feed, index) => (
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
                          : feed?.coach?.profilePicture
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
                </div>
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

export default FeedPage;
