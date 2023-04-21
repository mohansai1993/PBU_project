import React from "react";
import { AiFillStar } from "react-icons/ai";
import bg_01 from "../../assets/bg-01.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Tab } from "@headlessui/react";
import { useQuery } from "@apollo/client";
import { Couch } from "../../graphql/query/Query";
import { useParams } from "react-router-dom";

function CoachDetails() {
  let { id } = useParams();
  console.log(id);
  let { data: couch } = useQuery(Couch, {
    variables: {
      coachId: id,
    },
  });
  console.log(couch?.getCoach);
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
                <CoachCard couch={couch} />

                <div>
                  <h3 className="font-semibold text-3xl text-white py-10 ">
                    Packages
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <PackageCard />
                    <PackageCard />
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white p-3 rounded-md">
                <div>
                  <h3 className="font-bold mb-3">
                    Questions For Joanne Dondero
                  </h3>
                  <button className="bg-primary-green text-white py-2  rounded-md min-w-[150px]">
                    Message
                  </button>
                  <h4 className="text-semibold my-3">Training Location</h4>
                </div>
                <iframe
                  id="gmap_canvas"
                  width={"100%"}
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
                I recently just moved to Joplin, MO after finishing two years of
                coaching at Poudre High School in Fort Collins, CO, coaching the
                varsity quarterbacks. I am also actively coaching athletes in
                individual sessions, as well as coaching multiple flag football
                teams in the offseason. At Lehigh, I helped younger quarterbacks
                and teammates transition from the high school game to Division 1
                competition (e.g. learning new offensive schemes/game plans,
                reading defenses, fundamentals, and more). I coached a family
                friend who played quarterback at the high school level while at
                Lehigh. I have had over 10 years of experience playing the
                position under top tier quarterback coaches (currently a
                Division 1AA head coach & Division 1AA OC, both with excellent
                careers themselves). I am really excited to coach football
                players of all ages!
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

const PackageCard = ({ couch }) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <h3 className="text-2xl font-bold  py-5">
        <span className="text-primary-green">PBU</span> Beginner
      </h3>
      <div>
        <ol className="flex flex-col gap-3">
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            You Keep 78% of Session Rate
          </li>
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            You Keep 78% of Session Rate
          </li>
          <li className="flex items-center gap-2 ">
            <IoIosArrowDroprightCircle
              className="text-primary-green "
              size={20}
            />{" "}
            You Keep 78% of Session Rate
          </li>
        </ol>
      </div>
      <button className="border border-black   text-black  py-2  rounded-md w-full my-5 ">
        $9.99 a Month
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
              src={couch.getCoach.profilePicture}
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

export default CoachDetails;
