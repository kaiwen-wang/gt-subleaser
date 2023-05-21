import Header from "@/components/Header/Header";
import { PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline"
import LoginPage from "../components/LoginPage";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


export default function Dashboard() {
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

    if (session) {
        return (
            <>
                <Header smallContainer={true} />

                <main className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 mx-auto">

                    <div className="md:grid-cols-3 grid gap-3 mt-8">
                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <EyeIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Unique Views</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    20
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <PhoneArrowDownLeftIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Contact Clicks</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    20
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl h-16 p-4 border border-gray-600 shadow-sm">
                            <div className="shrink-0 flex items-center justify-between">
                                <div className=" flex items-center gap-3">

                                    <EyeIcon className="w-6 h-6 p-1 text-gray-600 bg-gray-200 border rounded-md shadow-sm" />
                                    <span className=" font-gray-800 text-lg">Favorites</span>


                                </div>
                                <div className=" mr-1 font-mono">
                                    5
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className="decoration-gray-500 font-medium text-gray-800 underline">
                            My Subleases
                        </span>
                        <span className="text-gray-500"> / </span>
                        <span className="font-medium text-gray-400">
                            0 active
                        </span>
                        <span className="text-gray-500"> · </span>
                        <span className="font-medium text-gray-400">
                            0 total
                        </span>

                    </div>

                    <div className="mt-4">

                        <div className="flex items-center justify-between h-12 p-4 border border-gray-500 rounded-md">
                            <div>
                                This is a title about views and subleases and so on
                            </div>
                            <div className="flex gap-2">
                                <div className=" bg-zinc-400 flex items-center px-2 py-1 text-xs font-medium text-white rounded-full">
                                    Posted two days ago
                                </div>
                                <div className=" flex items-center px-2 py-1 text-xs font-medium text-white bg-orange-400 rounded-full">
                                    Not activated
                                </div>
                                <TrashIcon className="w-7 h-7 p-1 text-white bg-red-500 border rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    } else {
        return (
            <LoginPage />
        )
    }
}