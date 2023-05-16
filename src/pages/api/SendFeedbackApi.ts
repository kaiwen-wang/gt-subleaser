import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function SendFeedbackApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  let tomato = JSON.parse(req.body);
  let { message, email, url } = tomato;

  const { error } = await supabase
    .from("feedback")
    .insert({ feedback: message, contact: email, page: url });

  if (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Feedback Submitted" });
  }
}
