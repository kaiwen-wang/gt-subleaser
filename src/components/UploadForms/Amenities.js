import { useState } from "react";
import ApplianceSelect from "@/components/UploadForms/Subsections/ApplianceSelect";
import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function Amenities() {
  const { formAmenities: amenitiesList, setFormAmenities: setAmenitiesList } =
    useContext(FormContext);

  const amenitiesListFunction = (data) => {
    setAmenitiesList(data);
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between">
        <label
          className="mb-1 text-lg font-medium"
          htmlFor="amenities"
          id="amenities"
        >
          Amenities
        </label>
        <span className="text-sm text-gray-500">
          {amenitiesList.length} selected
        </span>
      </div>

      <div className=" grid grid-cols-4 gap-3 text-sm font-medium">
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Parking"
          setList={amenitiesListFunction}
          list={amenitiesList}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Furnished"
          setList={amenitiesListFunction}
          list={amenitiesList}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Balcony"
          setList={amenitiesListFunction}
          list={amenitiesList}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Connected Bathroom"
          setList={amenitiesListFunction}
          list={amenitiesList}
        />
      </div>
    </div>
  );
}
