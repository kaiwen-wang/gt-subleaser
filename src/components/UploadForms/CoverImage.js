
import { TrashIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useEffect, useState } from "react"

import { createClient } from "@supabase/supabase-js";


export default function CoverImage({ id, index, img, deleteImage, loading }) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // const [loading, setLoading] = useState(false)

    async function deleteImageFromServer() {
        const { data, error } = await supabase
            .storage
            .from('sublease-images')
            .remove([`${id}/${img.name}`])

        if (error) {
            console.log(error)
        }
        console.log(data)
    }

    return (
        <div
            className="shrink-0 relative h-60 w-60 rounded-md outline outline-black"
        >
            <Image
                src={URL.createObjectURL(img)}
                alt="Cover"
                width={64} // Added required width property
                height={64} // Added required height property
                className={`${loading
                    ? "opacity-50"
                    : ""
                    } h-full w-full`} // Added w-full and h-full
                style={{ objectFit: "cover" }}
            />
            <div className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer "
                onClick={() => deleteImage(index)}>
                <TrashIcon className="h-8 w-8 text-red-600 bg-white backdrop-blur p-1 rounded-full outline drop-shadow" onClick={() => deleteImageFromServer()} />
            </div>
            {loading && (
                <div className="absolute left-0 top-0 flex h-full w-full animate-pulse flex-col items-center justify-center ">
                    <CloudArrowUpIcon className="h-12 w-12 text-black " />
                    <span className="pl-2 font-medium">
                        Uploading...
                    </span>
                </div>
            )}
        </div>

    )
}