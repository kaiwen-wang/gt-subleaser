import { supabase } from "@/utils/supabase";

export default async function FilteredPostsApi(req, res) {
  let semesterPreference = req.query.semester;
  let maxPrice = req.query.price;
  let genderPreference = req.query.gender;
  let soloBathroomPreference = req.query.bathroom;
  let maxRoommates = req.query.roommates;
  let moveIn = req.query.movein;
  let moveOut = req.query.moveout;
  let sortFormula = req.query.sort;
  let pages = req.query.pages;

  let query = supabase
    .from("subleases")
    .select()
    .range(6 * (pages - 1), 6 * (pages - 1) + 5);

  if (maxPrice !== "") {
    query = query.lte("monthly_price", maxPrice);
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

  // sort query
  //if (sortFormula === "newestPosts") {
  //query.order("created_at", { ascending: false });

  // unsorted.sort((a, b) => data[b].price - data[a].price);
  // } else if (sortFormula === "oldestPosts") {
  // query.order("created_at", { ascending: false });
  // }
  // unsorted.sort((a, b) => data[a].price - data[b].price);
  // }
  if (sortFormula === "increasingPrice") {
    query.order("monthly_price", { ascending: true });
  } else if (sortFormula === "decreasingPrice") {
    query.order("monthly_price", { ascending: false });
  } else if (sortFormula === "newest") {
    query.order("created_at", { ascending: false });
  } else if (sortFormula === "oldest") {
    query.order("created_at", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
}
