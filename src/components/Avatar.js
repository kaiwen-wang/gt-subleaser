import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        console.log("ERR DOWNLOADING AA A A A  AA  A");
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const deleteAvatar = async () => {
    try {
      setDeleting(true);

      console.log("DELETING THIS URL", url);

      let { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([url]);

      let { error: deleteError2 } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);

      console.log("did it delete properlY", deleteError);

      if (deleteError) {
        throw deleteError;
      }

      if (deleteError2) {
        console.log("hi");
        console.log(deleteError2, "delet 2 err");
        throw deleteError2;
      }

      setAvatarUrl(null);
    } catch (error) {
      alert("Error deleting avatar!");
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-start gap-4 p-2 bg-gray-100 border rounded">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="border border-black rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="border border-black rounded-full"
          style={{ height: size, width: size }}
        />
      )}
      <div className="">
        <div className="whitespace-nowrap mb-0.5 font-medium text-gray-800 -mt-1">
          Profile Picture
        </div>
        <div className="flex items-center gap-2">
          <label
            className="hover:bg-gray-200 px-2 py-1 text-center bg-gray-100 border border-gray-500 rounded cursor-pointer"
            htmlFor="single"
          >
            {uploading ? "Uploading..." : "Upload"}
          </label>
          <div
            className="cursor-pointer"
            onClick={async () => {
              deleteAvatar();
              alert("Avatar Deleted");
            }}
          >
            Delete
          </div>
        </div>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
