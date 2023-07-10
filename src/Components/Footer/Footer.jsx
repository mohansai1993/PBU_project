import React from "react";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaInstagram, FaSkype } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-black">
      <div className="container">
        <footer className=" ">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <Link to="/" className="flex items-center">
                  <img src={logo} className="h-12" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-primary-green uppercase ">
                    Company
                  </h2>
                  <ul className="font-medium text-white ">
                    <li className="mb-4">
                      <Link to="/" className="hover:underline">
                        Home
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link to="/about" className="hover:underline">
                        About Us
                      </Link>
                    </li>
                    {/* <li className="mb-4">
                      <Link to="/feed" className="hover:underline">
                        PBU Feeds
                      </Link>
                    </li>{" "} */}
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-primary-green uppercase dark:text-white">
                    Services
                  </h2>
                  <ul className="font-medium text-white ">
                    <li className="mb-4">
                      <Link to="/find/coach" className="hover:underline ">
                        Find a Coach
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-primary-green uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul className="font-medium text-white ">
                    <li className="mb-4  ">
                      <Link to="/privacy" className="hover:underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" className="hover:underline">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © {new Date().getFullYear()}{" "}
                <Link to="/" className="hover:underline">
                  PBU
                </Link>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 text-primary-gray ">
                <Link>
                  <FaFacebook className="hover:text-primary-green" size={24} />
                </Link>
                <Link>
                  <FaInstagram className="hover:text-primary-green" size={24} />
                </Link>
                <Link>
                  <FaLinkedin className="hover:text-primary-green" size={24} />
                </Link>
                <Link>
                  <FaSkype className="hover:text-primary-green" size={24} />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
