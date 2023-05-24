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
    let { data, error, status } = await supabase
      .from("subleases")
      .select(`monthly_price`);

    // convert data from object array to array of just prices
    data = data.map((item) => item.monthly_price);
    let max = Math.max(...data);
    let min = Math.min(...data);
    let rounded = Math.ceil(max / 100) * 100;

    rounded += 100;
    // console.log(rounded);
    return [rounded, min];
  }

  // const [semesterPreference, setSemesterPreference] = useState(null);
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

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formNeighborhood, setFormNeighborhood] = useState("");

  const [formMoveIn, setFormMoveIn] = useState();
  const [formMoveOut, setFormMoveOut] = useState("");

  const [formMonthlyPrice, setFormMonthlyPrice] = useState("");
  const [formUtilities, setFormUtilities] = useState("");
  const [formFees, setFormFees] = useState("");

  const [formTotalBedrooms, setFormTotalBedrooms] = useState("");
  const [formFreeBedrooms, setFormFreeBedrooms] = useState("");
  const [formRoommateInfo, setFormRoommateInfo] = useState("");
  const [formTotalBathrooms, setFormTotalBathrooms] = useState("");
  const [formFreeBathrooms, setFormFreeBathrooms] = useState("");
  const [formGenderPreference, setFormGenderPreference] = useState("");

  const [formMajorAppliances, setFormMajorAppliances] = useState("");
  const [formAllowed, setFormAllowed] = useState("");
  const [formAmenities, setFormAmenities] = useState("");

  return (
    <AppContext.Provider
      value={{
        formTitle,
        formDescription,
        formNeighborhood,
        formMoveIn,
        formMoveOut,
        formMonthlyPrice,
        formUtilities,
        formFees,
        formTotalBedrooms,
        formFreeBedrooms,
        formRoommateInfo,
        formTotalBathrooms,
        formFreeBathrooms,
        formGenderPreference,
        formMajorAppliances,
        formAllowed,
        formAmenities,
        setFormTitle,
        setFormDescription,
        setFormNeighborhood,
        setFormMoveIn,
        setFormMoveOut,
        setFormMonthlyPrice,
        setFormUtilities,
        setFormFees,
        setFormTotalBedrooms,
        setFormFreeBedrooms,
        setFormRoommateInfo,
        setFormTotalBathrooms,
        setFormFreeBathrooms,
        setFormGenderPreference,
        setFormMajorAppliances,
        setFormAllowed,
        setFormAmenities,

        // semesterPreference,
        // setSemesterPreference,
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
