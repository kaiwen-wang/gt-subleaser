import { useState } from "react";
import ApplianceSelect from "@/components/UploadForms/ApplianceSelect";

export default function Appliances() {
  const [appliancesList, setAppliancesList] = useState([
    "Washing Machine",
    "Clothes Dryer",
    "Fridge",
    "Freezer",
    "Air Conditioner",
    "Heating",
    "Stove",
  ]);
  const applianceListFunction = (data) => {
    setAppliancesList(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between">
        <label className="block mb-2 text-lg font-medium" htmlFor="appliances">
          Appliances
        </label>
        <span className="text-sm text-gray-500">
          {appliancesList.length} selected
        </span>
      </div>
      We've selected some common defaults for you, but please modify this if
      there are things you have or don't have.
      <div className="mt-2 grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md ">
        <ApplianceSelect
          imgsrc="/washing-machine.png"
          name="Washing Machine"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Clothes Dryer"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/fridge.png"
          name="Fridge"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/freezer.png"
          name="Freezer"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/freezer.png"
          name="Air Conditioner"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />

        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Heating"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/oven.png"
          name="Stove"
          setList={applianceListFunction}
          list={appliancesList}
          selectedDefault={true}
        />
        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Stove Hood"
          setList={applianceListFunction}
          list={appliancesList}
        />
        <ApplianceSelect
          imgsrc="/microwave.png"
          name="Microwave"
          setList={applianceListFunction}
          list={appliancesList}
        />
        <ApplianceSelect
          imgsrc="/sink.png"
          name="Dishwasher"
          setList={applianceListFunction}
          list={appliancesList}
        />
        <ApplianceSelect
          imgsrc="/disposal.png"
          name="Drain Disposal"
          setList={applianceListFunction}
          list={appliancesList}
        />

        <ApplianceSelect
          imgsrc="/dryer.png"
          name="Television"
          setList={applianceListFunction}
          list={appliancesList}
        />
      </div>
    </div>
  );
}
