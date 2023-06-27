import React, { useState } from "react";
import { imageOnError } from "../../utils";

const Sidebar = ({ userList, handlePersonChat, setAthleteProfile }) => {
  const [selectUser, setSelectUser] = useState(userList?.chats[0]?.athlete?.id);

  return (
    <div className="bg-transparent min-w-[300px] p-2 overflow-y-scroll h-[450px] ">
      {userList?.chats?.map((user) => (
        <div
          onClick={() => {
            setSelectUser(user.athlete.id);
            handlePersonChat(user.chatId, user.athlete.id);
            setAthleteProfile(user.athlete);
          }}
          className={`py-2  px-1   rounded-md hover:bg-primary-green hover:text-white cursor-pointer mb-2 ${
            selectUser == user.athlete.id
              ? "bg-primary-green text-white"
              : "bg-white"
          } `}
        >
          <div className="flex items-center gap-5">
            <img
              src={user.athlete.profilePicture}
              onError={imageOnError}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
            <div className="text-lg font-semibold">
              {user.athlete.firstName + " " + user.athlete.lastName}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
