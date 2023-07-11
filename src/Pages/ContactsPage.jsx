import { useLazyQuery } from "@apollo/client";
import React from "react";
import { IoMail } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { SendMail } from "../graphql/query/Query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
function ContactsPage() {
  const [sendMail] = useLazyQuery(SendMail);
  const contact = [
    {
      title: "Email Us",
      des: "Email us for general queries, including marketing and partnership opportunities.",
      icon: <IoMail size={20} className="text-white " />,
      link: (
        <a
          className="text-primary-green font-semibold"
          href="mailto:hello@flowbite.com"
        >
          hello@flowbite.com
        </a>
      ),
    },
    {
      title: "Call Us",
      des: "Call us to speak to a member of our team. We are always happy to help.",
      icon: <MdCallEnd size={20} className="text-white " />,
      link: (
        <a
          className="text-primary-green font-semibold"
          href="tel:hello@flowbite.com"
        >
          +1 (646) 786-5060
        </a>
      ),
    },
  ];
  return (
    <div className="mb-10 bg-[#eeffef] ">
      <div className=" max-w-[800px] mx-auto ">
        <section className=" max-w-[800px] mx-auto ">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
            <Formik
              initialValues={{
                email: "ritikchhipa@gmail.com",
                firstName: "test",
                lastName: "test",
                body: "dfhgdfhgjd",
              }}
              className="space-y-8"
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                firstName: Yup.string().required("first Name is required"),
                lastName: Yup.string().required("last Name  is required"),
                body: Yup.string().required("Comment  is required"),
              })}
              onSubmit={(values) => {
                sendMail({
                  variables: values,
                })
                  .then(() => {
                    Swal.fire({
                      title: "Success",
                      text: "Mail has send successfully",
                      type: "success",
                    });
                  })
                  .catch((err) => {});
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Let us know how we can help you"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Let us know how we can help you"
                    />
                    <ErrorMessage name="firstName" />
                  </div>{" "}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Last Name
                    </label>

                    <Field
                      name="lastName"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Let us know how we can help you"
                    />
                    <ErrorMessage name="lastName" />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Your message
                    </label>

                    <Field
                      as="textarea"
                      name="body"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Leave a comment..."
                    />
                    <ErrorMessage name="body" className="text-red-500" />
                  </div>
                  <div className="flex justify-end my-8">
                    <button className="bg-primary-green text-white py-1  rounded-md min-w-[150px] h-[50px]">
                      Send Message
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-5 px-5    ">
          {contact.map((con) => (
            <div className=" text-center ">
              <span className="flex justify-center bg-primary-green w-10 mx-auto rounded-md h-10 items-center">
                {con.icon}
              </span>
              <div className="font-bold my-2">{con.title}</div>
              <div className="mb-5">{con.des}</div>
              {con.link}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ContactsPage;
