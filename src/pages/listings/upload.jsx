
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import BigPicture from "@/components/UploadForms/BigPicture";
import Timing from "@/components/UploadForms/Timing";
import Pricing from "@/components/UploadForms/Pricing";
import HouseDetails from "@/components/UploadForms/HouseDetails";
import Toggle from "@/components/Header/Elements/Toggle";
import UserIcon from "@/components/Header/Elements/UserIcon";
import { useContext, useRef, useCallback } from "react";
import { classifySemesters } from "@/utils/classifySemesters";
import HeadElement from "@/components/Header/HeadElement";
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
import LoginPage from "../../components/LoginPage";
import Appliances from "../../components/UploadForms/Appliances";
import Allowed from "../../components/UploadForms/Allowed";
import Amenities from "../../components/UploadForms/Amenities";
import { FormContext } from "/src/components/FormState";
import { WelcomePage } from "../../components/UploadForms/WelcomePage";
import { ImageUpload } from "../../components/UploadForms/ImageUpload";

export default function hi() {
    const pageFocus = useRef(null)
    const submitFormRef = useRef(null);
    const downButtonRef = useRef(null);
    const upButtonRef = useRef(null);

    const { formMajorAppliances, formAllowed, formAmenities, formCircleColors } = useContext(FormContext);
    const { resetEverything } = useContext(FormContext);

    // auth
    const [session, setSession] = useState(undefined);
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






    const [idNum, setIdNum] = useState(null);


    const [formSubmitting, setFormSubmitting] = useState(false);
    const handleFormSubmit = async (event) => {
        setFormSubmitting(true);
        event.preventDefault();
        console.log("hi form submit")

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.last_page = page;

        if (data.move_in && data.move_out) {
            data.semester = classifySemesters(data);
        }
        data.date_submitted = new Date().toISOString();
        data.roommate_demographics = formCircleColors;

        data.appliances_list = formMajorAppliances;
        data.allowed_list = formAllowed;
        data.amenities_list = formAmenities;

        console.log("form data", data);

        try {
            const { error } = await supabase
                .from("subleases_draft")
                .update(data)
                .eq("id", idNum)

            if (error) throw error;

            console.log("success", idNum, data)
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setFormSubmitting(false);
            // changePage(1)
        }
    }


    async function createListingId() {
        setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from("subleases_draft")
                .insert({ creator: session.user.id })
                .select();

            if (error) throw error;

            setIdNum(data[0].id);
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const [subleaseDataLoading, setSubleaseDataLoading] = useState(null);
    // When session loads, see if draft exists
    const [existingFormData, setExistingFormData] = useState(null);
    useEffect(() => {
        const fetchSubleasesDraft = async () => {
            try {
                setSubleaseDataLoading(true);
                const { data, error } = await supabase
                    .from("subleases_draft")
                    .select()
                    .eq('creator', session.user.id)
                    .eq('submitted', false)

                if (error) throw error;


                console.log("existing data", data)
                setExistingFormData(data[0]);
                if (data.length > 0) {
                    setIdNum(data[0].id);
                }
            } catch (error) {
                console.error("Error occurred while getting existing data:", error);
            } finally {
                setSubleaseDataLoading(false);
            }
        };

        if (session) {
            fetchSubleasesDraft();
        }
    }, [session])


    const [page, setPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const pages = [
        {
            content: (
                <WelcomePage idNum={idNum} isLoading={isLoading} sdl={subleaseDataLoading} existingFormData={existingFormData} />
            )
        },
        {
            content: (
                <div className="">
                    Your listing ID is: {idNum}

                    <br></br>

                    {/* Your work is saved when you click the "Continue" button, so you can come back later to finish. */}
                    Your work is saved when you move onto the next page, so you can come back later to finish.
                </div>
            )
        },
        {
            content: (
                <ImageUpload idNum={idNum} />
            )
        },
        {
            content: (
                <BigPicture pageFocusRef={pageFocus} />
            )
        },
        {
            content: (
                <Timing pageFocusRef={pageFocus} />
            )
        },
        {
            content: (
                <Pricing pageFocusRef={pageFocus} />
            )
        },
        {
            content: (
                <HouseDetails
                    pageFocusRef={pageFocus}
                />
            )
        },
        {
            content: (
                <Appliances />
            )
        }, {
            content: (
                <Allowed />
            )
        },
        {
            content: (
                <Amenities />
            )
        },
        {
            content: (
                <div>
                    Thanks for completing the form. You can submit it for review or go back to edit.
                </div>
            )
        }]

    useEffect(() => {
        if (pageFocus.current) {
            setTimeout(() => {
                pageFocus.current.focus();
            }, 50)
        }
    }, [page]);


    async function setSubmitted() {
        try {
            const { error } = await supabase
                .from("subleases_draft")
                .update({ submitted: true })
                .eq("id", idNum)

            if (error) throw error;

            console.log("successfully submit")
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    const router = useRouter();
    const changePage = useCallback((number) => {
        console.log(page, number, pages.length)

        if (page + number === pages.length) {
            setSubmitted();
            resetEverything();
            // redirect to /dashboard
            router.push("/dashboard")
            return
        }

        var form = document.getElementById('myform');
        let newPage = page + number;

        if (newPage < 0) {
            newPage = page;
        } else if (number > 0) {
            if (form.checkValidity()) {
                if (submitFormRef.current) {
                    submitFormRef.current.click();
                }
            } else {
                form.reportValidity();
                newPage = page;
            }
        }

        setPage(newPage);
    }, [page]);

    const handleKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            // case 37:
            //     // press left arrow
            //     if (upButtonRef.current) {
            //         upButtonRef.current.click();
            //     }
            //     break;
            case 38:
                // press up arrow
                if (upButtonRef.current) {
                    upButtonRef.current.click();
                }
                break;
            // case 39:
            //     if (downButtonRef.current) {
            //         downButtonRef.current.click();
            //     }
            //     break;
            case 40:
                if (downButtonRef.current) {
                    downButtonRef.current.click();
                }
                break;

            // case 13:

            default:
                break;
        }
    }, [changePage]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log(session, "SELSKFJASDK")
    }, [session])

    return (
        <div >
            <HeadElement title="GT Subleaser | Create a Sublease" />
            {session === undefined ?
                (
                    <div className=" flex items-center justify-center h-screen">
                        Loading...
                    </div>
                ) : session === null ? (
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
                                <Sidebar page={page} />
                            </div>
                        </div>
                        <div className="lg:relative lg:ml-0 absolute w-full h-screen overflow-auto">
                            <div className="relative flex flex-col min-h-screen">
                                <nav className="flex h-[65px] items-center justify-end border-b ">
                                    <div className=" flex items-center justify-between w-full gap-2 pr-4 mx-auto">
                                        <a className="lg:invisible visible ml-4 text-xl font-semibold" href="/">
                                            🐝 GT Subleaser
                                        </a>
                                        <div className="flex gap-2">

                                            <Toggle />
                                            <UserIcon />
                                        </div>
                                    </div>
                                </nav>


                                <div className=" relative flex items-center justify-center flex-grow">
                                    <div className="hover:opacity-50 absolute top-0 left-0 h-1 transition-all duration-300 ease-out"
                                        style={{
                                            width: `${(page / (pages.length - 1)) * 100}%`,
                                        }}
                                    >
                                        <div className="w-full h-full bg-green-500" />
                                    </div>

                                    <form
                                        id="myform"
                                        onSubmit={handleFormSubmit}
                                        className="flex-grow max-w-3xl px-4 mx-auto"
                                    >
                                        <div className="-translate-y-12">
                                            {/* <Fade show={show}> */}
                                            {pages[page] && pages[page].content}
                                            {/* </Fade> */}
                                            {page > 1 ?
                                                (

                                                    <button
                                                        type="submit"
                                                        ref={submitFormRef}
                                                        className={`focus:outline-none focus:ring px-3 py-1.5  text-sm font-medium text-white transition-all bg-gray-700 rounded-full mt-8`}
                                                    // onClick={() => { changePage(1) }}
                                                    >Continue</button>
                                                ) : null}
                                        </div>
                                    </form>

                                    <div className="absolute top-0 right-0 flex items-center mt-2.5 mr-4">
                                        <div className="font-mono text-sm text-gray-700">
                                            {page > 1 ?
                                                "ID: " + idNum
                                                :
                                                null}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-0 flex items-center m-2.5">
                                        <div className="mr-2.5 font-mono text-gray-900 text-sm">
                                            Page {page + 1}/{pages.length}
                                        </div>
                                        <div className="hover:bg-gray-800 px-3 py-2 bg-gray-700 rounded-l" ref={upButtonRef}
                                            onClick={() => { changePage(-1) }}
                                        >
                                            <ArrowUpIcon className="w-5 h-5 font-bold text-white"

                                            />
                                        </div>
                                        <div className="hover:bg-gray-800 px-3 py-2 bg-gray-700 rounded-r" ref={downButtonRef}
                                            onClick={async () => {
                                                if (existingFormData !== null) {
                                                    if (!idNum) {
                                                        await createListingId();
                                                        changePage(1)
                                                    } else {
                                                        changePage(1)
                                                    }
                                                }
                                            }}
                                        >
                                            <ArrowDownIcon className="w-5 h-5 font-bold text-white"

                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    )
}

function Sidebar({ page }) {
    return (
        <div className=" absolute left-0 right-0 top-[0px] h-screen px-5 py-16 pl-5   lg:visible lg:relative lg:left-0 lg:top-0 lg:flex lg:px-10 lg:pb-10 lg:pt-0 lg:opacity-100">
            <div className="lg:justify-start relative flex justify-center">
                <ul className="relative flex flex-col w-full gap-4">
                    <div className="flex flex-col gap-3 pt-8">
                        <span className={`font-mono text-sm text-gray-500`}>
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
                        <span className={`font-mono text-sm text-gray-500`}>
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
                        <span className={`font-mono text-sm  text-gray-500`}>
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
                        <span className={`font-mono text-sm text-gray-500`}>
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
                        <span className={`font-mono text-sm text-gray-500`}>
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
    )
}