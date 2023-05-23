
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Dialog } from "@headlessui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import Description from "@/components/UploadForms/Description";
import BigPicture from "@/components/UploadForms/BigPicture";
import Timing from "@/components/UploadForms/Timing";
import Pricing from "@/components/UploadForms/Pricing";
import HouseDetails from "@/components/UploadForms/HouseDetails";
import Toggle from "@/components/Header/Elements/Toggle";
import UserIcon from "@/components/Header/Elements/UserIcon";
import ApplianceSelect from "@/components/UploadForms/ApplianceSelect";


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
import LoginPage from "../../components/LoginPage";
import Appliances from "../../components/UploadForms/Appliances";
import Allowed from "../../components/UploadForms/Allowed";
import Amenities from "../../components/UploadForms/Amenities";

export default function hi() {
    const [circleColors, setCircleColors] = useState([]);
    const setCircleColorsFunction = (data) => {
        setCircleColors(data);
    };

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 38:
                // Up arrow was pressed
                console.log("Up arrow key was pressed.");
                changePage(-1)
                break;
            case 40:
                // Down arrow was pressed
                console.log("Down arrow key was pressed.");
                changePage(1)
                break;
            // enter key:
            case 13:
                // Down arrow was pressed
                console.log("Enter key was pressed.");
                changePage(1)
            default:
                // Some other key was pressed
                console.log("Some other key was pressed.");
                break;
        }
    }

    const [session, setSession] = useState(null);
    const supabase = useSupabaseClient();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            console.log('unmounting')
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);




    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const [page, setPage] = useState(0);

    const pages = [{
        page: 0,
        content: (
            <>
                <h1 className="text-4xl font-bold">Ready to sublease?</h1>

                <div className="mt-4 text-lg text-gray-500">
                    We just have a few things you need to fill out.
                </div>
            </>
        )
    },
    {
        page: 1,
        content: (
            <BigPicture />
        )
    },
    {
        page: 2,
        content: (
            <Timing />
        )
    },
    {
        page: 3,
        content: (
            <Pricing />
        )
    },
    {
        page: 4,
        content: (
            <HouseDetails
                circleColors={circleColors}
                setCircleColorsFunction={setCircleColorsFunction}
            />
        )
    },
    {
        page: 5,
        content: (
            <Appliances />
        )
    }, {
        page: 6,
        content: (
            <Allowed />
        )
    },
    {
        page: 7,
        content: (
            <Amenities />
        )
    }]




    function changePage(number) {
        console.log(number, page, page + number)

        setPage((prevPage) => {
            if (prevPage + number < 0) {
                return prevPage;
            } else {
                return prevPage + number;
            }
        });
    }

    return (
        <div >
            {!session ? (
                <LoginPage />
            ) : (
                <div className="flex flex-row h-screen">
                    <div className="!lg:left-0 absolute -left-[280px] top-0 ml-0 flex h-screen w-0 flex-col  lg:relative lg:left-0 lg:w-[420px]">
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
                            <div className=" absolute left-0 right-0 top-[0px] h-screen px-5 py-16 pl-5   lg:visible lg:relative lg:left-0 lg:top-0 lg:flex lg:px-10 lg:pb-10 lg:pt-0 lg:opacity-100">
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
                    <div className="lg:relative lg:ml-0 absolute w-full h-screen overflow-auto">
                        <div className="relative flex flex-col min-h-screen">
                            <div className={`top-0 z-10 lg:sticky`} id="header">
                                <nav className="flex h-[65px] items-center justify-end border-b bg-white">
                                    <div className="flex items-center justify-between w-full gap-2 pr-4 mx-auto">
                                        <a className="lg:invisible visible ml-4 text-xl font-semibold" href="/">
                                            🐝 GT Subleaser
                                        </a>
                                        <div className="flex gap-2">

                                            <Toggle />
                                            <UserIcon />
                                        </div>
                                    </div>
                                </nav>
                            </div>

                            <div className="relative flex items-center justify-center flex-grow">
                                <div className="absolute top-0 left-0 h-1 bg-green-500"
                                    style={{
                                        width: `${(page / (pages.length - 1)) * 100}%`,
                                    }}
                                />

                                <div className=" w-full">
                                    {pages[page] && pages[page].content}
                                </div>

                                <div className="absolute bottom-0 right-0 flex items-center m-2">
                                    <div className="mr-2 font-medium text-gray-900">
                                        Page {page + 1}/{pages.length}
                                    </div>
                                    <div className="hover:bg-gray-200 px-3 py-2 bg-gray-100 border-t border-b border-l">
                                        <ArrowUpIcon className="w-5 h-5 text-gray-900"
                                            onClick={() => { changePage(-1) }}

                                        />
                                    </div>
                                    <div className="hover:bg-gray-200 px-3 py-2 bg-gray-100 border">
                                        <ArrowDownIcon className="w-5 h-5 text-gray-900"
                                            onClick={() => { changePage(1) }}
                                        />
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>
                </div>



            )}


        </div>
    )
}


// <input
//                             type="email"
//                             placeholder="Email"

//                             className=" w-80 focus:outline-none focus:ring px-4 py-3 mt-8 text-sm text-white transition-all bg-gray-700 rounded-full"
//                         />