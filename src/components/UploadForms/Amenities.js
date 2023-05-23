import { useState } from "react";
import ApplianceSelect from "@/components/UploadForms/ApplianceSelect";

export default function Amenities() {
  const [amenitiesList, setAmenitiesList] = useState([]);

  const amenitiesListFunction = (data) => {
    setAmenitiesList(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <label
        className="block mb-2 text-lg font-medium"
        htmlFor="amenities"
        id="amenities"
      >
        Amenities
      </label>
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
