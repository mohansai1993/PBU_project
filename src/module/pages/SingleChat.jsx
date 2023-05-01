import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Messages from "../components/Messages";
import Input from "../components/Input";
import { auth, db, storage } from "../firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
function SingleChat({ coachId }) {
  const [messageId, setMessageId] = useState("null");
  const { currentUser } = useContext(AuthContext);
  const handelSelect = async () => {
    const combinedId =
      currentUser.userId > coachId
        ? currentUser.userId + coachId
        : coachId + currentUser.userId;
    console.log(combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: coachId,
            displayName: "user.displayName",
            photoURL: "user.photoURL",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", coachId), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      setMessageId(combinedId);
    } catch (error) {}
  };
  useEffect(() => {
    handelSelect();
  }, [currentUser]);
  return (
    <div>
      <div className="">
        <div className="h-[50px] bg-[#5d5b8d] items-center flex justify-between text-white  px-[10px]">
          <span>{currentUser?.email}</span>
          <div className="chatIcons"></div>
        </div>
        <Messages messageId={messageId} />
        <Input messageId={messageId} />
      </div>
    </div>
  );
}

export default SingleChat;
