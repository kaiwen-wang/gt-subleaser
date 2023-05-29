import { supabase } from "/src/utils/supabase";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { getCurrentDate, getOffsetDate } from "@/utils/date.js";

export const AppContext = createContext();

export function AppProvider({ children }) {
  useEffect(() => {
    fetchAndSetMaxPrice();
  }, []);

  async function fetchAndSetMaxPrice() {
    const minMaxValues = await getSupabasePrices();
    const fetchedMaxPrice = minMaxValues[0];
    const fetchedMinPrice = minMaxValues[1];

    setMaxPrice(fetchedMaxPrice);
    setMaxTopPrice(fetchedMaxPrice);
    setPriceDisplayValue(fetchedMaxPrice);
    setMinPrice(fetchedMinPrice);
  }

  async function getSupabasePrices() {
    try {
      let { data, error } = await supabase
        .from("subleases")
        .select(`monthly_price`);

      if (error) throw error;

      if (data.length > 0) {
        data = data.map((item) => item.monthly_price);
        let max = Math.max(...data);
        let min = Math.min(...data);
        let rounded = Math.ceil(max / 100) * 100;

        rounded += 100;

        return [rounded, min];
      } else {
        return [1000, 100];
      }
    } catch (error) {
      return [1000, 100];
    }
  }

  const [semesterPreference, setSemesterPreference] = useState("");
  // const [soloBathroomPreference, setSoloBathroomPreference] = useState(false);

  const [maxPrice, setMaxPrice] = useState("");
  const [priceDisplayValue, setPriceDisplayValue] = useState("");
  const [maxTopPrice, setMaxTopPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  const [genderPreference, setGenderPreference] = useState("");
  const [maxRoommates, setMaxRoommates] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [moveOut, setMoveOut] = useState("");

  const [sortFormula, setSortFormula] = useState("newest");

  const [mapCenter, setMapCenter] = useState([33.7756, -84.3963]);

  return (
    <AppContext.Provider
      value={{
        semesterPreference,
        setSemesterPreference,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,

        mapCenter,
        setMapCenter,

        genderPreference,
        setGenderPreference,
        // soloBathroomPreference,
        // setSoloBathroomPreference,
        maxRoommates,
        setMaxRoommates,
        moveIn,
        setMoveIn,
        moveOut,
        setMoveOut,
        priceDisplayValue,
        setPriceDisplayValue,

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
