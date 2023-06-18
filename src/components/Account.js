import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "@/components/Avatar";
export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [selfIntroduction, setSelfIntroduction] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, self_introduction, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setSelfIntroduction(data.self_introduction);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ firstName, selfIntroduction, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        first_name: firstName,
        self_introduction: selfIntroduction,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={100}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ firstName, selfIntroduction, avatar_url: url });
        }}
      />

      <div className=" flex mt-1">
        <div className="font-medium text-gray-800 cursor-not-allowed">
          {"Email"}
        </div>
        <div className="ml-auto cursor-not-allowed">{session.user.email}</div>
      </div>
      <div className="flex justify-between">
        <label htmlFor="first_name" className="font-medium">
          First Name
        </label>
        <input
          className="px-1 border border-black"
          id="first_name"
          pattern="[A-Za-z]+"
          type="text"
          title="Enter your first name without any numbers or special characters"
          value={firstName || ""}
          onChange={(e) => {
            // Checks if the input contains any spaces or numbers.
            if (!/[^a-zA-Z]/.test(e.target.value)) {
              setFirstName(e.target.value);
            }
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="self_introduction" className="font-medium">
          Self Introduction
        </label>
        <textarea
          rows="3"
          maxLength="100"
          className="px-1 py-0.5 border border-black"
          id="self_introduction"
          type="text"
          value={selfIntroduction || ""}
          onChange={(e) => setSelfIntroduction(e.target.value)}
        />
      </div>

      <div>
        <button
          className="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 inline-flex justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
          onClick={() =>
            updateProfile({ firstName, selfIntroduction, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>

      {/* <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div> */}
    </div>
  );
}
