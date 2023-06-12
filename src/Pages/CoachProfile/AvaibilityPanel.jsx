import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { SetSlot } from "../../graphql/mutations/mutations";
import { Couch } from "../../graphql/query/Query";
import Swal from "sweetalert2";
import * as Yup from "yup";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
const AvaibilityPanel = ({ coachId, openingHours, loading }) => {
  const [slot, { loading: slotLoading }] = useMutation(SetSlot);
  console.log(openingHours);
  const initialValues = {
    sunday: {
      start: openingHours?.Sunday.startTime,
      end: openingHours?.Sunday.endTime,
    },
    monday: {
      start: openingHours?.Monday.startTime,
      end: openingHours?.Monday.endTime,
    },
    tuesday: {
      start: openingHours?.Tuesday.startTime,
      end: openingHours?.Tuesday.endTime,
    },
    wednesday: {
      start: openingHours?.Wednesday.startTime,
      end: openingHours?.Wednesday.endTime,
    },
    thursday: {
      start: openingHours?.Thursday.startTime,
      end: openingHours?.Thursday.endTime,
    },
    friday: {
      start: openingHours?.Friday.startTime,
      end: openingHours?.Friday.endTime,
    },
    saturday: {
      start: openingHours?.Saturday.startTime,
      end: openingHours?.Saturday.endTime,
    },
  };
  const startEndTimeValidation = Yup.object().shape({
    start: Yup.number()
      .min(6, "not be less than 6")
      .max(24, "not be greater than 24")
      .when("end", (end, schema) =>
        schema.test({
          test: function (start) {
            return start < end;
          },
          message: "Start time must be less than end time",
        })
      ),
    end: Yup.number()
      .min(6, "not be less than 6")
      .max(24, "not be greater than 24"),
  });
  const validation = Yup.object().shape({
    sunday: startEndTimeValidation,
    monday: startEndTimeValidation,
    tuesday: startEndTimeValidation,
    thursday: startEndTimeValidation,
    friday: startEndTimeValidation,
    saturday: startEndTimeValidation,
  });

  return (
    <>
      {loading || slotLoading ? (
        <LoadingSVG />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(true);
            slot({
              variables: {
                coachId: coachId,
                openingHours: {
                  Sunday: {
                    startTime: values.sunday.start,
                    endTime: values.sunday.end,
                  },
                  Monday: {
                    startTime: values.monday.start,
                    endTime: values.monday.end,
                  },
                  Tuesday: {
                    startTime: values.tuesday.start,
                    endTime: values.tuesday.end,
                  },
                  Wednesday: {
                    startTime: values.wednesday.start,
                    endTime: values.wednesday.end,
                  },
                  Thursday: {
                    startTime: values.thursday.start,
                    endTime: values.thursday.end,
                  },
                  Friday: {
                    startTime: values.friday.start,
                    endTime: values.friday.end,
                  },
                  Saturday: {
                    startTime: values.saturday.start,
                    endTime: values.saturday.end,
                  },
                },
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
              .then((res) => {
                Swal.fire(
                  "Success",
                  "Availability Update Successfully",
                  "success"
                );
              })
              .catch((err) => {
                Swal.fire("Error", "Something went wrong", "error");
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          enableReinitialize={true}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Day
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Start Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(values).map(([day, { start, end }]) => (
                    <tr
                      key={day}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 capitalize text-[#212f48]  text-bold   "
                      >
                        {day}
                      </td>
                      <td scope="row" class="px-6 py-4">
                        <Field
                          type="number"
                          name={`${day}.start`}
                          value={start}
                          className="p-3 rounded-md w-full  text-sm rounded-md focus:outline-none 
                          placeholder:text-primary-gray bg-[#212f48] text-white text-semibold "
                          placeholder="Start Time"
                        />
                        <ErrorMessage
                          name={`${day}.start`}
                          component="div"
                          className="text-red-500"
                        />
                      </td>
                      <td scope="row" class="px-6 py-4 ">
                        <Field
                          type="number"
                          name={`${day}.end`}
                          value={end}
                          className="p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
                          placeholder:text-primary-gray bg-[#212f48] text-white text-semibold "
                          placeholder="End Time"
                        />
                        <ErrorMessage
                          name={`${day}.end`}
                          component="div"
                          className="text-red-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end pt-2">
                <ul className="text-xs font-semibold text-primary-green list-disc">
                  <li>Please enter start and end time in 24 hr format</li>
                  <li>Start Time must be greater or equal to 6.</li>
                  <li>End Time must be less or equal to 24.</li>
                </ul>
              </div>

              <button
                type="submit"
                className="bg-primary-green text-white py-1  rounded-md min-w-[150px]  mt-5"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AvaibilityPanel;
