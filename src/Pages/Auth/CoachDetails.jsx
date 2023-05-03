import React, { useContext, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import bg_01 from "../../assets/bg-01.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Tab } from "@headlessui/react";
import { useQuery } from "@apollo/client";
import { Couch } from "../../graphql/query/Query";
import { useParams } from "react-router-dom";
import SessionPurchaseModal from "../../Components/Modal/SessionPurchaseModal";
import AppoitmentBooking from "../../Components/AppoitmentBooking/AppoitmentBooking";
import SingleChat from "../../module/pages/SingleChat";

function CoachDetails() {
  let { id } = useParams();

  console.log(id);
  let { data: couch } = useQuery(Couch, {
    skip: !id,
    variables: {
      coachId: id,
    },
  });
  return (
    <>
      <div className="bg-[#152033]">
        <div className="container ">
          <div className="pb-16">
            <h3 className="font-semibold text-3xl text-white py-10 ">
              Coach <span className="text-primary-green">Near by You</span>
            </h3>
            <div className="md:flex gap-4">
              <div className="flex-1 mb-4">
                {couch?.getCoach && <CoachCard couch={couch} />}

                <div>
                  <h3 className="font-semibold text-3xl text-white py-10 ">
                    Session Plans
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {couch?.getCoach?.sessionPlans.map((value, index) => (
                      <PackageCard value={value} key={index} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white p-3 rounded-md">
                <div>
                  <h3 className="font-bold mb-3">
                    Questions For Joanne Dondero
                  </h3>

                  <SingleChat couch={couch} />
                  <h4 className="text-semibold my-3">Training Location</h4>
                </div>
                <iframe
                  id="gmap_canvas"
                  width={"100%"}
                  title="canvas"
                  height={"70%"}
                  src="https://maps.google.com/maps?q=california&t=&z=10&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-16 bg-white container ">
        <h3 className="font-semibold text-3xl  py-10 ">
          More About Coach{" "}
          <span className="text-primary-green">Joanne Dondero </span>
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
              <Tab className="bg-primary-green text-white  rounded-md p-5">
                Session Plan
              </Tab>
            </Tab.List>
            <Tab.Panels className="my-6 leading-loose">
              <Tab.Panel>
                {/* I recently just moved to Joplin, MO after finishing two years of
                coaching at Poudre High School in Fort Collins, CO, coaching the
                varsity quarterbacks. I am also actively coaching athletes in
                 */}
                <AppoitmentBooking />
              </Tab.Panel>
              <Tab.Panel>
                me to Division 1 competition (e.g. learning new offensive
                schemes/game plans, reading defenses, fundamentals, and more). I
                coached a family friend who played quarterback at the high
                school level while at Lehigh. I have had over 10 years of
                experience playing the position under top tier quarterback
                coaches (currently a Division 1AA head coach & Division 1AA OC,
                both with excellent careers themselves). I am really excited to
                coach football players of all ages!
              </Tab.Panel>
              <Tab.Panel>
                I recently just moved to Joplin, MO after finishing two years of
                coaching at Poudre High School in Fort Collins, CO, coaching the
                varsity quarterbacks. I am also actively coaching athletes in
                individual sessions, as well as coaching multiple flag football
                t players of all ages!
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}

const PackageCard = ({ value }) => {
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
        value={value}
        isOpen={isOpen}
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
