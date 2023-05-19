import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let idNum = req.query.id as string;

  //   if notn POST request
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  //   parse JSON
  console.log(req.body);
  const data = req.body;

  const { error } = await supabase.from("subleases").insert(data);

  if (error) {
    console.error(error);
    alert("Server Error: " + error.message + ". Please change your input.");

    return res.status(500).json({ error: error.message });
  } else {
    console.log("New record added:", data);
    // redirect to /success
    // router.push(`/success?id=${idNum}`);
    return res.status(200).json({ data });
  }
}
