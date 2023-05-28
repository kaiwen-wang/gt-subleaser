import { supabase } from "/src/utils/supabase";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

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
        if (draft.title) setFormTitle(draft.title);
        if (draft.description) setFormDescription(draft.description);
        if (draft.neighborhood) setFormNeighborhood(draft.neighborhood);
        if (draft.move_in) setFormMoveIn(draft.move_in);
        if (draft.move_out) setFormMoveOut(draft.move_out);
        if (draft.monthly_price) setFormMonthlyPrice(draft.monthly_price);
        if (draft.utilities_fee) setFormUtilities(draft.utilities_fee);
        if (draft.misc_fees) setFormFees(draft.misc_fees);
        if (draft.total_bedrooms) setFormTotalBedrooms(draft.total_bedrooms);
        if (draft.free_bedrooms) setFormFreeBedrooms(draft.free_bedrooms);
        if (draft.total_bathrooms) setFormTotalBathrooms(draft.total_bathrooms);
        if (draft.free_bathrooms) setFormFreeBathrooms(draft.free_bathrooms);
        if (draft.gender_prefernece)
          setFormGenderPreference(draft.gender_preference);
        if (draft.roommate_demographics)
          setFormRoommateInfo(draft.roommate_demographics);
        if (draft.appliances_list)
          setFormMajorAppliances(draft.appliances_list);
        if (draft.allowed_list) setFormAllowed(draft.allowed_list);
        if (draft.amenities_list) setFormAmenities(draft.amenities_list);
        console.log(draft);
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
  const [formRoommateInfo, setFormRoommateInfo] = useState("");
  const [formTotalBathrooms, setFormTotalBathrooms] = useState("");
  const [formFreeBathrooms, setFormFreeBathrooms] = useState("");
  const [formGenderPreference, setFormGenderPreference] = useState("");

  const [formMajorAppliances, setFormMajorAppliances] = useState([]);
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
