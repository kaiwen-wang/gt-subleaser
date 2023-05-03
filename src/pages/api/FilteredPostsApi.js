import { createClient } from "@supabase/supabase-js";

export default async function FilteredPostsApi(req, res) {
  let semesterPreference = req.query.semester;
  let maxPrice = req.query.price;
  let genderPreference = req.query.gender;
  let soloBathroomPreference = req.query.bathroom;
  let maxRoommates = req.query.roommates;
  let moveIn = req.query.movein;
  let moveOut = req.query.moveout;
  let sortFormula = req.query.sort;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let query = supabase.from("subleases").select();

  query = query.lte("monthly_price", maxPrice);

  // if (semesterPreference !== "null") {
  //     query = query.eq("semester", semesterPreference)
  // }
  if (moveIn !== "null") {
    query = query.gte("move_in", moveIn);
  }
  if (moveOut !== "null") {
    query = query.lte("move_out", moveOut);
  }
  if (genderPreference !== "null") {
    query = query.eq("gender_preference", genderPreference);
  }
  if (maxRoommates !== "null") {
    query = query.gte("total_bedrooms", parseInt(maxRoommates) + 1);
  }

  // sort query
  // if (sortFormula === "newestPosts") {
  //     query.order('created_at', { ascending: false })

  //     // unsorted.sort((a, b) => data[b].price - data[a].price);
  //   } else if (sortFormula === "oldestPosts") {
  //     query.order('created_at', { ascending: true })

  // unsorted.sort((a, b) => data[a].price - data[b].price);
  // }
  if (sortFormula === "increasingPrice") {
    query.order("monthly_price", { ascending: true });

    // unsorted.sort((a, b) => data[a].price - data[b].price);
  } else if (sortFormula === "decreasingPrice") {
    query.order("monthly_price", { ascending: false });

    // unsorted.sort((a, b) => data[b].price - data[a].price);
  }

  // Gender Preference: If null, then show all. If male show only male. If female show only female.

  // Bathroom Preference: Either "solo" or "shared." Should implement a "2+" shared but not important for now. It is a boolean. False = solo, True = shared.

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
}
