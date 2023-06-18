import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = req.query.user as string;

  if (!user) {
    return res.status(400).json({ error: "No user provided" });
  }

  const { data, error } = await supabase
    .from("subleases_active")
    .select(
      `
    *,
    subleases_draft(*)
    `
    )
    .eq("creator", user);

  console.log("dashboard data", data);

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data });
}
