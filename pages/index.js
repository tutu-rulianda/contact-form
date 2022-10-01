import Head from "next/head";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { validator } from "./../utils/validate";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function Home() {
  const formRef = useRef();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    window.localStorage.setItem("color-theme", "light");
    document.documentElement.classList.add("light");
  }, []);
  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_o9b4zlc",
        "template_wbj4f4p",
        formRef.current,
        "0ioi8qZ8Pl9Hi_4u3"
      )
      .then(
        (result) => {
          console.log(result.text);
          formik.resetForm();
          toast.success("Hurray!😍, Email sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const submitButtonHandler = () => {
    console.log("HEEELLLLOOOO");
    sendEmail();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      cmpName: "",
      email: "",
      contact: "",
      country: "India",
      message: "",
      quantity: "",
    },
    validationSchema: Yup.lazy((values) => Yup.object().shape(validator)),
    onSubmit: submitButtonHandler,
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("color-theme", "dark");
      setTheme("dark");
    }
  };
  return (
    <div>
      <Head>
        <title>Contact Form</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="show-banner"></Script>
      <ToastContainer
        theme={theme}
        position="top-right"
        autoClose={1000}
        draggable
      />

      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <button
          id="theme-toggle"
          type="button"
          onClick={toggleTheme}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 absolute right-4 top-4"
        >
          <svg
            id="theme-toggle-dark-icon"
            className={`${theme === "dark" ? "" : "hidden"} w-5 h-5`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            className={`${theme === "dark" ? "hidden" : ""} w-5 h-5`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form ref={formRef} className="space-y-8">
            <div className="flex gap-x-4 flex-col sm:flex-row">
              <div className="grow mb-8 sm:mb-0">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.name && formik.touched.name
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="Avinash Prajapati"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                />
                {formik.touched.name && formik.errors.name && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="grow">
                <label
                  htmlFor="cmpName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="cmpName"
                  name="cmpName"
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.cmpName && formik.touched.cmpName
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="Google"
                  value={formik.values.cmpName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                />
                {formik.touched.cmpName && formik.errors.cmpName && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.cmpName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-x-4 flex-col sm:flex-row">
              <div className="grow">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="name@gmail.com"
                  required
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="grow">
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.contact && formik.touched.contact
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="0000000000"
                  required
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.contact}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.country && formik.touched.country
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                >
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div className="grow">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Message
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={formik.values.message}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.message && formik.touched.message
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="Message"
                  required
                />
                {formik.touched.message && formik.errors.message && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-x-4 flex-col sm:flex-row">
              <div className="grow">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg grow w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light relative
                  ${
                    formik.errors.quantity && formik.touched.quantity
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-600 "
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  }`}
                  placeholder="Add a Quantity"
                  required
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p
                    id="outlined_error_help"
                    className="mt-1 ml-1 text-xs text-red-600 dark:text-red-400 absolute"
                  >
                    <span className="font-medium">Oh, snapp!</span>{" "}
                    {formik.errors.quantity}
                  </p>
                )}
              </div>
              <div className="grow">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="file"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file"
                  name="file"
                  onChange={(e) => {
                    formik.setFieldValue("file", e.currentTarget.files[0]);
                  }}
                  type="file"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PDF OR WORD.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={formik.handleSubmit}
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
