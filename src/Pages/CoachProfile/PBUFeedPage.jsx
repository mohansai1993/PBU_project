import React, { Fragment, useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Couch } from "../../graphql/query/Query";
import { PostFeed, EditCoach } from "../../graphql/mutations/mutations";
import MultiChat from "../../module/pages/MultiChat";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
import AboutPanel from "./AboutPanel";
import AvaibilityPanel from "./AvaibilityPanel";
import CoachingPanel from "./CoachingPanel";
import SettingPanel from "./SettingPanel";
import ProfilePanel from "./ProfilePanel";

function PBUFeedPage() {
  let { id } = useParams();

  let { data: couch, loading } = useQuery(Couch, {
    skip: !id,
    variables: {
      coachId: id,
    },
  });
  let [postFeed] = useMutation(PostFeed);
  let [editCoach] = useMutation(EditCoach);
  let Tabs = [
    {
      title: "Your Profile",
    },

    {
      title: "Profile Setting",
    },
    {
      title: "Availability",
    },
    {
      title: "Coaching",
    },
    {
      title: "About",
    },
    {
      title: "Chats",
    },
  ];

  return (
    <div className="bg-[#152033]">
      <div className="container">
        <div>
          <Tab.Group>
            {" "}
            <div className="bg-[#212F48] p-6 rounded-2xl ">
              {loading ? (
                <LoadingSVG />
              ) : (
                <>
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
                          <h5>{couch?.getCoach?.game} </h5>
                        </div>
                      </div>
                    </div>
                    <hr className="border-[#B8B8B8] my-6  "></hr>
                  </div>
                  <Tab.List className=" text-white  divide-x divide-[#B8B8B8]">
                    {Tabs.map((value, index) => (
                      <>
                        <Tab
                          as={Fragment}
                          className="cursor-pointer"
                          index={index}
                        >
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
                </>
              )}
            </div>
            <Tab.Panels className=" mt-6 pb-6">
              <Tab.Panel>
                <ProfilePanel postFeed={postFeed} couch={couch?.getCoach} />
              </Tab.Panel>
              <Tab.Panel>
                <SettingPanel
                  editCoach={editCoach}
                  coachId={id}
                  couch={couch?.getCoach}
                />
              </Tab.Panel>
              <Tab.Panel>
                <AvaibilityPanel
                  coachId={id}
                  openingHours={couch?.getCoach?.openingHours}
                  loading={loading}
                />
              </Tab.Panel>
              {/* /Transaction */}
              <Tab.Panel>
                <CoachingPanel
                  coachId={id}
                  coachings={couch?.getCoach?.coachingLocation}
                />
              </Tab.Panel>{" "}
              <Tab.Panel>
                <AboutPanel coachId={id} values={couch?.getCoach} />
              </Tab.Panel>
              <Tab.Panel>
                <MultiChat couch={couch} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default PBUFeedPage;
