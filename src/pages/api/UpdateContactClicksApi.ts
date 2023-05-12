import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function UpdateContactClicksApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = req.query.id as string;
  let contactClicks = req.query.contactClicks as string;

  const { error } = await supabase
    .from("subleases")
    .update({ contact_clicks: parseInt(contactClicks) + 1 })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "total views incremented" });
  }
}
