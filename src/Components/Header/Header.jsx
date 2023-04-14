import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
function Header() {
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
    },
    {
      link: "/home",
      title: "Courts",
    },
    {
      link: "/about",
      title: "About Us",
    },
    {
      link: "/feed",
      title: "PBU Feed",
    },
  ];
  return (
    <>
      <div className="max-md">
        <div className="">
          <div className=" bg-primary-black px-3">
            <div className=" container relative  py-4 flex justify-end ">
              <img className="left-0 max-w-[100px] top-0 absolute" src={logo} />

              <span className="flex  md:hidden">
                <RxHamburgerMenu size={30} color="#fff" />
              </span>
              <div className=" hidden md:flex gap-3  ">
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
              </div>
            </div>
          </div>
          <div className="h-10  bg-primary-green ">
            <nav className=" hidden   container md:flex divide-x  justify-center ">
              {ROUTER.map((links, index) => (
                <Link
                  className="px-4 text-white py-2 hover:text-[#4BFD00]"
                  to={links.link}
                  key={index}
                >
                  {links.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
