import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
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
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useMutation } from "@apollo/client";
import { AddChatRoom } from "../../graphql/mutations/mutations";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { isCoach } from "../../utils";

function SingleChat({ couch }) {
  const { currentUser } = useContext(AuthContext);
  const [roomId, setRoomId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [addChatRoom] = useMutation(AddChatRoom);
  let [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = React.useState([]);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
  const handlePersonChat = async () => {
    let roomid = [currentUser?.userId, couch?.getCoach?.id].sort();
    roomid = roomid[0] + roomid[1];
    setRoomId(roomid);
    getMessages(roomid);
    const chats_ref = doc(db, "chats", roomid);
    const myId = currentUser?.userId;
    const docSnap = await getDoc(chats_ref);
    console.log({
      chatId: roomid,
      coachId: couch?.getCoach?.id,
      athleteId: currentUser?.userId,
    });
    let chat = await addChatRoom({
      variables: {
        chatId: roomid,
        coachId: couch?.getCoach?.id,
        athleteId: currentUser?.userId,
      },
    });
    console.log(chat);

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

    if (msg) {
      const msgObj = {
        time: Timestamp.now(),
        message: msg,
        sender: currentUser?.userId,
        receiver: couch?.getCoach?.id,
      };
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
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            if (currentUser) {
              if (isCoach(currentUser?.userType)) {
                Swal.fire({
                  title: "Warning",
                  text: "You have coach you can send message to other coach ",
                  icon: "warning",
                  confirmButtonText: "Cancel",
                });
              } else {
                openModal();
                handlePersonChat();
              }
            } else {
              Swal.fire({
                title: "Warning",
                text: "You must be logged in",
                icon: "warning",
                confirmButtonText: "Cancel",
              });
            }
          }}
          className="bg-primary-green text-white py-2  rounded-md min-w-[150px]"
        >
          Message
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  align-middle shadow-xl transition-all">
                  <div className="max-w-sm ">
                    <div className="relative flex items-center space-x-4 justify-between bg-primary-green p-4 rounded-tl-md rounded-tr-md">
                      <span className="text-white font-bold mr-3">
                        {couch?.getCoach?.firstName +
                          " " +
                          couch?.getCoach?.lastName}
                      </span>
                      <span className="cursor-pointer">
                        <IoClose color="#fff" size={24} onClick={closeModal} />
                      </span>
                    </div>
                    <div>
                      <div
                        id="messages"
                        class="bg-white h-[400px] px-5  flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                      >
                        {messages?.map((msg, i) => (
                          <>
                            {msg.sender === currentUser?.userId ? (
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SingleChat;
