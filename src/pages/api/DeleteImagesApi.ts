import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let idNum = req.query.id as string;
  let imgName = req.query.imgName as string;

  const { data, error } = await supabase.storage
    .from("sublease-images")
    .remove([`${idNum}/${imgName}`]);

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data });
}
