import Head from "next/head";

import UserIcon from "@/components/PageComponents/UserIcon";
import Toggle from "@/components/PageComponents/Toggle";

import Image from "next/image";

import { useRouter } from "next/router";



import {
  PhotoIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterIcon,
  MapPinIcon,
  HomeModernIcon,
  BanknotesIcon,
  BoltIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  ClockIcon,
  CubeIcon,
  SparklesIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  FaceSmileIcon,
  CloudArrowUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { createClient } from "@supabase/supabase-js";

import { useState, useCallback, useEffect } from "react";
import ApplianceSelect from "@/components/ApplianceSelect";
import Description from "@/components/UploadForms/Description";
import Title from "@/components/UploadForms/Title";
import HeadElement from "@/components/PageComponents/HeadElement";
import BigPicture from "@/components/UploadForms/BigPicture";
import Timing from "@/components/UploadForms/Timing";
import Pricing from "@/components/UploadForms/Pricing";
import HouseDetails from "@/components/UploadForms/HouseDetails";

import { useRef } from 'react'
import CoverImage from "@/components/UploadForms/CoverImage";

export async function getServerSideProps(context) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("newpage_subleases")
    .insert({})
    .select();

  let idNum = data[0].id;
  return {
    props: { idNum }, // will be passed to the page component as props
  };
}

export default function Upload({ idNum }) {

  const router = useRouter()


  const inputFileRef = useRef(null);


  const [uploadimgs, setuploadimgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingIndices, setLoadingIndices] = useState([]);


  function deleteImage(index) {
    const newImages = [...uploadimgs];
    newImages.splice(index, 1);
    setuploadimgs(newImages);
  }

  const [appliancesList, setAppliancesList] = useState(["Washing Machine"]);
  const [allowedList, setAllowedList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);

  const [circleColors, setCircleColors] = useState([]);
  const setCircleColorsFunction = (data) => {
    setCircleColors(data);
  };

  const callBackFunction = (data) => {
    setAppliancesList(data);
  };
  const allowedListFunction = (data) => {
    setAllowedList(data);
  };
  const amenitiesListFunciton = (data) => {
    setAmenitiesList(data);
  };

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleImageSubmit = async (event, img) => {
    event.preventDefault();
    setLoading(true);

    // const imageName = `${Date.now()}-${coverImage.name}`;
    // const filePath = `randomidname/${imageName}`;

    const { imageError } = await supabase.storage
      .from("sublease-images")
      .upload(`${idNum}/${img.name}`, img);

    if (imageError) {
      console.error("Error uploading image:", imageError);
      return;
    } else {
      console.log("New record added:");
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    console.log("Uploading image", e.target.files);
    setuploadimgs([e.target.files[0], ...uploadimgs]);
    handleImageSubmit(e, e.target.files[0]);
  };


  function classifySemesters(data) {
    const moveIn = new Date(data.move_in);
    const moveOut = new Date(data.move_out);

    let semesterData = [];

    for (
      let year = moveIn.getFullYear();
      year <= moveOut.getFullYear();
      year++
    ) {
      // console.log(year)

      const springStart = new Date(year - 1, 11, 31); // Dec 31
      const springEnd = new Date(year, 4, 15); // May 15
      const summerEnd = new Date(year, 7, 15); // August 15
      const winterEnd = new Date(year, 11, 31); // December 31

      // console.log(springStart, springEnd, summerEnd, winterEnd)

      const springLength = Math.floor(
        (springEnd - springStart) / (1000 * 60 * 60 * 24)
      );
      const summerLength = Math.floor(
        (summerEnd - springEnd) / (1000 * 60 * 60 * 24)
      );
      const winterLength = Math.floor(
        (winterEnd - summerEnd) / (1000 * 60 * 60 * 24)
      );

      const springOverlap =
        Math.max(
          Math.min(moveOut, springEnd) - Math.max(moveIn, springStart),
          0
        ) /
        (1000 * 60 * 60 * 24);
      const summerOverlap =
        Math.max(
          Math.min(moveOut, summerEnd) - Math.max(moveIn, springEnd),
          0
        ) /
        (1000 * 60 * 60 * 24);
      const winterOverlap =
        Math.max(
          Math.min(moveOut, winterEnd) - Math.max(moveIn, summerEnd),
          0
        ) /
        (1000 * 60 * 60 * 24);

      const springPercentage = springOverlap / springLength;
      const summerPercentage = summerOverlap / summerLength;
      const winterPercentage = winterOverlap / winterLength;

      if (springPercentage >= 0.6 && !semesterData.includes(`Spring ${year}`)) {
        semesterData.push(`Spring ${year}`);
      }
      if (summerPercentage >= 0.6 && !semesterData.includes(`Summer ${year}`)) {
        semesterData.push(`Summer ${year}`);
      }
      if (winterPercentage >= 0.6 && !semesterData.includes(`Fall ${year}`)) {
        semesterData.push(`Fall ${year}`);
      }
    }

    // semesterData is empty, then it is a short-term lease
    if (semesterData.length === 0) {
      semesterData.push("Short-term lease");
    }
    return semesterData;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.id = idNum;

    let semesterData = classifySemesters(data);
    data.semester = semesterData;

    data.roommate_demographics = circleColors;
    data.appliances_list = appliancesList;
    data.allowed_list = allowedList;
    data.amenities_list = amenitiesList;

    const { error } = await supabase.from("subleases").insert(data);

    if (error) {
      console.error(error);
    } else {
      console.log("New record added:", data);
      // redirect to /success

    }
    router.push(`/success?id=${idNum}`);
  }

  return (
    <>
      <HeadElement />

      <div className="flex h-screen flex-row">
        <div className="!lg:left-0 absolute -left-[280px] top-0 ml-0 flex h-screen w-0 flex-col transition-all lg:relative lg:left-0 lg:w-[420px]">
          <div className="relative top-0 flex h-screen w-auto flex-col overflow-auto border-r bg-white ">
            <div className="sticky top-0 z-20 border-b bg-white">
              <div className="lg:height-auto bg-scale-200 hidden flex-col gap-8 pb-8 pt-8 lg:flex">
                <a className="flex items-center gap-3 px-10" href="/">
                  <span className="text-2xl font-semibold">
                    🐝 GT Subleaser
                  </span>
                </a>
              </div>
            </div>
            <div className=" absolute left-0 right-0 top-[0px] h-screen px-5 py-16 pl-5 transition-all duration-200 ease-out lg:visible lg:relative lg:left-0 lg:top-0 lg:flex lg:px-10 lg:pb-10 lg:pt-0 lg:opacity-100">
              <div className="relative flex justify-center lg:justify-start">
                <ul className="relative flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-3 pt-8">
                    <span className="font-mono text-sm text-gray-500">
                      BIG PICTURE
                    </span>
                    {/* <a href="#cover-image-label"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <PhotoIcon className="h-[1.125rem] w-[1.125rem]" />
                      Photos
                    </li>
                    {/* </a> */}
                    {/* <a href="#title"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <DocumentTextIcon className="h-[1.125rem] w-[1.125rem]" />
                      Title
                    </li>
                    {/* </a> */}

                    {/* <a href="#description"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <ChatBubbleBottomCenterIcon className="h-[1.125rem] w-[1.125rem]" />
                      Description
                    </li>
                    {/* </a> */}
                    {/* <a href="#neighborhood"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <MapPinIcon className="h-[1.125rem] w-[1.125rem]" />
                      Neighborhood
                    </li>
                    {/* </a> */}
                    {/* <a href="/">
                      <li className="group flex items-center gap-3 text-base font-medium">
                        <HomeModernIcon className="h-[1.125rem] w-[1.125rem]" />
                        House Type
                      </li>
                    </a> */}
                  </div>
                  <div className="w-full border-b"></div>

                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-sm text-gray-500">
                      TIMING
                    </span>

                    {/* <a href="#move_in"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <ArrowRightOnRectangleIcon className="h-[1.125rem] w-[1.125rem]" />
                      Earliest Move-in
                    </li>
                    {/* </a> */}
                    {/* <a href="#move-out"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <ArrowLeftOnRectangleIcon className="h-[1.125rem] w-[1.125rem]" />
                      Latest Move-out
                    </li>
                    {/* </a> */}
                    {/* <a href="#semester">
                      <li className="group flex items-center gap-3 text-base font-medium">
                        <CalendarDaysIcon className="h-[1.125rem] w-[1.125rem]" />
                        Semester
                      </li>
                    </a> */}
                  </div>

                  <div className="w-full border-b"></div>

                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-sm text-gray-500">
                      PRICING
                    </span>
                    {/* <a href="#monthly_price"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <BanknotesIcon className="h-[1.125rem] w-[1.125rem]" />
                      Monthly Price
                    </li>
                    {/* </a> */}
                    {/* <a href="#utilities_fee"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <BoltIcon className="h-[1.125rem] w-[1.125rem]" />
                      Utilities
                    </li>
                    {/* </a> */}
                    {/* <a href="#misc_fees"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <CreditCardIcon className="h-[1.125rem] w-[1.125rem]" />
                      Fees
                    </li>
                    {/* </a> */}
                  </div>
                  <div className="w-full border-b"></div>
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-sm text-gray-500">
                      HOUSE DETAILS
                    </span>
                    {/* <a href="#total_bedrooms"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <CubeIcon className="h-[1.125rem] w-[1.125rem]" />
                      Total Bedrooms
                    </li>
                    {/* </a> */}

                    {/* <a href="#"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <CubeIcon className="h-[1.125rem] w-[1.125rem]" />
                      Roommate Info
                    </li>
                    {/* </a> */}
                    {/* <a href="#total_bathrooms"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <ClockIcon className="h-[1.125rem] w-[1.125rem]" />
                      Total Bathrooms
                    </li>
                    {/* </a> */}
                    {/* <a href="#gender_preference"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <IdentificationIcon className="h-[1.125rem] w-[1.125rem]" />
                      Gender Preference
                    </li>
                    {/* </a> */}
                  </div>
                  <div className="w-full border-b"></div>

                  <div className="flex flex-col gap-3 pb-8">
                    <span className="font-mono text-sm text-gray-500">
                      EXTRA
                    </span>
                    {/* <a href="#major_appliances"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <CubeIcon className="h-[1.125rem] w-[1.125rem]" />
                      Major Appliances
                    </li>
                    {/* </a> */}
                    {/* <a href="#allowed"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <NoSymbolIcon className="h-[1.125rem] w-[1.125rem]" />
                      Allowed/Disallowed
                    </li>
                    {/* </a> */}
                    {/* <a href="#amenities"> */}
                    <li className="group flex items-center gap-3 text-base font-medium">
                      <SparklesIcon className="h-[1.125rem] w-[1.125rem]" />
                      Amenities
                    </li>
                    {/* </a> */}

                    {/* <a href="#safety">
                      <li className="group flex items-center gap-3 text-base font-medium">
                        <ExclamationTriangleIcon className="h-[1.125rem] w-[1.125rem]" />
                        Safety
                      </li>
                    </a> */}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-screen w-full overflow-auto transition-all ease-out lg:relative lg:ml-0">
          <div className="relative flex flex-col">
            <div className={`top-0 z-10 lg:sticky`} id="header">
              <nav className="flex h-[65px] items-center justify-end border-b bg-white">
                <div className="mx-auto flex w-full items-center justify-end gap-2 pr-4">
                  <Toggle />
                  {/* <UserIcon /> */}
                </div>
              </nav>
            </div>

            <div className=" mx-auto mt-1  flex  w-full max-w-3xl items-center justify-between p-4 xl:mt-6 xl:p-0">
              <span className="font-mono">Listing ID: {idNum}</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-1 w-full max-w-3xl p-4 xl:mt-6 xl:p-0 "
            >
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      id="email"
                      className=" block text-lg  font-medium "
                    >
                      @gatech.edu Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="contact_email"
                      pattern=".+@gatech\.edu"
                      size="30"
                      required
                      className="w-full rounded-md border px-4  py-2 border-gray-400"
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor="email"
                      id="email"
                      className=" block text-lg  font-medium "
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full rounded-md border px-4  py-2 border-gray-400"
                    />
                  </div> */}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="cover-image"
                  id="cover-image-label"
                  className=" block text-lg  font-medium "
                >
                  Photos
                </label>
                <p>
                  Photos you've personally taken will produce the best response. Include the bedroom, bathroom, and kitchen/living area.
                </p>

                <input
                  type="file"
                  id="cover-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2"
                  ref={inputFileRef} // Add ref to the input element

                />
                <div className="mt-2 flex h-64  items-center gap-2 overflow-x-auto rounded-md border px-2 border-gray-400">
                  {uploadimgs.length !== 0 ? (
                    uploadimgs.map((img, index) => (
                      <CoverImage img={img} key={index}
                        id={idNum} index={index} loading={loading} deleteImage={deleteImage} />
                    ))
                  ) : (
                    <div className="relative h-60 w-60 rounded-md outline outline-black"
                    >
                      <span className="cursor-pointer text-center w-full h-full flex items-center justify-center"
                        onClick={() => inputFileRef.current.click()
                        }>
                        No files yet!<br></br>
                        Upload an image
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <BigPicture />
              <div className="mb-16 mt-16 border-t border-gray-300"></div>
              <Timing />
              <div className="mb-16 mt-16 border-t border-gray-300"></div>
              <Pricing />
              <div className="mb-16 mt-16 border-t border-gray-300"></div>
              <HouseDetails
                circleColors={circleColors}
                setCircleColorsFunction={setCircleColorsFunction}
              />
              <div className="mb-16 mt-16 border-t border-gray-300"></div>

              <div className="">
                <label
                  className="mb-2 block text-lg font-medium"
                  htmlFor="appliances"
                >
                  Appliances
                </label>
                We've selected some common defaults for you, but please modify
                this if there are things you have or don't have.
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md ">
                  <ApplianceSelect
                    imgsrc="/washing-machine.png"
                    name="Washing Machine"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Clothes Dryer"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/fridge.png"
                    name="Fridge"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/freezer.png"
                    name="Freezer"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/freezer.png"
                    name="Air Conditioner"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />

                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Heating"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/oven.png"
                    name="Stove"
                    setList={callBackFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Stove Hood"
                    setList={callBackFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/microwave.png"
                    name="Microwave"
                    setList={callBackFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/sink.png"
                    name="Dishwasher"
                    setList={callBackFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/disposal.png"
                    name="Drain Disposal"
                    setList={callBackFunction}
                    list={appliancesList}
                  />

                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Television"
                    setList={callBackFunction}
                    list={appliancesList}
                  />
                </div>
              </div>

              <div className="">
                <label
                  className="mb-2 mt-4 block text-lg font-medium"
                  htmlFor="allowed"
                  id="allowed"
                >
                  Allowed
                </label>

                <div className="grid grid-cols-4 gap-3 text-sm font-medium">
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Pets"
                    setList={allowedListFunction}
                    list={allowedList}
                  />

                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Drinking"
                    setList={allowedListFunction}
                    list={allowedList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Smoking"
                    setList={allowedListFunction}
                    list={allowedList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Parties"
                    setList={allowedListFunction}
                    list={allowedList}
                  />
                </div>
              </div>
              <div className="">
                <label
                  className="mb-2 mt-4 block text-lg font-medium"
                  htmlFor="amenities"
                  id="amenities"
                >
                  Amenities
                </label>
                <div className="mb-16 grid grid-cols-4 gap-3 text-sm font-medium ">
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Parking"
                    setList={amenitiesListFunciton}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Furnished"
                    setList={amenitiesListFunciton}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Balcony"
                    setList={amenitiesListFunciton}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Connected Bathroom"
                    setList={amenitiesListFunciton}
                    list={amenitiesList}
                  />
                </div>
              </div>

              <button
                className="mb-16 rounded px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700"
                type="submit"
              >
                Submit for review
              </button>
            </form>
          </div>
        </div >
      </div >
    </>
  );
}
