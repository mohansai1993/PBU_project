import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Default from "../../assets/default.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Tab } from "@headlessui/react";
import { useQuery } from "@apollo/client";
import { Couch } from "../../graphql/query/Query";
import { useParams } from "react-router-dom";
import SessionPurchaseModal from "../../Components/Modal/SessionPurchaseModal";
import SingleChat from "../../module/pages/SingleChat";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
import PBUGoogleMap from "../../Components/Maps/Map";
import ReviewModal from "../../Components/Modal/ReviewModal";

function CoachDetails() {
  let { id } = useParams();
  const { render, latLong } = PBUGoogleMap();

  console.log(id);
  let { data: couch, loading } = useQuery(Couch, {
    skip: !id,
    variables: {
      coachId: id,
    },
  });
  console.log(couch);

  return (
    <>
      <div className="bg-[#152033]">
        <div className="container ">
          <div className="pb-16">
            <h3 className="font-semibold text-3xl text-white py-10 ">
              Coach <span className="text-primary-green">Near by You</span>
            </h3>
            {loading ? (
              <LoadingSVG />
            ) : (
              <div className="md:flex gap-4">
                <div className="flex-1 mb-4">
                  {couch?.getCoach && <CoachCard couch={couch} />}
                  <div>
                    <h3 className="font-semibold text-3xl text-white py-10 ">
                      Session Plans
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {couch?.getCoach?.sessionPlans.map((value, index) => (
                        <PackageCard
                          openingHours={couch?.getCoach?.openingHours}
                          coachId={couch?.getCoach?.id}
                          bookingSession={couch?.getCoach?.sessions}
                          value={value}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-md">
                  <div>
                    <h3 className="font-bold mb-3">
                      Questions For {couch?.getCoach?.firstName}{" "}
                      {couch?.getCoach?.lastName}
                    </h3>

                    <SingleChat couch={couch} />
                    <h4 className="text-semibold my-3">Training Location</h4>
                  </div>

                  {console.log(couch?.getCoach?.coachingLocation)}
                  {render({
                    marker: {
                      draggable: false,
                      positions: couch?.getCoach?.coachingLocation?.map(
                        (marker) => ({
                          __typename: marker.location.__typename,
                          lat: marker.location.latitude,
                          lng: marker.location.longitude,
                          street: marker.street,
                        })
                      ),
                    },
                    isCenter: true,
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pb-16 bg-white container ">
        <h3 className="font-semibold text-3xl  py-10 ">
          More About Coach{" "}
          <span className="text-primary-green">
            {couch?.getCoach?.firstName} {couch?.getCoach?.lastName}
          </span>
        </h3>
        <div>
          <Tab.Group>
            <Tab.List className="flex gap-3">
              <Tab className="bg-primary-green text-white  rounded-md p-5">
                Coaching Experience
              </Tab>
              <Tab className="bg-primary-green text-white  rounded-md p-5">
                Athletic Highlights
              </Tab>
            </Tab.List>
            <Tab.Panels className="my-6 leading-loose">
              <Tab.Panel>{couch?.getCoach?.coachingExperience}</Tab.Panel>
              <Tab.Panel>{couch?.getCoach?.highlights}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}

const PackageCard = ({ value, openingHours, coachId, bookingSession }) => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white p-4 rounded-md">
      <h3 className="text-2xl font-bold  py-5">
        <span className="text-primary-green">Session</span> for{" "}
        {value.forPeople} pepole
      </h3>
      <div>
        <ol className="flex flex-col gap-3">
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            You will take {value.duration} Hour.
          </li>
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            {value.forPeople} people can join.
          </li>
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            You can discuss with the coach.
          </li>
        </ol>
      </div>
      <SessionPurchaseModal
        openingHours={openingHours}
        packageValue={value}
        coachId={coachId}
        isOpen={isOpen}
        bookingSession={bookingSession}
        setIsOpen={setIsOpen}
      />{" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-black hover:bg-primary-green hover:text-white hover:border-white font-semibold   text-black  py-2  rounded-md w-full my-5 "
      >
        ${value.price} for session
      </button>
    </div>
  );
};
const CoachCard = ({ couch }) => {
  return (
    <>
      <div>
        <div className="p-7 bg-[#35A80778] gap-5 rounded-lg flex cursor-pointer">
          <div>
            <img
              src={couch?.getCoach?.profilePicture}
              className="object-cover w-[400px] rounded-xl  h-full"
              alt={"profile"}
              src={
                couch?.getCoach?.profilePicture
                  ? couch?.getCoach?.profilePicture
                  : Default
              }
            />
          </div>
          <div className="text-white flex flex-col gap-3 ">
            <h4 className="text-2xl font-bold ">
              {couch?.getCoach?.firstName} {couch?.getCoach?.lastName}
            </h4>

            <h5 className="text-primary-green capitalize font-semibold ">
              ready to complete training
            </h5>

            <div className="flex ">
              {Array(parseInt(couch?.getCoach?.averageRating)).fill(
                <span>
                  <AiFillStar size={25} className="text-yellow-400" />
                </span>
              )}
              {Array(5 - parseInt(couch?.getCoach?.averageRating)).fill(
                <span>
                  <AiFillStar size={25} className="text-gray-200" />
                </span>
              )}
            </div>

            <p>{couch?.getCoach?.about}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetails;
