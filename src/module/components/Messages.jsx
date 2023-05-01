import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";
function Messages({ messageId }) {
  const [messages, setMessages] = useState([]);

  let data = { chatId: messageId };

  useEffect(() => {
    return () => {
      onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    };
  }, [data.chatId]);

  console.log(messages);
  return (
    <div className="bg-[#ddddf7] p-[10px] overflow-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages;
