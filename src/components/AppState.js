import { supabase } from "@/utils/supabase";
import data from "public/data/house-1.json";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

// loop through data and find the max price
// This isn't accurate anymore. In order to find the max price I have to do a supabase import.
// let maximumDataPrice = 0;
// Object.keys(data).forEach((item) => {
//   let price = data[item].price;
//   if (price > maximumDataPrice) {
//     maximumDataPrice = price;
//   }
// });

export const AppContext = createContext();

export function AppProvider({ children }) {
  useEffect(() => {
    fetchAndSetMaxPrice();
  }, []);

  async function fetchAndSetMaxPrice() {
    const fetchedMaxPrice = await getSupabasePrices();
    setMaxPrice(fetchedMaxPrice);
    setMaxTopPrice(fetchedMaxPrice);
  }

  async function getSupabasePrices() {
    let { data, error, status } = await supabase
      .from("subleases")
      .select(`monthly_price`);

    // convert data from object array to array of just prices
    data = data.map((item) => item.monthly_price);
    let max = Math.max(...data);
    let rounded = Math.ceil(max / 100) * 100;
    // console.log(rounded);
    return rounded;
  }

  const [semesterPreference, setSemesterPreference] = useState(null);
  const [maxPrice, setMaxPrice] = useState(
    // Math.ceil(maximumDataPrice / 100) * 100
    null
  );
  // const [maxPrice, setMaxPrice] = useState(Math.ceil(maximumDataPrice / 100) * 100);
  const [genderPreference, setGenderPreference] = useState(null);
  const [soloBathroomPreference, setSoloBathroomPreference] = useState(false);
  const [maxRoommates, setMaxRoommates] = useState(null);
  const [moveIn, setMoveIn] = useState(null);
  const [moveOut, setMoveOut] = useState(null);

  const [maxTopPrice, setMaxTopPrice] = useState(
    // Math.ceil(maximumDataPrice / 100) * 100
    // getSupabasePrices()
    null
  );
  const [sortFormula, setSortFormula] = useState("increasingPrice");

  return (
    <AppContext.Provider
      value={{
        semesterPreference,
        setSemesterPreference,
        maxPrice,
        setMaxPrice,
        genderPreference,
        setGenderPreference,
        soloBathroomPreference,
        setSoloBathroomPreference,
        maxRoommates,
        setMaxRoommates,
        moveIn,
        setMoveIn,
        moveOut,
        setMoveOut,

        maxTopPrice,
        setMaxTopPrice,
        sortFormula,
        setSortFormula,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
