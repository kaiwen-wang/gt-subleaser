import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = req.query.id as string;
  let currentViews = req.query.currentViews as string;

  console.log("id: ", id, currentViews);

  const { error } = await supabase
    .from("subleases_active")
    .update({ unique_views: parseInt(currentViews) + 1 })
    .eq("id", id);

  console.log(error);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "total views incremented" });
  }
}
