import { Menu, Transition } from "@headlessui/react";
import {
  BsThreeDotsVertical,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useContext, useState } from "react";
import { chunkify } from "./utils";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { BookSession } from "../../graphql/mutations/mutations";
import { AuthContext } from "../../context/AuthContext";
import { isCoach } from "../../utils";
import Swal from "sweetalert2";
import { Couch } from "../../graphql/query/Query";
import LoadingSVG from "../Loading/LoadingSvg";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AppoitmentBooking({
  BookingSlots,
  coachId,
  packageValue,
  bookingSession,
}) {
  let today = startOfToday();
  const [bookSession, { loading: bookSessionLoading }] =
    useMutation(BookSession);
  const { currentUser } = useContext(AuthContext);
  let [selectedDay, setSelectedDay] = useState(today);
  const [bookedSlot, setBookedSlot] = useState({});
  const [bookSlot, setBookSlot] = useState(null);

  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const slots = {
    sunday: {
      startTime: BookingSlots?.Sunday?.startTime,
      endTime: BookingSlots?.Sunday?.endTime,
    },
    monday: {
      startTime: BookingSlots?.Monday?.startTime,
      endTime: BookingSlots?.Monday?.endTime,
    },
    tuesday: {
      startTime: BookingSlots?.Tuesday?.startTime,
      endTime: BookingSlots?.Tuesday?.endTime,
    },
    wednesday: {
      startTime: BookingSlots?.Wednesday?.startTime,
      endTime: BookingSlots?.Wednesday?.endTime,
    },
    thursday: {
      startTime: BookingSlots?.Thursday?.startTime,
      endTime: BookingSlots?.Thursday?.endTime,
    },
    friday: {
      startTime: BookingSlots?.Friday?.startTime,
      endTime: BookingSlots?.Friday?.endTime,
    },
    saturday: {
      startTime: BookingSlots?.Saturday?.startTime,
      endTime: BookingSlots?.Saturday?.endTime,
    },
  };

  return (
    <div className="">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="">
          <div className="">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <BsFillCaretLeftFill className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <BsFillCaretRightFill className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-green-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-green-500",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* //Slots  */}
          <section className=" mt-10">
            {Object.keys(slots).map((value, i) => (
              <AvailSlots
                slots={slots[value]}
                key={i}
                day={value}
                duration={packageValue?.duration}
                selectedDay={selectedDay}
                setBookedSlot={setBookedSlot}
                setBookSlot={setBookSlot}
                bookedSlot={bookedSlot}
                bookingSession={bookingSession}
              />
            ))}
          </section>
        </div>
      </div>
      <div className="flex justify-center ">
        {!bookSessionLoading ? (
          <button
            className="bg-primary-green text-white py-1  rounded-md w-[150px] mt-12 "
            onClick={() => {
              if (currentUser) {
                if (isCoach(currentUser?.userType)) {
                  Swal.fire({
                    title: "Warning",
                    text: "You have coach you can't book session.",
                    icon: "warning",
                    confirmButtonText: "Cancel",
                  });
                } else {
                  bookSession({
                    variables: {
                      coachId: coachId,
                      athleteId: currentUser.userId,
                      sessionPlanId: packageValue.id,
                      ...bookSlot,
                      endTime: null,
                    },
                    refetchQueries: [
                      {
                        query: Couch,
                        variables: {
                          coachId: coachId,
                        },
                      },
                    ],
                  })
                    .then(() => {
                      Swal.fire("Success!", "Session Booked ", "success");
                    })
                    .catch((err) => {
                      Swal.fire("Error!", err, "error");
                    });
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
          >
            Book Session
          </button>
        ) : (
          <LoadingSVG />
        )}
      </div>
    </div>
  );
}

function AvailSlots({
  slots,
  day,
  selectedDay,
  setBookedSlot,
  bookedSlot,
  duration,
  setBookSlot,
  bookingSession,
}) {
  let res = chunkify(slots, selectedDay, duration);
  function removeTimeSlot(day, selectedDay) {
    const year = moment(selectedDay).year();
    const month = moment(selectedDay).format("MMMM").toLowerCase();
    const dayOfMonth = moment(selectedDay).date();

    setBookedSlot((prevState) => {
      const newState = {};

      return newState;
    });
  }
  function addTimeSlot(day, selectedDay, index) {
    const year = moment(selectedDay).year();
    const month = moment(selectedDay).format("MMMM").toLowerCase();
    const dayOfMonth = moment(selectedDay).date();

    setBookedSlot((prevState) => {
      // Create a new object that will replace the previous state
      const newState = {
        // ...prevState,

        [year]: {
          // ...prevState[year],
          [month]: {
            // ...prevState[year]?.[month],
            [day]: {
              // ...prevState[year]?.[month]?.[day],
              [dayOfMonth]: {
                // ...prevState[year]?.[month]?.[day]?.[dayOfMonth],
                startTime: index,
                endTime: index + duration,
              },
            },
          },
        },
      };

      return newState;
    });
  }

  const bookingSessionFilter = (date) =>
    bookingSession
      .filter((item) => {
        const itemDate = moment.utc(item.sessionDate).format("YYYY-MM-DD");

        return itemDate === moment(selectedDay).format("YYYY-MM-DD");
      })
      .find((e) => e.startTime === date);

  if (
    day === moment(selectedDay).format("dddd").toLowerCase() &&
    moment(selectedDay).isSameOrAfter(moment(), "day")
  ) {
    return (
      <>
        {" "}
        {res.length ? (
          <>
            <h2 className="font-semibold text-gray-900 pb-5">
              Booking Slots for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <div className="flex gap-3 flex-wrap">
              {res.map((index, idx) =>
                bookingSessionFilter(index) ? null : (
                  <span
                    key={idx}
                    onClick={() => {
                      // bookedSlot?.[moment(selectedDay).year()]?.[
                      //   moment(selectedDay).format("MMMM").toLowerCase()
                      // ]?.[day]?.[moment(selectedDay).date()]?.startTime != index
                      //   ? addTimeSlot(day, selectedDay, index)
                      //   : removeTimeSlot(day, selectedDay);
                      if (
                        bookedSlot?.[moment(selectedDay).year()]?.[
                          moment(selectedDay).format("MMMM").toLowerCase()
                        ]?.[day]?.[moment(selectedDay).date()]?.startTime !=
                        index
                      ) {
                        setBookSlot({
                          startTime: index,
                          sessionDate: moment(selectedDay).format("YYYY-MM-DD"),
                        });
                      } else {
                        console.log(day);
                      }
                    }}
                    className={`hover:bg-red-500 cursor-pointer bg-black text-white font-semibold  px-5 py-1 rounded-md ${
                      bookedSlot?.[moment(selectedDay).year()]?.[
                        moment(selectedDay).format("MMMM").toLowerCase()
                      ]?.[day]?.[moment(selectedDay).date()]?.startTime != index
                        ? ""
                        : "bg-red-500"
                    }`}
                  >
                    {index}:00
                    {/* //moment(bookingSession).format("LLL"), //
                  moment(selectedDay).format("LLL") */}
                  </span>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-black text-xl text-semibold h-full">
            {" "}
            Booking slots are not available
          </div>
        )}
      </>
    );
  }
  if (day === moment(selectedDay).format("dddd").toLowerCase()) {
    return (
      <>
        <div className="flex flex-col justify-center  text-center items-center text-black text-xl text-semibold h-full">
          {" "}
          Booking slots are not available if you select a previous date.
        </div>
      </>
    );
  }
}
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default AppoitmentBooking;
