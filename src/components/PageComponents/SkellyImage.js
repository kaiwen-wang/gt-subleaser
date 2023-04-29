import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Image from 'next/image'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function SkellyImage({ name, url, item }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [supabaseURL, setSupabaseURL] = useState(null);

    useEffect(() => {
        downloadFirstFileInFolder();
    }, [url]);

    async function downloadFirstFileInFolder() {
        try {
            // List all files in the folder
            const { data, error } = await supabase.storage
                .from("sublease-images")
                .list(`${url}/`);

            if (error) {
                throw error;
            }

            // Get the first file in the folder
            const firstFile = data[0];

            if (!firstFile) {
                console.log('No files found in the folder.');
                return;
            } else {
                console.log('First file:', firstFile.name);
            }

            let path = `${url}/${firstFile.name}`;

            // Download the first file
            const { data: fileContent, error: downloadError } = await supabase
                .storage
                .from("sublease-images")
                .download(path);

            if (downloadError) {
                throw downloadError;
            }

            // Create a Blob with the file content and create a local URL
            const fileBlob = new Blob([fileContent], { type: "image/*" });
            const fileUrl = URL.createObjectURL(fileBlob);
            setSupabaseURL(fileUrl);
        } catch (error) {
            console.error('Error downloading the first file:', error.message);
        }
    }

    return (
        <div className='relative w-full pt-[95%]'>
            {!isLoaded ? <div className='absolute top-0 inset-x-0 w-full h-full bg-gray-100 animate-pulse z-[10]'>
            </div>
                : null}
            <div className="absolute inset-x-0 top-0 z-30">
                <div className="flex">
                    {item.semester.map((item, index) => {
                        let color = "bg-gray-300"
                        let emoji = "⌛"
                        if (item.includes("Fall")) {
                            color = "bg-amber-700/40"
                            emoji = "🍂"
                        }
                        if (item.includes("Spring")) {
                            color = "bg-lime-500/40"
                            emoji = "🌱"
                        }
                        if (item.includes("Summer")) {
                            color = "bg-blue-500/40"
                            emoji = "☀️"
                        }

                        return (
                            <div
                                key={index}
                                className={`ml-2 mt-2 max-w-fit whitespace-nowrap rounded-full ${color} px-2 py-1 text-xs font-semibold backdrop-blur-md text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]`}>
                                <span className="mr-0.5">{emoji}</span>{" "}
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-30">
                <div className="flex justify-end px-2 pb-2">
                    {item.roommate_demographics.map((person, i) => {
                        return (
                            <Image
                                src={`/people/${person === "F" ? "woman" : ""}${person === "M" ? "man" : ""}${person === "O" && item.gender_preference === "female" ? "missing-woman" : ""}${person === "O" && item.gender_preference === "male" ? "missing-man" : ""}${person === "O" && item.gender_preference === "not-important" ? "missing-neutral" : ""}.gif`
                                }
                                key={i}
                                alt="stfu"
                                width="12"
                                height="12"
                            />
                        )
                    })}
                </div>
            </div>

            {supabaseURL ?
                <Image
                    // src={"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} // Use the "url" property of the item
                    src={supabaseURL ? supabaseURL : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                    // src=""
                    key={name}
                    alt="stupid"
                    fill="true"
                    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    style={{ objectFit: "cover" }}
                    className='relative'

                    // className is hidden if setIsLoaded is false
                    // className={`${isLoaded ? '' : 'invisible'}`}

                    // This is useless because onLoadingComplete only is an external URL; now that images are becoming saved locally this serves no purpose.
                    onLoadingComplete={() =>
                        setIsLoaded(true)
                    }
                />
                :
                null
            }
        </div>
    );
};
