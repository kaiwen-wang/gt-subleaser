import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function DownloadPostImagesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url = req.query.url as string;

  // List all files in the folder
  const { data, error } = await supabase.storage
    .from("sublease-images")
    .list(`${url}/`);

  if (error) {
    throw error;
  }

  // loop through data and download list file names
  const tempSupabaseURL = [];
  for (const file of data) {
    let path = `${url}/${file.name}`;

    const { data } = supabase.storage
      .from("sublease-images")
      .getPublicUrl(path);

    tempSupabaseURL.push(data["publicUrl"]);
  }

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(tempSupabaseURL);
  }
}
