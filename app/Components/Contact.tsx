"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  email: string;
  subject: string;
  message: string;
};

export const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { email, subject, message } = data;
    fetch("https://eohlne6xk6bi1s.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ email, subject, message }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Failed to make the POST request");
        }
      })
      .then((data) => {
        console.log(data); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          This is the Simple contact form demonstration with pipedream.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="name@youremail.com"
                />
              )}
            />
            <span className="text-red-500">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"
                />
              )}
            />
            <span className="text-red-500">
              {errors.subject && errors.subject.message}
            </span>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="message"
                  rows={6}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a comment..."
                />
              )}
            />
            <span className="text-red-500">
              {errors.message && errors.message.message}
            </span>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};
