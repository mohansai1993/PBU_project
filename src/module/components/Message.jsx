import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-[20px] mb-[20px] ${
        message.senderId === currentUser.userId && "owner"
      }`}
    >
      <div className="flex flex-col  text-gray font-300">
        <img
          className="h-[40px] w-[40px] rounded-full object-cover"
          src={
            message.senderId === currentUser.userId
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-[10px]">
        <p className="bg-white px-[10px] py-[20px] rounded-md max-w-fit">
          {message.text}
        </p>
        {message.img && <img src={message.img} className="w-1/2" alt="" />}
      </div>
    </div>
  );
}

export default Message;
