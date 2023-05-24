import { useState } from "react";
import ApplianceSelect from "@/components/UploadForms/Subsections/ApplianceSelect";

export default function Allowed() {
  const [allowedList, setAllowedList] = useState([]);
  const allowedListFunction = (data) => {
    setAllowedList(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <label
        className="block mb-2 text-lg font-medium"
        htmlFor="allowed"
        id="allowed"
      >
        Allowed
      </label>

      <div className="grid grid-cols-4 gap-3 text-sm font-medium">
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Pets"
          setList={allowedListFunction}
          list={allowedList}
        />

        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Drinking"
          setList={allowedListFunction}
          list={allowedList}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Smoking"
          setList={allowedListFunction}
          list={allowedList}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Parties"
          setList={allowedListFunction}
          list={allowedList}
        />
      </div>
    </div>
  );
}
