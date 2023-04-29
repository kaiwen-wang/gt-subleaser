import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";

import Header from "@/components/PageComponents/Header";
import HeadElement from "@/components/PageComponents/HeadElement";

export default function Home() {
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  return (
    <>
      <HeadElement />

      <Header />
      <main>
        Hello meow meow meow


        <div className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <p className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
                    For Georgia Tech students
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Winter graduates, transfer students, and interns means
                    students are constantly on the go. We aim to provide *the*
                    platform for students to sublease within the community.
                  </p>
                </div>
              </div>
              <img
                src="https://coursemate.s3.eu-west-1.amazonaws.com/home_page_images/screenshotCourse-min.png"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                height="500"
                width="1000"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                <div className="lg:max-w-lg">
                  <p className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
                    A modern and efficient platform
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    As technologists and designers, we use modern technologies
                    and human centric design to create a platform that is easy
                    to use.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end lg:order-first">
                <img
                  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                  src="https://coursemate.s3.eu-west-1.amazonaws.com/home_page_images/screenshotMyCountrySlideover-min.png"
                  alt="Feature image"
                  height="500"
                  width="1000"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="w-full pb-64">
          <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="max-w-4xl px-4 text-center text-4xl font-semibold text-gray-800 sm:text-6xl">
              Connect with other{" "}
              <span className="bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-6xl">
                students{" "}
              </span>
              today
            </h1>
            <p className="mx-6 mt-6 max-w-2xl text-center text-sm leading-8 text-gray-600 sm:mt-10 sm:text-lg lg:mt-10 lg:text-lg">
              Find your next sublease or rent out your place toda..
            </p>
            <a
              className="mt-6 rounded-md px-4 py-2 text-base font-normal leading-7 shadow-sm transition duration-200 ease-out bg-black text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:mt-8 lg:mt-8"
              href="https://sso.gatech.edu/cas/login"
            >
              Georgia Tech Single Sign-On
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
