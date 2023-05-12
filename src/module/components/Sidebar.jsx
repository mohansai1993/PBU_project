import React from "react";

const Sidebar = ({ userList, handlePersonChat }) => {
  return (
    <div className="bg-white min-w-[300px] p-5 border">
      {userList?.chats?.map((user) => (
        <div
          onClick={() => handlePersonChat(user.chatId, user.athlete.id)}
          className=" border-b-2 py-2  px-1 rounded-md hover:bg-primary-green hover:text-white cursor-pointer"
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
