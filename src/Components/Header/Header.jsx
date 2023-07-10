import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthContext } from "../../context/AuthContext";
function Header() {
  const { currentUser, handleLogout } = useContext(AuthContext);
  console.log(currentUser);
  const [Open, setOpen] = useState(false);
  const ROUTER = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/find/coach",
      title: "Find a Coach",
    },
    {
      link: "/become/coach",
      title: "Become a Coach",
      isShow: currentUser,
    },
    {
      link: "/about",
      title: "About Us",
    },
    // {
    //   link: "/feed",
    //   title: "PBU Feed",
    // },
  ];
  return (
    <>
      <div className="max-md">
        <div className="">
          <div className=" bg-primary-black px-3">
            <div className=" container relative  py-4 flex justify-end ">
              <Link to="/">
                <img
                  alt="logo"
                  className="left-0 max-w-[100px] top-0 absolute"
                  src={logo}
                />
              </Link>
              <span
                className="flex cursor-pointer  md:hidden"
                onClick={() => setOpen(!Open)}
              >
                <RxHamburgerMenu size={30} color="#fff" />
              </span>

              <div className=" hidden md:flex gap-3  ">
                {!currentUser ? (
                  <>
                    <Link to="/login">
                      <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px]">
                        Login
                      </button>
                    </Link>
                    <Link to={"/register"}>
                      <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px]">
                        Register
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="h-10  bg-primary-green ">
            <nav className=" hidden   container md:flex divide-x  justify-center ">
              {ROUTER.map(
                (links, index) =>
                  !links.isShow && (
                    <Link
                      className="px-4 text-white py-2 hover:text-[#4BFD00]"
                      to={links.link}
                      key={index}
                    >
                      {links.title}
                    </Link>
                  )
              )}

              {currentUser ? (
                currentUser.userType === "athlete" ? (
                  <Link
                    onClick={() => setOpen(false)}
                    className="px-4 text-white py-2 hover:text-[#4BFD00]"
                    to={`/profile/athlete/${currentUser?.userId}`}
                  >
                    Athlete Profile
                  </Link>
                ) : (
                  <Link
                    onClick={() => setOpen(false)}
                    className="px-4 text-white py-2 hover:text-[#4BFD00]"
                    to={`/profile/coach/${currentUser?.userId}`}
                  >
                    Coach Profile
                  </Link>
                )
              ) : null}
            </nav>
          </div>
          <div
            className={`bg-black  w-full absolute z-20 ${
              Open ? "block" : "hidden"
            }`}
          >
            <div>
              <nav className="">
                {ROUTER.map(
                  (links, index) =>
                    !links.isShow && (
                      <div className="py-3">
                        <Link
                          onClick={() => setOpen(false)}
                          className="px-4 hover:text-primary-green  text-white py-2 hover:text-[#4BFD00]"
                          to={links.link}
                          key={index}
                        >
                          {links.title}
                        </Link>
                      </div>
                    )
                )}
                <div className="py-3">
                  {currentUser ? (
                    currentUser.userType === "athlete" ? (
                      <Link
                        onClick={() => setOpen(false)}
                        className="px-4 text-white py-2 hover:text-[#4BFD00]"
                        to={`/profile/athlete/${currentUser?.userId}`}
                      >
                        Athlete Profile
                      </Link>
                    ) : (
                      <Link
                        onClick={() => setOpen(false)}
                        className="px-4 text-white py-2 hover:text-[#4BFD00]"
                        to={`/profile/coach/${currentUser?.userId}`}
                      >
                        Coach Profile
                      </Link>
                    )
                  ) : null}
                </div>
              </nav>
            </div>{" "}
            <div className=" px-4 pb-10 flex gap-4">
              {!currentUser ? (
                <>
                  <Link to="/login">
                    <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px]">
                      Login
                    </button>
                  </Link>
                  <Link to={"/register"}>
                    <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px]">
                      Register
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
