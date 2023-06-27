import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { Couches } from "../graphql/query/Query";
import { Link } from "react-router-dom";
import Default from "../assets/default.png";
import { imageOnError } from "../utils";
function FindCoach() {
  let { data: coaches } = useQuery(Couches);
  console.log(coaches);
  return (
    <div className="bg-[#152033] ">
      <div className="container">
        <div>
          <div className="py-10">
            <h3 className="font-semibold text-3xl text-white py-10 ">
              Coach <span className="text-primary-green">Near by You</span>
            </h3>
            <div className="grid  md:grid-cols-2 gap-4">
              {coaches?.getCoaches?.map((value, index) => (
                <Link to={"/coach/" + value?.id}>
                  <CoachCard key={index} value={value} index={index} />
                </Link>
              ))}
            </div>

            <div className="flex justify-center py-10">
              <button className="bg-primary-green text-white py-2  rounded-md min-w-[150px]">
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CoachCard = ({ value, index }) => {
  return (
    <>
      <div
        key={index}
        className="p-7 bg-[#212F48] gap-5 rounded-lg grid grid-cols-3 cursor-pointer h-full"
      >
        <div className="">
          <img
            src={value?.profilePicture}
            onError={imageOnError}
            className="object-cover w-full rounded-xl h-[200px] "
            alt=""
          />
        </div>
        <div className="text-white flex flex-col gap-3 col-span-2 ">
          <h4 className="text-2xl font-bold ">
            {value?.firstName + " " + value?.lastName}
          </h4>
          <h5 className="text-primary-green capitalize font-semibold ">
            ready to complete training
          </h5>
          <div className="flex ">
            <div className="flex  items-center  ">
              {Array(parseInt(value?.averageRating)).fill(
                <span>
                  <AiFillStar size={25} className="text-yellow-400" />
                </span>
              )}
              {Array(5 - parseInt(value?.averageRating)).fill(
                <div>
                  <AiFillStar
                    size={25}
                    className=" text-[#9d9d9d33] 
                    "
                  />
                </div>
              )}
            </div>
            <span className="text-[10px]  items-center flex ml-2">
              ({value?.totalReviews} Reviews)
            </span>
          </div>
          <p className="line-clamp-3">{value?.about}</p>
        </div>
      </div>
    </>
  );
};

export default FindCoach;
