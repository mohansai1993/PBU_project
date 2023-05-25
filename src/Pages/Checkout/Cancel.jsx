import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 16 16"
            className="text-green-600 w-20  mx-auto my-6"
          >
            <g>
              <path
                fill="#f44336"
                d="M8 .5A7.5 7.5 0 1 0 15.5 8 7.503 7.503 0 0 0 8 .5zm2.47 9.27a.483.483 0 0 1 0 .7.47.47 0 0 1-.35.15.485.485 0 0 1-.35-.15L8 8.7l-1.77 1.77a.485.485 0 0 1-.35.15.47.47 0 0 1-.35-.15.483.483 0 0 1 0-.7L7.3 8 5.53 6.23a.495.495 0 0 1 .7-.7L8 7.3l1.77-1.77a.495.495 0 1 1 .7.7L8.7 8z"
                data-original="#f44336"
                className="hovered-path"
              />
            </g>
          </svg>

          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">
              Payment has failed please try again later
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-black hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancel;
