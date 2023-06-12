import moment from "moment";
import React from "react";

function BookingPanel({ booking }) {
  console.log(booking);
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl text-primary-green  font-semibold leading-tight">
              Booking
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-[#212F48]">
                    {" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  text-white  uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  text-white  uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase text-white tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Booking Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-xs font-semibold  uppercase tracking-wider">
                      Athlete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {booking.map((booking, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}.
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap capitalize">
                          {booking?.sessionPlan?.duration} Hr
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${booking?.sessionPlan?.price}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(booking?.sessionDate).format("LL")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center gap-2 px-5 py-5  bg-white text-sm ">
                          <img
                            src="http://192.168.1.49:5000/public/uploads/2023-6-9_10-25-44_logo.cbf974fe515c47155956.png"
                            class="rounded-md h-[50px] w-[50px] object-cover"
                            alt=""
                          ></img>
                          <div>
                            {booking?.athlete?.firstName +
                              " " +
                              booking?.athlete?.lastName}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPanel;
