
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Dialog } from "@headlessui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

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

export default function hi() {
    const [modalSubmit, setModalSubmit] = useState(false);


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
            default:
                // Some other key was pressed
                console.log("Some other key was pressed.");
                break;
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setModalSubmit(true);
        const { data, error } = await supabase.auth.signInWithOtp({
            email: document.getElementById("email").value,
            // options: {
            //   emailRedirectTo: "https://example.com/welcome",
            // },
        });
        if (error) {
            alert(error);
        } else {
            closeModal();

            setTimeout(() => {
                setModalSubmit(false);
                alert("You have been sent a magic link! It expires in 1 hour.");
            }, 100);
        }
    };


    const [session, setSession] = useState(null);
    const supabase = useSupabaseClient();


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
    }]


    function changePage(number) {
        if (page + number < 0) {
            return;
        } else {
            setPage(page + number);

        }

    }

    return (
        <div onKeyDown={handleKeyDown} tabIndex="0">

            {!session ? (
                <>

                    <div className="isolate fixed inset-0 bg-black bg-opacity-25" />


                    <div className="z-5 fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <div className="rounded-2xl w-full max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <div
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Log In
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        You will be emailed a magic link to log in.
                                    </p>
                                </div>

                                <form id="loginForm" className="mt-4" onSubmit={handleLogin}>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="@gatech.edu emails only"
                                                pattern=".+@gatech\.edu"
                                                required
                                                size="75"
                                                className=" w-full border border-black rounded-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-2 text-center">
                                        <button
                                            type="submit"
                                            className="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
                                        >
                                            {modalSubmit ? "Loading..." : "Send Magic Link"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex">


                    <div className="z-5 relative flex flex-col items-center justify-center w-9/12 h-screen select-none">
                        <div className="absolute bottom-0 right-0 flex m-2">
                            {page}
                            <div className="hover:bg-gray-200 p-2 bg-gray-100 border">
                                <ArrowUpIcon className="w-5 h-5 text-gray-900"
                                    onClick={() => { changePage(-1) }}

                                />
                            </div>
                            <div className="hover:bg-gray-200 p-2 bg-gray-100 border">
                                <ArrowDownIcon className="w-5 h-5 text-gray-900"
                                    onClick={() => { changePage(1) }}
                                />
                            </div>
                        </div>

                        {pages[page] && pages[page].content}


                    </div>
                    <div className="w-3/12 bg-gray-100">
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

            )}


        </div>
    )
}


// <input
//                             type="email"
//                             placeholder="Email"

//                             className=" w-80 focus:outline-none focus:ring px-4 py-3 mt-8 text-sm text-white transition-all bg-gray-700 rounded-full"
//                         />