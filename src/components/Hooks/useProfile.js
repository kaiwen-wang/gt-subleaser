import { useState } from "react";
import { supabase } from "/src/utils/supabase";

export function useProfile(userId) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [selfIntroduction, setSelfIntroduction] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const getProfile = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, self_introduction, avatar_url`)
        .eq("id", userId)
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
  };

  return { loading, firstName, selfIntroduction, avatarUrl, getProfile };
}
