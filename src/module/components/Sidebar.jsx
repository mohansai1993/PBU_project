import React, { useState } from "react";

const Sidebar = ({ userList, handlePersonChat }) => {
  const [selectUser, setSelectUser] = useState(userList?.chats[0]?.athlete?.id);
  console.log(selectUser);
  return (
    <div className="bg-transparent min-w-[300px] p-2 ">
      {userList?.chats?.map((user) => (
        <div
          onClick={() => {
            setSelectUser(user.athlete.id);
            handlePersonChat(user.chatId, user.athlete.id);
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
