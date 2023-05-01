import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-gray-800 h-12 p-2 justify-between text-gray-300">
      <span className="font-bold">Lama Chat</span>
      <div className="flex gap-[10px]">
        <img
          className="bg-gray-300 h-6 w-6 object-cover rounded-md"
          src={currentUser.photoURL}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
