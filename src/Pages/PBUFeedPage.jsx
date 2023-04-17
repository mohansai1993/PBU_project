import React from "react";
import { Tab } from "@headlessui/react";
import { TfiPencil } from "react-icons/tfi";
import { IoNavigate } from "react-icons/io5";
function PBUFeedPage() {
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
                  className="object-cover h-[250px] rounded-2xl mb-8 w-full"
                />
                <div className="flex  items-center  justify-between">
                  <div className="flex items-center  gap-4">
                    <img
                      src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                      className="rounded-md h-[100px] w-[100px]"
                    />
                    <div>
                      <h3 className="mb-2 text-3xl font-bold ">Leo Messy </h3>
                      <h5>Footballer</h5>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <button className="flex items-center  gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
                      <TfiPencil />
                      Edit Settings
                    </button>
                  </div>
                </div>
                <hr className="border-[#B8B8B8] my-6  "></hr>
              </div>
              <Tab.List className=" text-white  divide-x divide-[#B8B8B8]">
                <Tab className="text-primary-green px-3  ">Your Profile</Tab>
                <Tab className=" px-3 ">Message </Tab>
                <Tab className=" px-3 ">Setting</Tab>
              </Tab.List>
            </div>
            <Tab.Panels className=" mt-6 pb-6">
              <Tab.Panel>
                <ProfilePanel />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
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

const ProfilePanel = () => {
  return (
    <>
      <div>
        <div className="md:flex text-white gap-5">
          <div className="flex-[0.4]">
            <div className="bg-[#212F48] p-6 rounded-2xl mt-6">
              <h3 className="my-3  text-2xl font-bold  ">About Athlete</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet cons al Ofectetur. Pellentesque ipsum
                necat congue pretium cursus orci. It Commodo donec tellus lacus
                pellentesque sagittis habitant quam amet praesent.
              </p>
              <button className="flex items-center  gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
                <TfiPencil />
                Edit Settings
              </button>
              <div>
                <h3 className="my-4  text-2xl font-bold  ">Info</h3>
              </div>{" "}
              <ol className="flex flex-col gap-3">
                <li className="flex items-center gap-2 ">Footballer</li>{" "}
                <li className="flex items-center gap-2 ">9004573976</li>{" "}
                <li className="flex items-center gap-2 ">Demo@gmail.com</li>
                <li className="flex items-center gap-2 ">USA</li>
              </ol>
            </div>

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
            <div className="flex items-start  gap-4 bg-[#212F48] p-6 rounded-2xl  mb-6">
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                className="rounded-md h-[50px] w-[50px]"
              />
              <div className="w-full">
                <textarea
                  className="w-full p-3 placeholder:text-black rounded-md"
                  placeholder="Write here"
                />
              </div>{" "}
            </div>

            {/* //Message  */}
            <div className="  gap-4 bg-[#212F48] p-6 rounded-2xl ">
              <div className="flex  justify-between w-full">
                <div className="flex  gap-3">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                    className="rounded-md h-[50px] w-[50px]"
                  />
                  <div className="w-full">
                    <h3 className="text-xl">Lerio Mao</h3>
                    <h3 className="text-sm">Footballer</h3>
                  </div>
                </div>

                <button className="  gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
                  Message
                </button>
              </div>
              <div>
                <p className="py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  deserunt hic excepturi aspernatur itaque, alias voluptatem
                  placeat assumenda quidem at nulla ipsum error, labore voluptas
                  quis cumque similique sunt debitis.
                </p>
                <div className="flex justify-between text-primary-green ">
                  <span>Start Price $50</span>
                  <span>Book Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SettingPanel = () => {
  return (
    <>
      <form className="text-white grid grid-cols-2 gap-3 ">
        <div className="flex flex-col gap-3">
          <div>
            <label>Select Sport </label>
          </div>
          <select className=" p-3 rounded-md w-full text-black outline-none">
            <option>Select Sport</option> <option>Football</option>{" "}
            <option>Cricket</option>{" "}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Location </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <input
              type="search"
              name="q"
              className=" p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                          placeholder:text-primary-gray  "
              placeholder="Search Coach by Name"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Who's training? </label>
          </div>
          <select className=" p-3 rounded-md w-full text-black outline-none">
            <option>MySelf</option> <option>Child</option>{" "}
            <option>Other</option>{" "}
          </select>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Who's training? </label>
          </div>
          <input
            placeholder="Athlete Age"
            type="number"
            className=" p-3 rounded-md w-full text-black "
          ></input>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Gender </label>
          </div>
          <select className=" p-3 rounded-md w-full text-black outline-none">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Tell us your Training goals </label>
          </div>
          <textarea
            placeholder="Your Goals"
            type=""
            className=" p-3 rounded-md text-black w-full"
          ></textarea>
        </div>
        <div>
          <button className=" px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default PBUFeedPage;
