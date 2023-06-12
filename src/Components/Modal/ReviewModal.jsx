import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Formik, Form } from "formik";
import React, { Fragment, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PostFeedback } from "../../graphql/mutations/mutations";
import { Athlete } from "../../graphql/query/Query";
import Swal from "sweetalert2";

function ReviewModal({ sessionId }) {
  const [postFeedback] = useMutation(PostFeedback);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const INPUT_CONTROL_NAME = "review";
  const radioOptions = [0, 1, 2, 3, 4, 5];

  return (
    <>
      <div className=" inset-0 flex items-center justify-start">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Review
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Add <span className="text-primary-green">Review</span>{" "}
                    </Dialog.Title>
                    <span onClick={closeModal} className="cursor-pointer">
                      <RxCross2 size={30} className="text-primary-green" />
                    </span>
                  </div>
                  <Formik
                    initialValues={{
                      message: "",
                      review: 0,
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        postFeedback({
                          variables: {
                            sessionId: sessionId,
                            rating: Number(values.review),
                            review: values.message,
                          },
                          refetchQueries: [
                            {
                              query: Athlete,
                            },
                          ],
                        })
                          .then(() => {
                            closeModal();
                            Swal.fire(
                              "Success!",
                              "Review add  successfully",
                              "success"
                            );
                          })
                          .catch((err) => {
                            Swal.fire("Warning!", err.message, "warning");
                          });
                        console.log(values);

                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ isSubmitting, handleChange, handleBlur, values }) => (
                      <Form className="w-full">
                        <div className="w-full">
                          <div className="flex justify-between   mb-7 mt-3 ">
                            {radioOptions.map((option) => (
                              <div key={option} className="flex gap-2">
                                <input
                                  type="radio"
                                  name={INPUT_CONTROL_NAME}
                                  id={option}
                                  value={option}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <label htmlFor={option} className="">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>

                          <Field
                            name="message"
                            render={({ field }) => (
                              <textarea
                                {...field}
                                className="w-full text-black p-3 placeholder:text-black rounded-md"
                                placeholder="Write comment here..."
                              />
                            )}
                          />

                          <button
                            type="submit"
                            className="gap-2 px-3 bg-primary-green text-white py-3 rounded-md min-w-[150px]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Comment"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {/* <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ReviewModal;
