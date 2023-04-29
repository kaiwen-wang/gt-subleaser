import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Image from 'next/image'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function SkellyImage({ name, url }) {
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
        <>
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

                    // className is hidden if setIsLoaded is false
                    className={`${isLoaded ? '' : 'invisible'}`}

                    // This is useless because onLoadingComplete only is an external URL; now that images are becoming saved locally this serves no purpose.
                    onLoadingComplete={() =>
                        setIsLoaded(true)
                    }
                />
                :
                null
            }
        </>
    );
};
