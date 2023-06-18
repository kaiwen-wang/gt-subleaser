import { supabase } from "/src/utils/supabase";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  function resetEverything() {
    setFormTitle("");
    setFormDescription("");
    setFormNeighborhood("");
    setFormMoveIn("");
    setFormMoveOut("");
    setFormMonthlyPrice("");
    setFormUtilities("");
    setFormFees("");
    setFormTotalBedrooms("");
    setFormFreeBedrooms("");
    setFormTotalBathrooms("");
    setFormFreeBathrooms("");
    setFormGenderPreference("");
    setFormCircleColors("");
    setFormMajorAppliances("");
    setFormAllowed("");
    setFormAmenities("");
  }

  useEffect(() => {
    async function loadForm() {
      try {
        const { data, error } = await supabaseClient
          .from("subleases_draft")
          .select()
          .eq("creator", user.id)
          .eq("submitted", false);

        if (error) throw error;

        let draft = data[0];
        if (!draft) return;
        if (draft.title !== null) setFormTitle(draft.title);
        if (draft.description !== null) setFormDescription(draft.description);
        if (draft.neighborhood !== null)
          setFormNeighborhood(draft.neighborhood);
        if (draft.move_in !== null) setFormMoveIn(draft.move_in);
        if (draft.move_out !== null) setFormMoveOut(draft.move_out);
        if (draft.monthly_price !== null)
          setFormMonthlyPrice(draft.monthly_price);
        if (draft.utilities_fee !== null) setFormUtilities(draft.utilities_fee);
        if (draft.misc_fees !== null) setFormFees(draft.misc_fees);
        if (draft.total_bedrooms !== null)
          setFormTotalBedrooms(draft.total_bedrooms);
        if (draft.free_bedrooms !== null)
          setFormFreeBedrooms(draft.free_bedrooms);
        if (draft.total_bathrooms !== null)
          setFormTotalBathrooms(draft.total_bathrooms);
        if (draft.free_bathrooms !== null)
          setFormFreeBathrooms(draft.free_bathrooms);
        if (draft.gender_preference !== null)
          setFormGenderPreference(draft.gender_preference);
        if (draft.roommate_demographics !== null)
          setFormCircleColors(draft.roommate_demographics);
        if (draft.appliances_list !== null)
          setFormMajorAppliances(draft.appliances_list);
        if (draft.allowed_list !== null) setFormAllowed(draft.allowed_list);
        if (draft.amenities_list !== null)
          setFormAmenities(draft.amenities_list);
        console.log("loading intiial form state", draft);
      } catch (error) {
        console.log(error);
      }
    }

    if (user) loadForm();
  }, [user]);

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
  const [formTotalBathrooms, setFormTotalBathrooms] = useState("");
  const [formFreeBathrooms, setFormFreeBathrooms] = useState("");
  const [formGenderPreference, setFormGenderPreference] = useState("");
  const [formCircleColors, setFormCircleColors] = useState([]);

  const [formMajorAppliances, setFormMajorAppliances] = useState([
    "Washing Machine",
    "Clothes Dryer",
    "Fridge",
    "Freezer",
    "Air Conditioner",
    "Heating",
    "Stove",
    "Microwave",
  ]);
  const [formAllowed, setFormAllowed] = useState([]);
  const [formAmenities, setFormAmenities] = useState([]);

  return (
    <FormContext.Provider
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
        formTotalBathrooms,
        formFreeBathrooms,
        formGenderPreference,
        formCircleColors,
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
        setFormTotalBathrooms,
        setFormFreeBathrooms,
        setFormGenderPreference,
        setFormCircleColors,
        setFormMajorAppliances,
        setFormAllowed,
        setFormAmenities,

        resetEverything,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
