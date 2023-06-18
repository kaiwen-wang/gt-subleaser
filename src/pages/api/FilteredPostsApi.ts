import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function FilteredPostsApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let maxPrice = req.query.price as string;
  let genderPreference = req.query.gender as string;
  let maxRoommates = req.query.roommates as string;
  let moveIn = req.query.movein as string;
  let moveOut = req.query.moveout as string;
  let semester = req.query.semester as string;
  let sortFormula = req.query.sort as string;
  let pages = req.query.pages as string;

  let query = supabase.from("subleases_draft").select();
  // .eq("active_post", true)
  // .range(6 * (parseInt(pages) - 1), 6 * (parseInt(pages) - 1) + 5);

  let query2 = supabase
    .from("subleases_active")
    .select()
    .range(6 * (parseInt(pages) - 1), 6 * (parseInt(pages) - 1) + 5);

  let { data: ids, error: error2 } = await query2;

  if (error2) {
    res.status(500).json({ error: error2.message });
  } else {
    let idArray = ids.map((id) => id.id);
    query = query.in("id", idArray);
  }

  if (maxPrice !== "") {
    query = query.lte("monthly_price", parseInt(maxPrice));
  }
  if (moveIn !== "") {
    query = query.gte("move_in", moveIn);
  }
  if (moveOut !== "") {
    query = query.lte("move_out", moveOut);
  }
  if (genderPreference !== "") {
    query = query.eq("gender_preference", genderPreference);
  }
  if (maxRoommates !== "") {
    query = query.lte("total_bedrooms", parseInt(maxRoommates));
  }

  // Get current year
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  semester = semester.slice(0, 1).toUpperCase() + semester.slice(1);
  let semesterAndYear = semester + " " + currentYear;
  let semesterAndNextYear = semester + " " + nextYear;
  if (semester !== "") {
    query = query.or(
      `semester.cs.{${semesterAndNextYear}}, semester.cs.{${semesterAndYear}}`
    );
  }

  if (sortFormula === "increasingPrice") {
    query.order("monthly_price", { ascending: true });
  } else if (sortFormula === "decreasingPrice") {
    query.order("monthly_price", { ascending: false });
  } else if (sortFormula === "newest") {
    query.order("date_submitted", { ascending: false });
  } else if (sortFormula === "oldest") {
    query.order("date_submitted", { ascending: true });
  }

  const { data, error } = await query.select(`*, profiles(*)`);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
}
