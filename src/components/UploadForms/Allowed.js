import { useState } from "react";
import ApplianceSelect from "@/components/UploadForms/Subsections/ApplianceSelect";
import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function Allowed() {
  const { formAllowed: allowedList, setFormAllowed: setAllowedList } =
    useContext(FormContext);

  const allowedListFunction = (data) => {
    setAllowedList(data);
  };

  return (
    <div className="relative mx-auto">
      <div className="flex items-center justify-between">
        <label
          className="mb-1 text-lg font-medium"
          htmlFor="allowed"
          id="allowed"
        >
          Allowed
        </label>
        <span className="text-sm text-gray-500">
          {allowedList.length} selected
        </span>
      </div>

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
