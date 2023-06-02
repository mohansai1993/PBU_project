import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useQuery } from "@apollo/client";
import { Couch } from "../../graphql/query/Query";
function MultiChat({ couch }) {
  const [roomId, setRoomId] = React.useState("");
  const [athleteId, setAthleteId] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const { data: getChatUser } = useQuery(Couch, {
    skip: !couch?.getCoach?.id,
    variables: {
      coachId: couch?.getCoach?.id,
    },
  });

  const RoomList = [
    {
      athlete: "64522604b36e0d952fc2fd7c",
      roomId: "64522604b36e0d952fc2fd7c645226890355497bc3420260",
    },
    {
      athlete: "64522604b36e0d952fc2fd7c",
      roomId: "64522604b36e0d952fc2fd7c645226890355497bc3420260",
    },
  ];

  useEffect(() => {
    return () => {};
  }, []);

  // const [userList, setUserList] = React.useState([]);
  const scrollToBottom = () => {
    var objDiv = document.getElementById("messages");
    if (objDiv) {
      objDiv.scrollTop = objDiv?.scrollHeight;
    }
  };

  function getMessages(roomId) {
    return onSnapshot(
      query(
        collection(db, "chats", roomId, "messages"),
        orderBy("time", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setMessages(messages);
      }
    );
  }

  const handlePersonChat = async (roomid, athleteId) => {
    const chats_ref = doc(db, "chats", roomid);

    const myId = couch?.getCoach?.id;

    const docSnap = await getDoc(chats_ref);
    setRoomId(roomid);
    getMessages(roomid);
    setAthleteId(athleteId);
    console.log(docSnap);

    if (docSnap.exists()) {
      updateDoc(chats_ref, {
        [myId]: {
          unread_count: 0,
        },
      });
    } else {
      await setDoc(chats_ref, {
        [myId]: {
          unread_count: 0,
        },
      });
    }
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };
  const updateUnreadCount = async () => {
    const chats_ref = doc(db, "chats", roomId);
    const partnerId = couch?.getCoach?.id;
    const docSnap = await getDoc(chats_ref);

    if (docSnap.exists()) {
      let roomDetail = docSnap.data();
      let partnerUnreadCount =
        roomDetail &&
        roomDetail[partnerId] &&
        roomDetail[partnerId].unread_count;
      updateDoc(chats_ref, {
        [partnerId]: {
          unread_count: partnerUnreadCount ? partnerUnreadCount + 1 : 1,
        },
      }).then(() => {});
    } else {
      await setDoc(chats_ref, {
        [partnerId]: {
          unread_count: 1,
        },
      }).then(() => {
        console.log("unread count added");
      });
    }
  };

  const sendMsg = async (e) => {
    e.preventDefault();
    const msg = message.trim();
    console.log();
    if (msg) {
      const msgObj = {
        time: Timestamp.now(),
        message: msg,
        sender: couch?.getCoach?.id,
        receiver: athleteId,
      };
      console.log(msgObj);
      setMessages((oldArray) => [...oldArray, msgObj]);
      updateUnreadCount();
      setTimeout(() => {
        scrollToBottom();
      }, 500);
      try {
        await addDoc(collection(db, "chats", roomId, "messages"), msgObj);
      } catch (error) {
        console.error(error);
      }
      setMessage("");
    } else {
      setMessage("");
    }
  };
  return (
    <div>
      <div className="px-5 py-5 bg-[#212f48] rounded-t-md flex text-white   justify-between items-center ">
        <div className="font-semibold text-2xl">PBallu Chat</div>
        <div className="w-1/2" />
        <div className=" p-2   ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={couch?.getCoach?.profilePicture}
          />
        </div>
      </div>

      <div className="flex">
        <Sidebar
          couch={couch}
          handlePersonChat={handlePersonChat}
          userList={getChatUser?.getCoach}
        />
        <div className="flex-1">
          <div
            id="messages"
            class="bg-white h-[400px] px-5  flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages?.map((msg, i) => (
              <>
                {msg.sender === couch?.getCoach?.id ? (
                  <div key={i} class="chat-message">
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary-green  text-white ">
                            {msg.message}
                          </span>
                        </div>
                      </div>
                      <img
                        src={couch?.getCoach?.profilePicture}
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-2 object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div key={i} className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                            {msg.message}
                          </span>
                        </div>
                      </div>
                      <img
                        src={couch?.getCoach?.profilePicture}
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-1 object-cover"
                      />
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <form onSubmit={sendMsg} className="relative flex">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message!"
              className="w-full focus:outline-none pl-3 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600  bg-gray-200 rounded-br-md  rounded-bl-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-primary-green hover:bg-green-800 focus:outline-none"
              >
                <span className="font-bold">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MultiChat;
