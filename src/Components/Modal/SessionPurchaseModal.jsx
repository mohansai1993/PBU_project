import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AvailabilityCalendar,
  defaultComponents,
} from "react-availability-calendar";
import moment from "moment";

export default function SessionPurchaseModal({ value, isOpen, setIsOpen }) {
  const providerTimeZoneForBlockOutHours = "America/New_York";
  function closeModal() {
    setIsOpen(false);
  }
  const [selectedAvails, setSelectedAvails] = useState({});
  const [lastSelectedDay, setLastSelectedDay] = useState(new Date());
  const [showCustomToolBar, setShowCustomToolBar] = useState(false);
  const overrides = {
    ...defaultComponents,
    ToolBar: {
      className: "border btn-group",
      style: {
        backgroundColor: "green",
        display: "flex",
        color: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },
    Weekday: {
      style: {
        color: "#aaaaaa",
        fontWeight: "bold",
        backgroundColor: "#fff",
      },
      className: "none",
    },
    AvailSlot: {
      style: (p) =>
        selectedAvails[p.date.getTime()]
          ? {
              backgroundColor: "red",
              borderRadius: "5px",
              padding: "5px",
              color: "white",
            }
          : {
              backgroundColor: "green",
              borderRadius: "5px",
              padding: "5px",
              color: "white",
            },
    },
    DayCell: {
      style: (p) =>
        p.isSelected
          ? {
              transition: "width 200ms, height 200ms",
              color: "#fff",
              backgroundColor: "green",
              borderRadius: "5px",
              border: "1px solid #fff",
            }
          : {
              transition: "width 200ms, height 200ms",
              border: "1px solid #fff",
            },
      className: (p) => {
        console.log(p.date.getTime(), lastSelectedDay.getTime());
        const wasSelected = p.date.getTime() === lastSelectedDay.getTime();
        const additionalClassForWasSelected = wasSelected ? "font-bold" : "";
        console.log(additionalClassForWasSelected);
        return (
          (p.isSelected
            ? "rounded-circle border-success"
            : p.hasAvail
            ? "rounded-circle border-primary "
            : "rounded-lg border border-black   ") +
          additionalClassForWasSelected
        );
      },
    },
  };

  const onAvailabilitySelected = (a) => {
    console.log("Availability slot selected: ", a);
    const startMs = a.startDate.getTime();
    const wasSelected = !!selectedAvails[startMs];
    setSelectedAvails((selectedAvails) => ({
      ...selectedAvails,
      [startMs]: wasSelected ? null : a,
    }));
  };
  const onDaySelected = (day) => {
    setShowCustomToolBar(!!day);

    // to restore the next time calVersion upates
    if (day) {
      setLastSelectedDay(day);
    }
  };
  const onChangedCalRange = (r) =>
    console.log("Calendar range selected (fetch bookings here): ", r);
  //   #aaaaaa
  const bookings = [
    {
      startDate: new Date(2020, 2, 1, 19),
      endDate: new Date(2020, 2, 1, 20),
    },
    {
      startDate: new Date(2020, 2, 1, 16, 30),
      endDate: new Date(2020, 2, 1, 17),
    },
  ];
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#152033]  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="p-6 text-xl font-semibold  leading-6 text-gray-900 bg-primary-green"
                  >
                    Book Session
                  </Dialog.Title>
                  <div className="py-5">
                    <div
                      className=" mt-2 bg-white  "
                      style={{
                        maxWidth: 350,
                        maxHeight: 520,
                        margin: "0 auto ",
                        overflowY: "auto",
                      }}
                    >
                      <AvailabilityCalendar
                        className="bg-white"
                        overrides={overrides}
                        bookings={bookings}
                        moment={moment}
                        providerTimeZone={providerTimeZoneForBlockOutHours}
                        initialDate={lastSelectedDay}
                        onDaySelected={onDaySelected}
                        onAvailabilitySelected={onAvailabilitySelected}
                        onCalRangeChange={onChangedCalRange}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end px-6">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-primary-green min text-white p-3 rounded-md flex mb-5"
                    >
                      Submit
                    </button>
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
