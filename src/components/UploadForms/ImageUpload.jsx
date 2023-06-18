import { useState, useRef, useEffect } from "react";
import CoverImage from "@/components/UploadForms/CoverImage";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function ImageUpload({ idNum }) {
    const inputFileRef = useRef(null);

    const [uploadimgs, setuploadimgs] = useState([]);

    function deleteImage(index) {
        const newImages = [...uploadimgs];
        newImages.splice(index, 1);
        setuploadimgs(newImages);
    }

    const { data: data2, error: error2 } = useSWR(
        `/api/DownloadPostImagesApi?url=${idNum}`,
        fetcher
    );
    useEffect(() => {
        if (data2) {
            setuploadimgs(data2);
        }
    }, [data2]);


    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e) => {
        setLoading(true)
        console.log("Uploading image", e.target.files);
        setuploadimgs([e.target.files[0], ...uploadimgs]);

        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            let x = await fetch(`/api/UploadImagesApi?id=${idNum}`, { method: "PUT", body: formData })

            console.log("success", x)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="">
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
                    uploadimgs.reverse().map((img, index) => (
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
    )
}