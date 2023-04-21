import React from "react";
import { GetFeeds } from "../graphql/query/Query";
import { useQuery } from "@apollo/client";
import moment from "moment/moment";
import { Link } from "react-router-dom";

function FeedPage() {
  const { data: getFeeds } = useQuery(GetFeeds);
  console.log(getFeeds);
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
            {/* //Message  */}
            {getFeeds?.getFeeds.map((feed, index) => (
              <div
                key={index}
                className="mb-4 gap-4 bg-[#212F48] p-6 rounded-2xl "
              >
                <div className="flex  justify-between w-full">
                  <div className="flex  gap-3">
                    <img
                      src={
                        feed.postBy === "athlete"
                          ? feed?.athlete?.profilePicture
                          : feed?.coach?.profilePicture
                      }
                      width={"50px"}
                      className="bg-cover rounded-full"
                    />
                    <div className="w-full">
                      <h3 className="text-xl">
                        {feed.postBy === "athlete"
                          ? feed?.athlete?.firstName
                          : feed?.coach?.firstName}
                      </h3>
                      <h3 className="text-sm capitalize">{feed?.postBy}</h3>
                    </div>
                  </div>

                  {feed.postBy === "coach" && (
                    <button className="  gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
                      Message
                    </button>
                  )}
                </div>
                <div>
                  <p className="py-4">{feed.post}</p>
                  <div className="flex justify-between text-primary-green ">
                    <span>{moment(feed.updatedAt).format("LL")}</span>
                    {feed.postBy === "coach" && (
                      <Link to={"/coach/" + feed.id}>
                        <span>Book Now</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default FeedPage;
