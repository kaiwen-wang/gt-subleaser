// import { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "@/utils/supabase";

// export default async function UpdateContactClicksApi(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     let idNum = req.query.id as string;
//     let img = req.query.img as string;

//     const { imageError } = await supabase.storage
//       .from("sublease-images")
//       .upload(`${idNum}/${img.name}`, img);

//     if (imageError) {
//       console.error("Error uploading image:", imageError);
//       return;
//     } else {
//       console.log("New record added:");
//     }
