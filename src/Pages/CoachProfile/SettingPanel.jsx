import React, { useState } from "react";
import { IoNavigate } from "react-icons/io5";
import { Couch } from "../../graphql/query/Query";
import Swal from "sweetalert2";
import { uploadImage, uploadImageFirebase } from "../../config/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingSVG from "../../Components/Loading/LoadingSvg";
const SettingPanel = ({ editCoach, coachId, couch }) => {
  const [File, setFile] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    game: Yup.string().required("Game is required"),
    city: Yup.string().required(" City is required"),
    state: Yup.string().required(" State is required"),
    country: Yup.string().required(" Country is required"),
    pinCode: Yup.string()
      .matches(/^\d+$/, " Pincode not correct")
      .required(" Pincode is required"),
    street: Yup.string().required(" Street is required"),
    about: Yup.string().required("About is required"),
  });
  const ErrorPrint = ({ value }) => {
    return (
      <>
        {formik.touched[value] && formik.errors[value] ? (
          <div className="text-start text-red-600 text-sm ">
            {formik.errors[value]}
          </div>
        ) : null}
      </>
    );
  };
  const formik = useFormik({
    initialValues: {
      about: couch?.about,
      game: couch?.game,
      firstName: couch?.firstName,
      lastName: couch?.lastName,
      street: couch?.contactDetails?.street,
      city: couch?.contactDetails?.city,
      state: couch?.contactDetails?.state,
      country: couch?.contactDetails?.country,
      pinCode: couch?.contactDetails?.pinCode,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("file", File);
      var path = null;

      if (!File) {
        path = couch?.contactDetails?.profilePicture;
      } else {
        // path = await uploadImage(formData);
        // path = path.data?.fileName;
        path = await uploadImageFirebase(File);
      }
      actions.setSubmitting(true);
      console.log({
        path,
        variables: {
          ...values,
          coachId: coachId,
          ...(File && { profilePicture: path }),
        },
      });
      await editCoach({
        variables: {
          ...values,
          coachId: coachId,
          ...(File && { profilePicture: path }),
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
          Swal.fire(
            "Success!",
            "Coach profile updated successfully",
            "success"
          );
        })
        .catch(() => {})
        .finally(() => actions.setSubmitting(false));
    },
  });

  return (
    <>
      <form
        className="text-white grid grid-cols-2 gap-3 "
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label>First Name </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="First name"
              />{" "}
              <ErrorPrint value={"firstName"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Last Name </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="last name"
              />
              <ErrorPrint value={"lastName"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>Game</label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="text"
                name="game"
                onChange={formik.handleChange}
                value={formik.values.game}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full  text-sm  rounded-md  focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="Game"
              />
              <ErrorPrint value={"game"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>City </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="City"
                autoComplete="off"
              />
              <ErrorPrint value={"city"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label> State </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder=" State"
              />
            </div>
            <ErrorPrint value={"state"} />
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label> Country </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder=" Country"
              />
              <ErrorPrint value={"country"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label> Pincode </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="pinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pinCode}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder=" Pincode"
              />
              <ErrorPrint value={"pinCode"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label> Street </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <span className="absolute bg-primary-gray-light inset-y-0 left-0 flex items-center px-1 ">
              <IoNavigate size={25} className="text-primary-green" />
            </span>
            <div className="w-full">
              <input
                type="text"
                name="street"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
                className={`p-3 rounded-md w-full  text-sm  rounded-md pl-10 focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder=" Street"
              />
              <ErrorPrint value={"street"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label>Profile Image </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <input
                type="file"
                name="profilePicture"
                onChange={
                  (e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }
                  // formik.handleChange
                }
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md w-full bg-white  text-sm  rounded-md focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="Select Profile image"
              />
              <ErrorPrint value={"profilePicture"} />
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          <div>
            <label>About </label>
          </div>
          <div className="relative text-gray-600 rounded-md ">
            <div className="w-full">
              <textarea
                type="text"
                name="about"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                className={`p-3 rounded-md w-full  text-sm  rounded-md focus:outline-none 
                placeholder:text-primary-gray `}
                placeholder="Write about you"
              />
              <ErrorPrint value={"about"} />
            </div>
          </div>
        </div>
        <div>
          {!formik.isSubmitting && (
            <button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-primary-green text-white py-1  rounded-md min-w-[150px]"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      {formik.isSubmitting && <LoadingSVG />}
    </>
  );
};

export default SettingPanel;
