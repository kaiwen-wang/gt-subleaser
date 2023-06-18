import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let idNum = req.query.idNum as string;
  let imgName = req.query.imgName as string;

  const { data, error } = await supabase.storage
    .from("sublease_images")
    .remove([`${idNum}/${imgName}`]);

  console.log(data, idNum, imgName);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data });
}
