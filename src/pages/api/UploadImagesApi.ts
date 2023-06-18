import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req: NextApiRequest) =>
  new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

const asyncUpload = async (id: string, file: any) => {
  const fileData = await fs.readFile(file.filepath);

  console.log(id, file.originalFilename, file.mimetype, fileData);

  try {
    const { error } = await supabase.storage
      .from("sublease_images")
      .upload(`${id}/${file.originalFilename}`, fileData, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    } else {
      console.log("New record added:");
    }
  } catch (err) {
    console.error("Error reading file or uploading:", err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let idNum = req.query.id as string;

  console.log(idNum);

  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { fields, files } = await asyncParse(req);

    await asyncUpload(idNum, files.file);

    res.status(200).json({ message: "Upload successful." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
