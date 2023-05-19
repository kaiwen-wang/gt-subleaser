import ApplianceSelect from "@/components/UploadForms/ApplianceSelect";
import HeadElement from "@/components/Header/HeadElement";
import Toggle from "@/components/Header/Elements/Toggle";
import BigPicture from "@/components/UploadForms/BigPicture";
import CoverImage from "@/components/UploadForms/CoverImage";
import Description from "@/components/UploadForms/Description";
import HouseDetails from "@/components/UploadForms/HouseDetails";
import Pricing from "@/components/UploadForms/Pricing";
import Timing from "@/components/UploadForms/Timing";
import Title from "@/components/UploadForms/Title";
import { classifySemesters } from "@/utils/classifySemesters";
import { supabase } from "@/utils/supabase";
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
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useRef } from "react";

// Create a new ID whenever someone goes to the upload page
export async function getServerSideProps() {
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
  const router = useRouter();

  const inputFileRef = useRef(null);

  const [uploadimgs, setuploadimgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIndices, setLoadingIndices] = useState([]);

  function deleteImage(index) {
    const newImages = [...uploadimgs];
    newImages.splice(index, 1);
    setuploadimgs(newImages);
  }

  const [appliancesList, setAppliancesList] = useState(["Washing Machine", "Clothes Dryer", "Fridge", "Freezer", "Air Conditioner", "Heating", "Stove"]);
  const [allowedList, setAllowedList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const applianceListFunction = (data) => {
    setAppliancesList(data);
  };
  const allowedListFunction = (data) => {
    setAllowedList(data);
  };
  const amenitiesListFunction = (data) => {
    setAmenitiesList(data);
  };

  const [circleColors, setCircleColors] = useState([]);
  const setCircleColorsFunction = (data) => {
    setCircleColors(data);
  };

  const handleImageUpload = (e) => {
    console.log("Uploading image", e.target.files);
    setuploadimgs([e.target.files[0], ...uploadimgs]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    fetch(`/api/UploadImagesApi?id=${idNum}`, { method: "PUT", body: formData })
      .then(console.log).catch(console.log);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.id = idNum;
    data.semester = classifySemesters(data);;
    data.roommate_demographics = circleColors;
    data.appliances_list = appliancesList;
    data.allowed_list = allowedList;
    data.amenities_list = amenitiesList;

    fetch(`/api/UploadPostsApi?idNum=${idNum}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // If the fetch is successful, redirect to the success page
        router.push(`/success?id=${idNum}`);
      })
      .catch(error => {
        console.log(error);
        alert("Server Error: " + error.message + ". Please change your input.");
      });
  };

  return (
    <>
      <HeadElement />

      <div className="flex flex-row h-screen">
        <div className="!lg:left-0 absolute -left-[280px] top-0 ml-0 flex h-screen w-0 flex-col transition-all lg:relative lg:left-0 lg:w-[420px]">
          <div className=" relative top-0 flex flex-col w-auto h-screen overflow-auto bg-white border-r">
            <div className="sticky top-0 z-20 bg-white border-b">
              <div className="lg:height-auto bg-scale-200 lg:flex flex-col hidden gap-8 pt-8 pb-8">
                <a className="flex items-center gap-3 px-10" href="/">
                  <span className="text-2xl font-semibold">
                    🐝 GT Subleaser
                  </span>
                </a>
              </div>
            </div>
            <div className=" absolute left-0 right-0 top-[0px] h-screen px-5 py-16 pl-5 transition-all duration-200 ease-out lg:visible lg:relative lg:left-0 lg:top-0 lg:flex lg:px-10 lg:pb-10 lg:pt-0 lg:opacity-100">
              <div className="lg:justify-start relative flex justify-center">
                <ul className="relative flex flex-col w-full gap-4">
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
        <div className="lg:relative lg:ml-0 absolute w-full h-screen overflow-auto transition-all ease-out">
          <div className="relative flex flex-col">
            <div className={`top-0 z-10 lg:sticky`} id="header">
              <nav className="flex h-[65px] items-center justify-end border-b bg-white">
                <div className="flex items-center justify-end w-full gap-2 pr-4 mx-auto">
                  <Toggle />
                  {/* <UserIcon /> */}
                </div>
              </nav>
            </div>

            <div className=" xl:mt-6 xl:p-0 flex items-center justify-between w-full max-w-3xl p-4 mx-auto mt-1">
              <span className="font-mono">Listing ID: {idNum}</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="xl:mt-6 xl:p-0 w-full max-w-3xl p-4 mx-auto mt-1"
            >
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      id="email"
                      className=" block text-lg font-medium"
                    >
                      @gatech.edu Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="contact_email"
                      pattern=".+@gatech\.edu"
                      size="30"
                      className="w-full px-4 py-2 border border-gray-400 rounded-md"
                    />
                  </div>
                  {/* <div>
                    <label
                      htmlFor="email"
                      id="email"
                      className=" block text-lg font-medium"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-400 rounded-md"
                    />
                  </div> */}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="cover-image"
                  id="cover-image-label"
                  className=" block text-lg font-medium"
                >
                  Photos
                </label>
                <p>
                  Photos you've personally taken will produce the best response.
                  Include the bedroom, bathroom, and kitchen/living area.
                </p>

                <input
                  type="file"
                  id="cover-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2"
                  ref={inputFileRef} // Add ref to the input element
                />
                <div className="flex items-center h-64 gap-2 px-2 mt-2 overflow-x-auto border border-gray-400 rounded-md">
                  {uploadimgs.length !== 0 ? (
                    uploadimgs.map((img, index) => (
                      <CoverImage
                        img={img}
                        key={index}
                        id={idNum}
                        index={index}
                        loading={loading}
                        deleteImage={deleteImage}
                      />
                    ))
                  ) : (
                    <div className="h-60 w-60 outline outline-black relative rounded-md">
                      <span
                        className="flex items-center justify-center w-full h-full text-center cursor-pointer"
                        onClick={() => inputFileRef.current.click()}
                      >
                        No files yet!<br></br>
                        Upload an image
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <BigPicture />
              <div className="mt-16 mb-16 border-t border-gray-300"></div>
              <Timing />
              <div className="mt-16 mb-16 border-t border-gray-300"></div>
              <Pricing />
              <div className="mt-16 mb-16 border-t border-gray-300"></div>
              <HouseDetails
                circleColors={circleColors}
                setCircleColorsFunction={setCircleColorsFunction}
              />
              <div className="mt-16 mb-16 border-t border-gray-300"></div>

              <div className="">
                <div className="flex justify-between">

                  <label
                    className="block mb-2 text-lg font-medium"
                    htmlFor="appliances"
                  >
                    Appliances
                  </label>
                  <span className="text-sm text-gray-500">
                    {appliancesList.length} selected
                  </span>
                </div>
                We've selected some common defaults for you, but please modify
                this if there are things you have or don't have.
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md ">
                  <ApplianceSelect
                    imgsrc="/washing-machine.png"
                    name="Washing Machine"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Clothes Dryer"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/fridge.png"
                    name="Fridge"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/freezer.png"
                    name="Freezer"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/freezer.png"
                    name="Air Conditioner"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />

                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Heating"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/oven.png"
                    name="Stove"
                    setList={applianceListFunction}
                    list={appliancesList}
                    selectedDefault={true}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Stove Hood"
                    setList={applianceListFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/microwave.png"
                    name="Microwave"
                    setList={applianceListFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/sink.png"
                    name="Dishwasher"
                    setList={applianceListFunction}
                    list={appliancesList}
                  />
                  <ApplianceSelect
                    imgsrc="/disposal.png"
                    name="Drain Disposal"
                    setList={applianceListFunction}
                    list={appliancesList}
                  />

                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Television"
                    setList={applianceListFunction}
                    list={appliancesList}
                  />
                </div>
              </div>

              <div className="">
                <label
                  className="block mt-4 mb-2 text-lg font-medium"
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
                  className="block mt-4 mb-2 text-lg font-medium"
                  htmlFor="amenities"
                  id="amenities"
                >
                  Amenities
                </label>
                <div className=" grid grid-cols-4 gap-3 mb-16 text-sm font-medium">
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Parking"
                    setList={amenitiesListFunction}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Furnished"
                    setList={amenitiesListFunction}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Balcony"
                    setList={amenitiesListFunction}
                    list={amenitiesList}
                  />
                  <ApplianceSelect
                    imgsrc="/dryer.png"
                    name="Connected Bathroom"
                    setList={amenitiesListFunction}
                    list={amenitiesList}
                  />
                </div>
              </div>

              <button
                className="hover:bg-blue-700 px-4 py-2 mb-16 font-bold text-white bg-blue-500 rounded"
                type="submit"
              >
                Submit for review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
