import React from "react";
import { AiFillStar } from "react-icons/ai";
import bg_01 from "../assets/bg-01.png";
function FindCoach() {
  return (
    <div className="bg-[#152033] ">
      <div className="container">
        <div>
          <div className="py-10">
            <h3 className="font-semibold text-3xl text-white py-10 ">
              Coach <span className="text-primary-green">Near by You</span>
            </h3>
            <div className="grid  md:grid-cols-2 gap-4">
              <CoachCard />
              <CoachCard />
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

const CoachCard = () => {
  return (
    <>
      <div>
        <div className="p-7 bg-[#212F48] gap-5 rounded-lg flex cursor-pointer">
          <div>
            <img
              src={bg_01}
              className="object-cover w-[400px] rounded-xl  h-full"
            />
          </div>
          <div className="text-white flex flex-col gap-3 ">
            <h4 className="text-2xl font-bold ">Hanry Som</h4>
            <h5 className="text-primary-green capitalize font-semibold ">
              ready to complete training
            </h5>
            <div className="flex ">
              <span>
                <AiFillStar size={25} className="text-yellow-400" />
              </span>
              <span>
                <AiFillStar size={25} className="text-yellow-400" />
              </span>
              <span>
                <AiFillStar size={25} className="text-yellow-400" />
              </span>
              <span>
                <AiFillStar size={25} className="text-yellow-400" />
              </span>
              <span>
                <AiFillStar size={25} className="text-yellow-400" />
              </span>
            </div>
            <p>
              Former Division 1 Quarterback | Former Poudre Varsity Quarterbacks
              Coach Student of the game is who excited to help athletes learn,
              compete, and reach whatever their ceiling is!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCoach;
